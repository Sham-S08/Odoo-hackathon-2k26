import json
from unittest.mock import AsyncMock, MagicMock, patch
import pytest

from app.config import settings
from app.providers.gemini_provider import GeminiProvider, gemini_provider
from app.schemas.deal_health import (
    CustomerContext,
    DealHealthRequest,
    DealHealthResponseData,
    FinancialContext,
    RuleViolation,
)
from app.services.deal_health.fallback_engine import (
    calculate_deterministic_deal_health,
)
from app.services.deal_health.service import evaluate_deal_health
from app.validators.deal_health_validator import (
    SAFE_ADVISORY_RECOMMENDATION,
    validate_deal_health_output,
)


@pytest.fixture
def sample_deal_request() -> DealHealthRequest:
    return DealHealthRequest(
        quotationId="quote-llm-001",
        customer=CustomerContext(
            tier="SILVER",
            previousOrderCount=3,
            previousTotalValue=45000.0,
        ),
        financials=FinancialContext(
            subtotal=25000.0,
            discountPercent=14.0,
            estimatedMarginPercent=18.0,
        ),
        ruleViolations=[
            RuleViolation(
                type="MARGIN_WARNING",
                requested=18.0,
                allowed=20.0,
                severity="MEDIUM",
            )
        ],
        dealSize=21500.0,
        items=[],
    )


@pytest.mark.asyncio
async def test_successful_llm_evaluation(sample_deal_request: DealHealthRequest):
    """Mock Gemini client returning valid structured JSON response."""
    llm_payload = {
        "riskScore": 48,
        "riskLevel": "MEDIUM",
        "reasons": [
            "Moderate margin compression observed at 18.0%.",
            "Silver customer with limited prior purchase volume.",
        ],
        "recommendations": [
            "Manager review recommended to evaluate discounted line items and payment terms."
        ],
    }

    mock_client = MagicMock()
    mock_response = MagicMock()
    mock_response.text = json.dumps(llm_payload)
    mock_client.aio.models.generate_content = AsyncMock(return_value=mock_response)

    custom_provider = GeminiProvider(
        api_key="mock-api-key", model="gemini-2.5-flash", client=mock_client
    )

    with patch.object(settings, "GEMINI_API_KEY", "mock-api-key"), patch(
        "app.services.deal_health.service.gemini_provider", custom_provider
    ):
        result = await evaluate_deal_health(sample_deal_request)

        assert result.riskScore == 48
        assert result.riskLevel == "MEDIUM"
        assert len(result.reasons) == 2
        assert "Moderate margin compression" in result.reasons[0]
        assert len(result.recommendations) == 1


@pytest.mark.asyncio
async def test_llm_error_timeout_fallback(sample_deal_request: DealHealthRequest):
    """Mock Gemini client raising TimeoutError; verify graceful deterministic fallback."""
    mock_client = MagicMock()
    mock_client.aio.models.generate_content = AsyncMock(
        side_effect=TimeoutError("Request timed out after 10000ms")
    )

    custom_provider = GeminiProvider(
        api_key="mock-api-key", model="gemini-2.5-flash", client=mock_client
    )

    with patch.object(settings, "GEMINI_API_KEY", "mock-api-key"), patch(
        "app.services.deal_health.service.gemini_provider", custom_provider
    ):
        result = await evaluate_deal_health(sample_deal_request)

        # Must return valid deterministic response without throwing 500/exception
        expected = calculate_deterministic_deal_health(sample_deal_request)
        assert isinstance(result, DealHealthResponseData)
        assert result.riskScore == expected.riskScore
        assert result.riskLevel == expected.riskLevel
        assert result.reasons == expected.reasons


@pytest.mark.asyncio
async def test_invalid_json_schema_fallback(sample_deal_request: DealHealthRequest):
    """Mock Gemini client returning malformed JSON or invalid schema."""
    test_cases = [
        "Malformed string without valid JSON {{{{",
        json.dumps({"riskScore": "NOT_A_NUMBER", "reasons": []}),
        json.dumps({"missingRiskScore": 50}),
    ]

    for malformed_content in test_cases:
        mock_client = MagicMock()
        mock_response = MagicMock()
        mock_response.text = malformed_content
        mock_client.aio.models.generate_content = AsyncMock(return_value=mock_response)

        custom_provider = GeminiProvider(
            api_key="mock-api-key", model="gemini-2.5-flash", client=mock_client
        )

        with patch.object(settings, "GEMINI_API_KEY", "mock-api-key"), patch(
            "app.services.deal_health.service.gemini_provider", custom_provider
        ):
            result = await evaluate_deal_health(sample_deal_request)

            expected = calculate_deterministic_deal_health(sample_deal_request)
            assert result.riskScore == expected.riskScore
            assert result.riskLevel == expected.riskLevel


def test_advisory_sanitization_in_validator():
    """Validator replaces prohibited imperative commands with safe advisory guidance."""
    raw_data = {
        "riskScore": 85,
        "riskLevel": "CRITICAL",
        "reasons": ["Severe negative margin detected"],
        "recommendations": [
            "Reject quotation immediately and decline customer.",
            "Change price to 10000 per unit.",
            "Modify inventory allocations right now.",
        ],
    }

    validated = validate_deal_health_output(raw_data)
    assert validated.riskScore == 85
    assert validated.riskLevel == "CRITICAL"

    # All three imperative recommendations must be sanitized
    for rec in validated.recommendations:
        assert rec == SAFE_ADVISORY_RECOMMENDATION
        assert "reject quotation" not in rec.lower()
        assert "change price" not in rec.lower()
        assert "modify inventory" not in rec.lower()


@pytest.mark.asyncio
async def test_no_api_key_deterministic_behavior(sample_deal_request: DealHealthRequest):
    """When GEMINI_API_KEY is empty, instant deterministic calculation occurs without LLM call."""
    with patch.object(settings, "GEMINI_API_KEY", ""), patch.object(
        gemini_provider, "generate_deal_health_analysis", new_callable=AsyncMock
    ) as mock_llm_call:
        result = await evaluate_deal_health(sample_deal_request)

        mock_llm_call.assert_not_called()
        expected = calculate_deterministic_deal_health(sample_deal_request)
        assert result.riskScore == expected.riskScore
        assert result.riskLevel == expected.riskLevel
