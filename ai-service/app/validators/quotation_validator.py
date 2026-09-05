from typing import Any, Dict, List, Optional

from app.schemas.quotation import (
    QuotationAssistantItemSuggestion,
    QuotationAssistantResponseData,
)

HALLUCINATED_PRICE_KEYS = {
    "price",
    "cost",
    "total",
    "unitprice",
    "unit_price",
    "rate",
    "amount",
    "subtotal",
    "discount",
    "currency",
}


def validate_quotation_output(
    raw_data: Dict[str, Any], catalog: Optional[List[Dict[str, Any]]] = None
) -> QuotationAssistantResponseData:
    """Validate and sanitize raw LLM output for Quotation Assistant.

    1. Ensures quantity >= 1 for all items.
    2. Clamps confidence strictly between 0.0 and 1.0.
    3. Strips all hallucinated pricing fields to maintain strict separation of concerns.
    """
    if not isinstance(raw_data, dict):
        raise ValueError("Raw quotation assistant output must be a dictionary")

    customer_id = str(raw_data.get("customerId") or "").strip()
    notes = raw_data.get("notes")
    needs_clarification = bool(raw_data.get("needsClarification", False))
    clarification_prompt = raw_data.get("clarificationPrompt")

    raw_items = raw_data.get("items", [])
    sanitized_items: List[QuotationAssistantItemSuggestion] = []

    if isinstance(raw_items, list):
        for raw_item in raw_items:
            if not isinstance(raw_item, dict):
                continue

            # Strip any hallucinated price keys
            cleaned_item = {
                k: v
                for k, v in raw_item.items()
                if k.lower() not in HALLUCINATED_PRICE_KEYS
            }

            prod_id = str(
                cleaned_item.get("productId") or cleaned_item.get("id") or ""
            ).strip()
            if not prod_id:
                continue

            # Enforce quantity >= 1
            try:
                quantity = max(1, int(cleaned_item.get("quantity", 1)))
            except (ValueError, TypeError):
                quantity = 1

            # Clamp confidence between 0.0 and 1.0
            try:
                confidence = max(
                    0.0, min(1.0, float(cleaned_item.get("confidence", 1.0)))
                )
            except (ValueError, TypeError):
                confidence = 1.0

            reason = cleaned_item.get("reason")
            sanitized_items.append(
                QuotationAssistantItemSuggestion(
                    productId=prod_id,
                    quantity=quantity,
                    reason=str(reason) if reason is not None else None,
                    confidence=confidence,
                )
            )

    # If no items and clarification prompt exists, flag needsClarification
    if not sanitized_items and clarification_prompt:
        needs_clarification = True

    return QuotationAssistantResponseData(
        customerId=customer_id,
        items=sanitized_items,
        notes=str(notes) if notes is not None else None,
        needsClarification=needs_clarification,
        clarificationPrompt=str(clarification_prompt)
        if clarification_prompt
        else None,
    )
