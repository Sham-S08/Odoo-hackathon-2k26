import pytest
from fastapi.testclient import TestClient

from app.schemas.deal_health import (
    CustomerContext,
    DealHealthRequest,
    FinancialContext,
    QuotationLineContext,
    RuleViolation,
)
from app.services.deal_health.fallback_engine import (
    calculate_deterministic_deal_health,
)
from app.services.deal_health.service import evaluate_deal_health


def test_healthy_deal_low_risk():
    """Gold customer, margin 30%, discount 8%, 0 violations."""
    request = DealHealthRequest(
        quotationId="deal-low-001",
        customer=CustomerContext(
            tier="GOLD",
            previousOrderCount=5,
            previousTotalValue=100000.0,
        ),
        financials=FinancialContext(
            subtotal=10000.0,
            discountPercent=8.0,
            estimatedMarginPercent=30.0,
        ),
        ruleViolations=[],
        dealSize=9200.0,
        items=[
            QuotationLineContext(
                category="HARDWARE",
                quantity=10,
                discountPercent=8.0,
            )
        ],
    )

    result = calculate_deterministic_deal_health(request)
    assert result.riskScore <= 30
    assert result.riskLevel == "LOW"
    assert any("healthy" in r.lower() for r in result.reasons)
    assert any("standard commercial guidelines" in rec for rec in result.recommendations)


def test_policy_violation_high_risk():
    """Deal with a HIGH severity violation and compressed margin."""
    request = DealHealthRequest(
        quotationId="deal-high-002",
        customer=CustomerContext(
            tier="SILVER",
            previousOrderCount=2,
            previousTotalValue=20000.0,
        ),
        financials=FinancialContext(
            subtotal=20000.0,
            discountPercent=18.0,
            estimatedMarginPercent=12.0,
        ),
        ruleViolations=[
            RuleViolation(
                type="MAX_DISCOUNT_EXCEEDED",
                requested=18.0,
                allowed=10.0,
                severity="HIGH",
            )
        ],
        dealSize=16400.0,
        items=[],
    )

    result = calculate_deterministic_deal_health(request)
    assert result.riskScore >= 61
    assert result.riskLevel in ("HIGH", "CRITICAL")
    assert any(
        "Discount exceeds configured policy: requested 18.0% vs allowed 10.0%" in r
        for r in result.reasons
    )


def test_severe_risk_critical():
    """Margin 2%, discount 30%, CRITICAL violation."""
    request = DealHealthRequest(
        quotationId="deal-crit-003",
        customer=CustomerContext(
            tier="STANDARD",
            previousOrderCount=1,
            previousTotalValue=10000.0,
        ),
        financials=FinancialContext(
            subtotal=50000.0,
            discountPercent=30.0,
            estimatedMarginPercent=2.0,
        ),
        ruleViolations=[
            RuleViolation(
                type="UNAUTHORIZED_PRICING",
                requested=30.0,
                allowed=10.0,
                severity="CRITICAL",
            )
        ],
        dealSize=35000.0,
        items=[],
    )

    result = calculate_deterministic_deal_health(request)
    assert result.riskScore >= 81
    assert result.riskLevel == "CRITICAL"
    assert any("Critically low margin" in r for r in result.reasons)
    assert any("Aggressive discount applied" in r for r in result.reasons)


def test_new_customer_anomaly():
    """0 previous orders, high deal size."""
    request = DealHealthRequest(
        quotationId="deal-new-004",
        customer=CustomerContext(
            tier="STANDARD",
            previousOrderCount=0,
            previousTotalValue=0.0,
        ),
        financials=FinancialContext(
            subtotal=2000000.0,
            discountPercent=5.0,
            estimatedMarginPercent=28.0,
        ),
        ruleViolations=[],
        dealSize=1900000.0,
        items=[],
    )

    result = calculate_deterministic_deal_health(request)
    assert "First-time customer; no prior transaction history" in result.reasons
    assert "High-value transaction for new account" in result.reasons


def test_score_boundaries_clamp():
    """Extreme synthetic inputs never exceed 100 or drop below 0."""
    extreme_high = DealHealthRequest(
        quotationId="extreme-high",
        customer=CustomerContext(
            tier="STANDARD",
            previousOrderCount=0,
            previousTotalValue=0.0,
        ),
        financials=FinancialContext(
            subtotal=10000000.0,
            discountPercent=50.0,
            estimatedMarginPercent=-10.0,
        ),
        ruleViolations=[
            RuleViolation(type="V1", requested=50.0, allowed=10.0, severity="CRITICAL"),
            RuleViolation(type="V2", requested=50.0, allowed=10.0, severity="CRITICAL"),
        ],
        dealSize=5000000.0,
        items=[],
    )

    res_high = calculate_deterministic_deal_health(extreme_high)
    assert res_high.riskScore == 100
    assert res_high.riskLevel == "CRITICAL"

    extreme_low = DealHealthRequest(
        quotationId="extreme-low",
        customer=CustomerContext(
            tier="PLATINUM",
            previousOrderCount=100,
            previousTotalValue=10000000.0,
        ),
        financials=FinancialContext(
            subtotal=1000.0,
            discountPercent=0.0,
            estimatedMarginPercent=50.0,
        ),
        ruleViolations=[],
        dealSize=1000.0,
        items=[],
    )
    res_low = calculate_deterministic_deal_health(extreme_low)
    assert 0 <= res_low.riskScore <= 30
    assert res_low.riskLevel == "LOW"


def test_advisory_compliance_never_dictates_business_mutations():
    """Recommendations must remain advisory and never dictate mutations."""
    forbidden_phrases = ["reject quotation", "change price", "modify inventory"]

    test_requests = [
        # Low risk
        DealHealthRequest(
            quotationId="t1",
            customer=CustomerContext(tier="GOLD", previousOrderCount=10, previousTotalValue=50000),
            financials=FinancialContext(subtotal=1000, discountPercent=5, estimatedMarginPercent=30),
            dealSize=950,
        ),
        # Medium risk
        DealHealthRequest(
            quotationId="t2",
            customer=CustomerContext(tier="SILVER", previousOrderCount=1, previousTotalValue=5000),
            financials=FinancialContext(subtotal=5000, discountPercent=14, estimatedMarginPercent=18),
            dealSize=4300,
        ),
        # High / Critical risk
        DealHealthRequest(
            quotationId="t3",
            customer=CustomerContext(tier="BRONZE", previousOrderCount=0, previousTotalValue=0),
            financials=FinancialContext(subtotal=50000, discountPercent=35, estimatedMarginPercent=2),
            dealSize=32500,
            ruleViolations=[
                RuleViolation(type="DISCOUNT_BREACH", requested=35, allowed=10, severity="CRITICAL")
            ],
        ),
    ]

    for req in test_requests:
        res = calculate_deterministic_deal_health(req)
        for rec in res.recommendations:
            for phrase in forbidden_phrases:
                assert phrase not in rec.lower(), f"Forbidden phrase '{phrase}' found in recommendation: '{rec}'"


@pytest.mark.asyncio
async def test_evaluate_deal_health_service():
    """Verify async service layer delegation."""
    request = DealHealthRequest(
        quotationId="async-test",
        customer=CustomerContext(tier="GOLD", previousOrderCount=5, previousTotalValue=50000),
        financials=FinancialContext(subtotal=10000, discountPercent=5, estimatedMarginPercent=30),
        dealSize=9500,
    )
    result = await evaluate_deal_health(request)
    assert result.riskLevel == "LOW"
    assert result.riskScore <= 30


def test_api_v1_deal_health_endpoint(client: TestClient):
    """Verify HTTP integration of evaluate_deal_health through FastAPI endpoint."""
    payload = {
        "quotationId": "api-quote-001",
        "customer": {
            "tier": "PLATINUM",
            "previousOrderCount": 10,
            "previousTotalValue": 200000.0,
        },
        "financials": {
            "subtotal": 15000.0,
            "discountPercent": 7.0,
            "estimatedMarginPercent": 32.0,
        },
        "dealSize": 13950.0,
        "ruleViolations": [],
        "items": [],
    }
    response = client.post("/v1/deal-health", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "riskScore" in data
    assert data["riskLevel"] == "LOW"
    assert len(data["reasons"]) > 0
    assert len(data["recommendations"]) > 0
