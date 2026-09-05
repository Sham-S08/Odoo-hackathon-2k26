from typing import List

from app.schemas.deal_health import DealHealthRequest, DealHealthResponseData


def calculate_deterministic_deal_health(
    request: DealHealthRequest,
) -> DealHealthResponseData:
    """Pure, deterministic fallback scoring engine for quotation deal health.

    Computes risk score across 5 weighted dimensions and produces calibrated
    reasons and non-authoritative commercial recommendations.
    """
    reasons: List[str] = []
    recommendations: List[str] = []

    # 1. Base Risk Component (Starting: 10 points)
    base_risk = 10.0

    # 2. Rule Violation Component (Max: 40 points)
    violation_points = 0.0
    severity_weights = {
        "CRITICAL": 35.0,
        "HIGH": 25.0,
        "MEDIUM": 15.0,
        "LOW": 5.0,
    }

    for violation in request.ruleViolations:
        weight = severity_weights.get(violation.severity.upper(), 10.0)
        violation_points += weight

        if "DISCOUNT" in violation.type.upper():
            reasons.append(
                f"Discount exceeds configured policy: requested {violation.requested}% vs allowed {violation.allowed}%"
            )
        else:
            reasons.append(
                f"Policy violation detected ({violation.type}, severity {violation.severity}): "
                f"requested {violation.requested} vs allowed {violation.allowed}"
            )

    violation_risk = min(40.0, violation_points)

    # 3. Margin Compression Component (Max: 30 points)
    margin = request.financials.estimatedMarginPercent
    if margin >= 25.0:
        margin_risk = 0.0
        reasons.append(f"Estimated margin is healthy ({margin}%)")
    elif margin >= 15.0:
        margin_risk = 10.0
        reasons.append(f"Margin is moderate ({margin}%)")
    elif margin >= 5.0:
        margin_risk = 20.0
        reasons.append(f"Margin is compressed ({margin}%)")
    else:
        margin_risk = 30.0
        reasons.append(f"Critically low margin detected ({margin}%)")

    # 4. Discount Magnitude Component (Max: 20 points)
    discount = request.financials.discountPercent
    if discount <= 10.0:
        discount_risk = 0.0
        reasons.append(f"Overall discount is within standard limits ({discount}%)")
    elif discount <= 15.0:
        discount_risk = 5.0
        reasons.append(f"Moderate discount applied ({discount}%)")
    elif discount <= 25.0:
        discount_risk = 12.0
        reasons.append(f"Elevated discount applied ({discount}%)")
    else:
        discount_risk = 20.0
        reasons.append(f"Aggressive discount applied ({discount}%)")

    # 5. Customer History & Deal Size Anomaly Component (Max: 15 points)
    anomaly_points = 0.0
    customer = request.customer

    if customer.previousOrderCount == 0:
        anomaly_points += 5.0
        reasons.append("First-time customer; no prior transaction history")
        if request.dealSize > 1_000_000:
            anomaly_points += 5.0
            reasons.append("High-value transaction for new account")
    else:
        avg_order_value = (
            customer.previousTotalValue / customer.previousOrderCount
            if customer.previousOrderCount > 0
            else 0.0
        )
        if avg_order_value > 0 and request.dealSize > 3 * avg_order_value:
            anomaly_points += 10.0
            reasons.append("Quotation size exceeds 3x customer historical average")

    anomaly_risk = min(15.0, anomaly_points)

    # 6. Score Synthesis & Bounding
    raw_score = (
        base_risk
        + violation_risk
        + margin_risk
        + discount_risk
        + anomaly_risk
    )
    risk_score = max(0, min(100, round(raw_score)))

    # 7. Risk Classification
    if risk_score <= 30:
        risk_level = "LOW"
    elif risk_score <= 60:
        risk_level = "MEDIUM"
    elif risk_score <= 80:
        risk_level = "HIGH"
    else:
        risk_level = "CRITICAL"

    # 8. Advisory Recommendations Generation (Strict Governance)
    if risk_level == "LOW":
        recommendations.append(
            "Deal terms align with standard commercial guidelines; proceed to manager review"
        )
    elif risk_level == "MEDIUM":
        recommendations.append(
            "Manager review recommended to evaluate discounted line items and payment terms"
        )
    else:  # HIGH or CRITICAL
        recommendations.append(
            "Escalated manager and finance review required due to high discount or compressed margin"
        )
        recommendations.append(
            "Verify inventory allocation and fulfillment costs before granting approval"
        )

    return DealHealthResponseData(
        riskScore=risk_score,
        riskLevel=risk_level,
        reasons=reasons,
        recommendations=recommendations,
    )
