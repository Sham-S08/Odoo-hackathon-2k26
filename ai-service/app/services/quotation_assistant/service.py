import logging

from app.config import settings
from app.providers import gemini_provider
from app.schemas.quotation import (
    QuotationAssistantRequest,
    QuotationAssistantResponseData,
)
from app.services.quotation_assistant.catalog_matcher import (
    heuristic_quotation_extractor,
)

logger = logging.getLogger(__name__)


async def assist_quotation(
    request: QuotationAssistantRequest,
) -> QuotationAssistantResponseData:
    """Process natural language quotation prompt into structured item suggestions.

    Attempts LLM parsing via GeminiProvider when configured; on API absence,
    network failure, or malformed responses, gracefully falls back to the
    deterministic heuristic extractor.
    """
    if settings.GEMINI_API_KEY:
        try:
            llm_result = (
                await gemini_provider.generate_quotation_assistant_analysis(request)
            )
            if llm_result is not None:
                return llm_result
            logger.warning(
                "Quotation Assistant LLM analysis failed or unavailable. "
                "Utilizing deterministic heuristic extractor fallback."
            )
        except Exception as exc:
            logger.warning(
                "Quotation Assistant LLM encountered an unhandled error (%s). "
                "Utilizing deterministic heuristic extractor fallback.",
                exc,
            )

    return heuristic_quotation_extractor(
        request.prompt,
        catalog=request.catalogContext,
        customer_id=request.customerId,
    )
