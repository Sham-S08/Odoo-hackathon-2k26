import json
from unittest.mock import AsyncMock, MagicMock, patch
import pytest
from fastapi.testclient import TestClient

from app.config import settings
from app.providers.gemini_provider import GeminiProvider, gemini_provider
from app.schemas.quotation import (
    QuotationAssistantItemSuggestion,
    QuotationAssistantRequest,
    QuotationAssistantResponseData,
)
from app.services.quotation_assistant.catalog_matcher import (
    heuristic_quotation_extractor,
    match_catalog_product,
)
from app.services.quotation_assistant.service import assist_quotation
from app.validators.quotation_validator import validate_quotation_output


@pytest.fixture
def mock_catalog():
    return [
        {
            "id": "PROD-LAPTOP-XPS15",
            "name": "Dell XPS 15 Business Laptop",
            "sku": "DELL-XPS-15",
            "category": "Hardware",
        },
        {
            "id": "SRV-WARRANTY-2YR",
            "name": "2 Year Extended Hardware Warranty",
            "sku": "WARRANTY-2YR",
            "category": "Services",
        },
        {
            "id": "SRV-INSTALL-ONSITE",
            "name": "On-Site Hardware Installation Service",
            "sku": "SRV-INSTALL",
            "category": "Services",
        },
    ]


@pytest.mark.asyncio
async def test_standard_bundle_parsing_llm_mock(mock_catalog):
    """Request: '20 laptops with 2 year warranty and installation'

    Assert all 3 items extracted with quantities and confidence assigned.
    """
    llm_payload = {
        "customerId": "cust-enterprise-99",
        "items": [
            {
                "productId": "PROD-LAPTOP-XPS15",
                "quantity": 20,
                "reason": "Direct match for 20 laptops in prompt",
                "confidence": 0.95,
            },
            {
                "productId": "SRV-WARRANTY-2YR",
                "quantity": 20,
                "reason": "2-year extended warranty for 20 units",
                "confidence": 0.9,
            },
            {
                "productId": "SRV-INSTALL-ONSITE",
                "quantity": 20,
                "reason": "Installation service for deployment",
                "confidence": 0.88,
            },
        ],
        "notes": "Extracted hardware bundle with services and warranty.",
        "needsClarification": False,
    }

    mock_client = MagicMock()
    mock_response = MagicMock()
    mock_response.text = json.dumps(llm_payload)
    mock_client.aio.models.generate_content = AsyncMock(return_value=mock_response)

    custom_provider = GeminiProvider(
        api_key="mock-api-key", model="gemini-2.5-flash", client=mock_client
    )

    request = QuotationAssistantRequest(
        customerId="cust-enterprise-99",
        prompt="20 laptops with 2 year warranty and installation",
        currency="INR",
        catalogContext=mock_catalog,
    )

    with patch.object(settings, "GEMINI_API_KEY", "mock-api-key"), patch(
        "app.services.quotation_assistant.service.gemini_provider", custom_provider
    ):
        result = await assist_quotation(request)

        assert result.customerId == "cust-enterprise-99"
        assert result.needsClarification is False
        assert len(result.items) == 3

        product_ids = [item.productId for item in result.items]
        assert "PROD-LAPTOP-XPS15" in product_ids
        assert "SRV-WARRANTY-2YR" in product_ids
        assert "SRV-INSTALL-ONSITE" in product_ids

        for item in result.items:
            assert item.quantity == 20
            assert 0.0 <= item.confidence <= 1.0


@pytest.mark.asyncio
async def test_ambiguous_query_clarification():
    """Request: 'Make something nice for the client'

    Assert needsClarification is True and clarificationPrompt is populated.
    """
    request = QuotationAssistantRequest(
        customerId="cust-vague-01",
        prompt="Make something nice for the client",
        currency="INR",
        catalogContext=None,
    )

    # Testing offline / fallback heuristic directly and via service
    with patch.object(settings, "GEMINI_API_KEY", ""):
        result = await assist_quotation(request)

        assert result.needsClarification is True
        assert result.clarificationPrompt is not None
        assert len(result.clarificationPrompt) > 0
        assert len(result.items) == 0


def test_catalog_matching_logic(mock_catalog):
    """Verify catalog product matching: exact SKU, substring, and token matching."""
    # 1. Exact SKU
    prod_id, score = match_catalog_product("DELL-XPS-15", mock_catalog)
    assert prod_id == "PROD-LAPTOP-XPS15"
    assert score == 1.0

    # 2. Substring in name
    prod_id, score = match_catalog_product("XPS 15", mock_catalog)
    assert prod_id == "PROD-LAPTOP-XPS15"
    assert score >= 0.9

    # 3. Token match
    prod_id, score = match_catalog_product("warranty", mock_catalog)
    assert prod_id == "SRV-WARRANTY-2YR"
    assert score >= 0.5

    # 4. Unknown item
    prod_id, score = match_catalog_product("Industrial Crane XYZ", mock_catalog)
    assert prod_id is None
    assert score == 0.0


def test_stripping_hallucinated_prices(mock_catalog):
    """Ensure validator strips any injected price/rate/cost fields to preserve authoritative backend pricing."""
    raw_llm_output = {
        "customerId": "cust-test-price",
        "items": [
            {
                "productId": "PROD-LAPTOP-XPS15",
                "quantity": 5,
                "reason": "Matched product",
                "confidence": 0.95,
                "price": 120000.0,  # Hallucinated!
                "unitPrice": 24000.0,  # Hallucinated!
                "cost": 18000.0,  # Hallucinated!
                "rate": "24000 INR",  # Hallucinated!
                "total": 120000.0,  # Hallucinated!
            }
        ],
        "notes": "Draft quote",
        "needsClarification": False,
    }

    validated = validate_quotation_output(raw_llm_output, catalog=mock_catalog)
    assert len(validated.items) == 1

    item_dump = validated.items[0].model_dump()
    assert "price" not in item_dump
    assert "unitPrice" not in item_dump
    assert "cost" not in item_dump
    assert "rate" not in item_dump
    assert "total" not in item_dump
    assert item_dump["productId"] == "PROD-LAPTOP-XPS15"
    assert item_dump["quantity"] == 5
    assert item_dump["confidence"] == 0.95


@pytest.mark.asyncio
async def test_fallback_offline_heuristic(mock_catalog):
    """Test assist_quotation when GEMINI_API_KEY is empty.

    Verify basic quantity and keyword extraction works reliably.
    """
    request = QuotationAssistantRequest(
        customerId="cust-offline-01",
        prompt="Need 10 laptops and installation",
        currency="INR",
        catalogContext=mock_catalog,
    )

    with patch.object(settings, "GEMINI_API_KEY", ""):
        result = await assist_quotation(request)

        assert result.customerId == "cust-offline-01"
        assert result.needsClarification is False
        assert len(result.items) >= 1

        laptop_item = next(
            (i for i in result.items if "PROD-LAPTOP" in i.productId or "LAPTOP" in i.productId),
            None,
        )
        assert laptop_item is not None
        assert laptop_item.quantity == 10


def test_api_v1_quotation_assistant_endpoint(client: TestClient, mock_catalog):
    """Test POST /v1/quotation-assistant returns HTTP 200 with standard response envelope."""
    payload = {
        "customerId": "cust-api-01",
        "prompt": "5 laptops with 2 year warranty",
        "currency": "INR",
        "catalogContext": mock_catalog,
    }

    response = client.post("/v1/quotation-assistant", json=payload)
    assert response.status_code == 200

    body = response.json()
    assert body["success"] is True
    assert "data" in body

    data = body["data"]
    assert data["customerId"] == "cust-api-01"
    assert isinstance(data["items"], list)
    assert len(data["items"]) >= 1
    for item in data["items"]:
        assert "productId" in item
        assert "quantity" in item
        assert "confidence" in item
        assert "price" not in item
