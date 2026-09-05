from typing import Any, Dict, List
from app.schemas.deal_health import DealHealthResponseData

FORBIDDEN_IMPERATIVE_PHRASES = [
    "reject quotation",
    "change price",
    "modify inventory",
    "reject quote",
    "reject",
    "decline quotation",
    "alter price",
    "adjust price",
    "modify prices",
]

SAFE_ADVISORY_RECOMMENDATION = (
    "Manager review recommended to verify quotation terms."
)


def validate_deal_health_output(raw_data: Dict[str, Any]) -> DealHealthResponseData:
    """Validate and sanitize raw dictionary output from Deal Health LLM analysis.

    1. Enforces integer riskScore clamped in [0, 100].
    2. Recalibrates riskLevel strictly matching the riskScore.
    3. Scans recommendations to sanitize any imperative commands.
    """
    if not isinstance(raw_data, dict):
        raise ValueError("Raw LLM output must be a dictionary")

    # 1. Enforce integer riskScore clamped in [0, 100]
    if "riskScore" not in raw_data:
        raise ValueError("Missing 'riskScore' in LLM output")

    try:
        raw_score = int(round(float(raw_data["riskScore"])))
    except (ValueError, TypeError) as exc:
        raise ValueError(f"Invalid riskScore value: {raw_data.get('riskScore')}") from exc

    clamped_score = max(0, min(100, raw_score))

    # 2. Re-verify riskLevel strictly matches score
    if clamped_score <= 30:
        calibrated_level = "LOW"
    elif clamped_score <= 60:
        calibrated_level = "MEDIUM"
    elif clamped_score <= 80:
        calibrated_level = "HIGH"
    else:
        calibrated_level = "CRITICAL"

    # 3. Parse and validate reasons
    raw_reasons = raw_data.get("reasons", [])
    if isinstance(raw_reasons, list):
        reasons: List[str] = [str(r).strip() for r in raw_reasons if str(r).strip()]
    else:
        reasons = [str(raw_reasons).strip()]

    if not reasons:
        reasons = ["Deal terms evaluated under standard commercial policy."]

    # 4. Scan recommendations for impermissible commands and sanitize
    raw_recommendations = raw_data.get("recommendations", [])
    if isinstance(raw_recommendations, list):
        recommendation_candidates: List[str] = [
            str(rec).strip() for rec in raw_recommendations if str(rec).strip()
        ]
    else:
        recommendation_candidates = [str(raw_recommendations).strip()]

    sanitized_recommendations: List[str] = []
    for rec in recommendation_candidates:
        rec_lower = rec.lower()
        has_imperative = any(
            phrase in rec_lower for phrase in FORBIDDEN_IMPERATIVE_PHRASES
        )
        if has_imperative:
            sanitized_recommendations.append(SAFE_ADVISORY_RECOMMENDATION)
        else:
            sanitized_recommendations.append(rec)

    if not sanitized_recommendations:
        sanitized_recommendations = [SAFE_ADVISORY_RECOMMENDATION]

    return DealHealthResponseData(
        riskScore=clamped_score,
        riskLevel=calibrated_level,
        reasons=reasons,
        recommendations=sanitized_recommendations,
    )
