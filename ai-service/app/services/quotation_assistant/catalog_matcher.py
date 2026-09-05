import re
from typing import Any, Dict, List, Optional, Tuple

from app.schemas.quotation import (
    QuotationAssistantItemSuggestion,
    QuotationAssistantResponseData,
)


def match_catalog_product(
    item_name: str, catalog: List[Dict[str, Any]]
) -> Tuple[Optional[str], float]:
    """Match an item name against catalog items using normalized token matching.

    Returns a tuple of (matched_product_id, confidence_score).
    """
    if not catalog or not item_name:
        return None, 0.0

    normalized_query = item_name.strip().lower()
    query_tokens = set(re.findall(r"\w+", normalized_query))

    best_match_id: Optional[str] = None
    best_score = 0.0

    for product in catalog:
        prod_id = str(
            product.get("id") or product.get("productId") or product.get("sku") or ""
        )
        prod_name = str(product.get("name") or product.get("title") or "").strip().lower()
        prod_sku = str(product.get("sku") or "").strip().lower()

        # 1. Exact match on SKU or full name
        if normalized_query == prod_sku or normalized_query == prod_name:
            return prod_id, 1.0

        # 2. Substring match
        if normalized_query in prod_name or prod_name in normalized_query:
            score = 0.95
            if score > best_score:
                best_score = score
                best_match_id = prod_id
            continue

        # 3. Token overlap match
        prod_tokens = set(re.findall(r"\w+", prod_name))
        if prod_tokens and query_tokens:
            common = query_tokens.intersection(prod_tokens)
            if common:
                overlap = len(common) / max(len(query_tokens), 1)
                score = round(min(0.9, 0.5 + 0.4 * overlap), 2)
                if score > best_score:
                    best_score = score
                    best_match_id = prod_id

    if best_score >= 0.5:
        return best_match_id, best_score

    return None, 0.0


def heuristic_quotation_extractor(
    prompt: str,
    catalog: Optional[List[Dict[str, Any]]] = None,
    customer_id: str = "",
) -> QuotationAssistantResponseData:
    """Deterministic, regex-based fallback extractor for quotation prompts."""
    prompt_clean = prompt.strip()
    if not prompt_clean:
        return QuotationAssistantResponseData(
            customerId=customer_id,
            items=[],
            needsClarification=True,
            clarificationPrompt="Please specify the products or quantities you want included in the quotation.",
        )

    # Detect ambiguity phrases or lack of product/quantity signals
    ambiguity_indicators = [
        "make something",
        "good deal",
        "best offer",
        "prepare a quote",
        "create a quote",
        "help me",
    ]
    has_quantity = bool(re.search(r"\b\d+\b", prompt_clean))

    items: List[QuotationAssistantItemSuggestion] = []

    # Regex patterns for primary items: e.g. "20 laptops", "5 industrial pumps"
    primary_matches = re.findall(
        r"(\d+)\s+(?:units?\s+of\s+)?([a-zA-Z0-9\-_]+(?:\s+[a-zA-Z0-9\-_]+)*?)(?=\s+with|\s+and|\s*,|\s*\.|\s*$)",
        prompt_clean,
        flags=re.IGNORECASE,
    )

    base_quantity = 1
    for qty_str, raw_name in primary_matches:
        raw_name_clean = raw_name.strip()
        # Filter out noise words
        if raw_name_clean.lower() in ("year", "years", "month", "months", "discount"):
            continue
        try:
            qty = int(qty_str)
            base_quantity = qty
        except ValueError:
            qty = 1

        matched_id = None
        confidence = 0.8
        if catalog:
            matched_id, conf = match_catalog_product(raw_name_clean, catalog)
            if matched_id:
                confidence = conf

        prod_id = matched_id or f"PROD-{raw_name_clean.upper().replace(' ', '_')}"
        items.append(
            QuotationAssistantItemSuggestion(
                productId=prod_id,
                quantity=qty,
                reason=f"Extracted from prompt requirement: '{qty_str} {raw_name_clean}'",
                confidence=confidence,
            )
        )

    # Check for warranty bundles (e.g. "2 year warranty", "with warranty")
    warranty_match = re.search(
        r"(\d+)\s*(?:-| )?year\s+warranty|warranty", prompt_clean, flags=re.IGNORECASE
    )
    if warranty_match:
        warranty_years = warranty_match.group(1) or "1"
        matched_id = None
        confidence = 0.85
        if catalog:
            matched_id, conf = match_catalog_product("warranty", catalog)
            if matched_id:
                confidence = conf
        prod_id = matched_id or f"SRV-WARRANTY-{warranty_years}YR"
        items.append(
            QuotationAssistantItemSuggestion(
                productId=prod_id,
                quantity=base_quantity,
                reason=f"{warranty_years}-year warranty coverage",
                confidence=confidence,
            )
        )

    # Check for installation / setup services
    if re.search(r"\b(?:installation|setup|deployment)\b", prompt_clean, flags=re.IGNORECASE):
        matched_id = None
        confidence = 0.85
        if catalog:
            matched_id, conf = match_catalog_product("installation", catalog)
            if matched_id:
                confidence = conf
        prod_id = matched_id or "SRV-INSTALLATION"
        items.append(
            QuotationAssistantItemSuggestion(
                productId=prod_id,
                quantity=base_quantity,
                reason="On-site installation and configuration service",
                confidence=confidence,
            )
        )

    # If no items could be identified or prompt is purely vague
    if not items or (not has_quantity and any(ind in prompt_clean.lower() for ind in ambiguity_indicators)):
        return QuotationAssistantResponseData(
            customerId=customer_id,
            items=[],
            needsClarification=True,
            clarificationPrompt="Please specify the products or quantities you want included in the quotation.",
        )

    return QuotationAssistantResponseData(
        customerId=customer_id,
        items=items,
        notes="Extracted via heuristic fallback engine",
        needsClarification=False,
    )
