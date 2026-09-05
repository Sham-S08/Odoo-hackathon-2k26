import logging
from app.config import settings
from app.providers import gemini_provider
from app.schemas.deal_health import DealHealthRequest, DealHealthResponseData
from app.services.deal_health.fallback_engine import (
    calculate_deterministic_deal_health,
)

logger = logging.getLogger(__name__)


async def evaluate_deal_health(
    request: DealHealthRequest,
) -> DealHealthResponseData:
    """Evaluate quotation health and risk.

    Performs dynamic context analysis using Gemini LLM when configured,
    and automatically falls back to the deterministic engine if the LLM
    fails, times out, returns malformed data, or lacks API credentials.
    """
    if settings.GEMINI_API_KEY:
        try:
            llm_result = await gemini_provider.generate_deal_health_analysis(request)
            if llm_result is not None:
                return llm_result
            logger.warning(
                "Deal Health LLM analysis unavailable or failed. Utilizing deterministic fallback engine."
            )
        except Exception as exc:
            logger.warning(
                "Deal Health LLM analysis encountered an unhandled error (%s). "
                "Utilizing deterministic fallback engine.",
                exc,
            )

    return calculate_deterministic_deal_health(request)
