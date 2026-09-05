import pytest
from fastapi.testclient import TestClient
from pydantic import ValidationError

from app.schemas.deal_health import (
    CustomerContext,
    DealHealthRequest,
    DealHealthResponseData,
    FinancialContext,
    QuotationLineContext,
    RuleViolation,
)
from app.schemas.quotation import (
    QuotationAssistantItemSuggestion,
    QuotationAssistantRequest,
    QuotationAssistantResponseData,
)


def test_risk_score_bounds_valid():
    # Lower bound (0)
    res_min = DealHealthResponseData(
        riskScore=0,
        riskLevel="LOW",
        reasons=["All parameters within normal thresholds"],
        recommendations=["Proceed with standard approval"],
    )
    assert res_min.riskScore == 0

    # Upper bound (100)
    res_max = DealHealthResponseData(
        riskScore=100,
        riskLevel="CRITICAL",
        reasons=["Unacceptable margin breach"],
        recommendations=["Decline deal or require VP override"],
    )
    assert res_max.riskScore == 100


def test_risk_score_bounds_invalid():
    # Negative score
    with pytest.raises(ValidationError):
        DealHealthResponseData(
            riskScore=-5,
            riskLevel="LOW",
            reasons=["Invalid score"],
            recommendations=["Fix score"],
        )

    # Above 100
    with pytest.raises(ValidationError):
        DealHealthResponseData(
            riskScore=105,
            riskLevel="CRITICAL",
            reasons=["Invalid score"],
            recommendations=["Fix score"],
        )


def test_deal_health_request_parsing():
    payload = {
        "quotationId": "quote-2026-001",
        "customer": {
            "tier": "PLATINUM",
            "previousOrderCount": 12,
            "previousTotalValue": 450000.0,
        },
        "financials": {
            "subtotal": 125000.0,
            "discountPercent": 15.0,
            "estimatedMarginPercent": 24.5,
        },
        "ruleViolations": [
            {
                "type": "MAX_DISCOUNT_EXCEEDED",
                "requested": 15.0,
                "allowed": 10.0,
                "severity": "MEDIUM",
            }
        ],
        "dealSize": 106250.0,
        "items": [
            {
                "category": "INDUSTRIAL_PUMPS",
                "quantity": 5,
                "discountPercent": 15.0,
            }
        ],
    }

    req = DealHealthRequest.model_validate(payload)
    assert req.quotationId == "quote-2026-001"
    assert req.customer.tier == "PLATINUM"
    assert req.financials.subtotal == 125000.0
    assert len(req.ruleViolations) == 1
    assert req.ruleViolations[0].severity == "MEDIUM"
    assert len(req.items) == 1
    assert req.dealSize == 106250.0


def test_deal_health_request_defaults():
    payload = {
        "quotationId": "quote-2026-002",
        "customer": {
            "tier": "STANDARD",
        },
        "financials": {
            "subtotal": 5000.0,
            "discountPercent": 5.0,
            "estimatedMarginPercent": 35.0,
        },
        "dealSize": 4750.0,
    }

    req = DealHealthRequest.model_validate(payload)
    assert req.customer.previousOrderCount == 0
    assert req.customer.previousTotalValue == 0.0
    assert req.ruleViolations == []
    assert req.items == []


def test_quotation_assistant_serialization():
    req = QuotationAssistantRequest(
        customerId="cust-7788",
        prompt="Customer wants 3 laptops with 5% discount",
        currency="INR",
        catalogContext=[{"id": "lap-01", "name": "ProBook"}],
    )
    dumped_req = req.model_dump()
    assert dumped_req["customerId"] == "cust-7788"
    assert dumped_req["currency"] == "INR"
    assert len(dumped_req["catalogContext"]) == 1

    item = QuotationAssistantItemSuggestion(
        productId="prod-999",
        quantity=3,
        reason="Direct match for prompt requirement",
        confidence=0.95,
    )
    resp = QuotationAssistantResponseData(
        customerId="cust-7788",
        items=[item],
        notes="Matched items based on current inventory",
        needsClarification=False,
    )
    dumped_resp = resp.model_dump()
    assert dumped_resp["customerId"] == "cust-7788"
    assert len(dumped_resp["items"]) == 1
    assert dumped_resp["items"][0]["confidence"] == 0.95


def test_confidence_validation_bounds():
    # Valid confidence 0.0 to 1.0
    item_valid = QuotationAssistantItemSuggestion(
        productId="prod-1", quantity=1, confidence=0.0
    )
    assert item_valid.confidence == 0.0

    # Over 1.0
    with pytest.raises(ValidationError):
        QuotationAssistantItemSuggestion(
            productId="prod-1", quantity=1, confidence=1.5
        )

    # Under 0.0
    with pytest.raises(ValidationError):
        QuotationAssistantItemSuggestion(
            productId="prod-1", quantity=1, confidence=-0.1
        )


def test_fastapi_validation_error_handler(client: TestClient):
    # Sending invalid payload to trigger RequestValidationError
    response = client.post("/v1/deal-health", json={})
    assert response.status_code == 422

    data = response.json()
    assert data["success"] is False
    assert data["error"]["code"] == "AI_VALIDATION_FAILED"
    assert data["error"]["message"] == "Request validation failed"
    assert "errors" in data["error"]["details"]
