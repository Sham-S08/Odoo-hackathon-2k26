import json
import logging
from typing import Any, Optional

from google import genai
from google.genai import types

from app.config import settings
from app.schemas.deal_health import DealHealthRequest, DealHealthResponseData
from app.schemas.quotation import (
    QuotationAssistantRequest,
    QuotationAssistantResponseData,
)
from app.validators.deal_health_validator import validate_deal_health_output
from app.validators.quotation_validator import validate_quotation_output

logger = logging.getLogger(__name__)

DEAL_HEALTH_SYSTEM_INSTRUCTION = """You are an Expert B2B Sales Operations Risk Analyst for DealFlow360.
Your task is to analyze the commercial and operational risk of a quotation based on customer profile, order history, financial metrics, rule violations, and quotation line items.

Evaluation Guidelines:
1. Risk Score Calibration (0 - 100):
   - 0 to 30: LOW (Healthy margin, standard discounts, compliant customer profile)
   - 31 to 60: MEDIUM (Moderate discount, minor margin compression, or limited customer history)
   - 61 to 80: HIGH (Steep discounts, policy rule breaches, or significant margin degradation)
   - 81 to 100: CRITICAL (Severe pricing violations, negative margins, or excessive exposure)
2. Explainability:
   - Provide 2 to 4 detailed reasons explaining the observed signals (margin, discounts, customer history, violations).
3. Advisory Guidance (Strict Governance):
   - Provide 1 to 2 managerial recommendations.
   - All recommendations must be strictly advisory and commercial.
   - NEVER use imperative commands such as "Reject quotation", "Change price to X", or "Modify inventory".
4. Output Contract:
   - Output strict JSON with:
     - "riskScore": integer (0 to 100)
     - "riskLevel": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
     - "reasons": array of string descriptions
     - "recommendations": array of advisory suggestions
"""

QUOTATION_ASSISTANT_SYSTEM_INSTRUCTION = """You are an Expert B2B CPQ (Configure, Price, Quote) Assistant for DealFlow360.
Your task is to parse unstructured natural language sales requests and extract structured line item suggestions (products, quantities, warranties, services).

Strict Rules:
1. Product Mapping:
   - When a catalog is provided, you MUST map each item strictly to an available catalog item's "id" (or "sku").
   - If an item cannot be mapped to the catalog, use a descriptive identifier.
2. Quantities:
   - Extract explicit quantities. Default to 1 if not specified.
   - For services or warranties attached to a bundle of N units, apply the corresponding quantity or standard service unit.
3. No Hallucinated Pricing:
   - NEVER provide, estimate, or output prices, unit costs, rates, or total sums.
   - Authoritative pricing is fetched exclusively by the Node.js backend database.
4. Confidence Scoring:
   - Provide a confidence score between 0.0 and 1.0 for each item suggestion.
   - Assign higher confidence (>= 0.9) for exact catalog matches, and lower confidence (0.5 - 0.8) for fuzzy or ambiguous matches.
5. Ambiguity & Clarification Protocol:
   - If the request is too vague to identify any products or quantities (e.g. "Make something nice for the client", "Give me a good deal"), set "needsClarification": true and provide a helpful, polite "clarificationPrompt".
   - If items are found, set "needsClarification": false.
6. Output Contract:
   Output strict JSON matching:
   {
     "customerId": "<string>",
     "items": [
       {
         "productId": "<string>",
         "quantity": <integer >= 1>,
         "reason": "<string explanation>",
         "confidence": <float between 0.0 and 1.0>
       }
     ],
     "notes": "<optional summary or string>",
     "needsClarification": <boolean>,
     "clarificationPrompt": "<optional string question>"
   }
"""


class GeminiProvider:
    """LLM Provider interfacing with Google Gemini models."""

    def __init__(
        self,
        api_key: Optional[str] = None,
        model: Optional[str] = None,
        client: Optional[Any] = None,
    ) -> None:
        self._api_key = api_key or settings.GEMINI_API_KEY
        self._model = model or settings.GEMINI_MODEL
        if client is not None:
            self._client = client
        elif self._api_key:
            try:
                self._client = genai.Client(api_key=self._api_key)
            except Exception as exc:
                logger.error("Failed to initialize Gemini client: %s", exc)
                self._client = None
        else:
            self._client = None

    async def generate_deal_health_analysis(
        self, request: DealHealthRequest
    ) -> Optional[DealHealthResponseData]:
        """Generate structured deal health risk evaluation via Gemini LLM."""
        if not self._api_key or self._client is None:
            logger.debug("Gemini API key not configured or client uninitialized.")
            return None

        prompt = (
            f"Analyze Deal Health for Quotation ID: {request.quotationId}\n"
            f"Customer Tier: {request.customer.tier}\n"
            f"Customer Previous Orders: {request.customer.previousOrderCount}\n"
            f"Customer Previous Total Spend: {request.customer.previousTotalValue}\n"
            f"Subtotal: {request.financials.subtotal}\n"
            f"Discount Percent: {request.financials.discountPercent}%\n"
            f"Estimated Margin Percent: {request.financials.estimatedMarginPercent}%\n"
            f"Total Deal Size: {request.dealSize}\n"
            f"Policy Violations: {[v.model_dump() for v in request.ruleViolations]}\n"
            f"Quotation Line Items: {[item.model_dump() for item in request.items]}\n"
        )

        try:
            config = types.GenerateContentConfig(
                system_instruction=DEAL_HEALTH_SYSTEM_INSTRUCTION,
                response_mime_type="application/json",
                temperature=0.2,
            )

            response = await self._client.aio.models.generate_content(
                model=self._model,
                contents=prompt,
                config=config,
            )

            if not response or not response.text:
                logger.warning("Empty response received from Gemini LLM.")
                return None

            raw_dict = json.loads(response.text)
            validated_output = validate_deal_health_output(raw_dict)
            return validated_output

        except json.JSONDecodeError as json_err:
            logger.warning(
                "Failed to decode JSON from Gemini LLM output: %s", json_err
            )
            return None
        except Exception as exc:
            logger.warning("Gemini LLM evaluation encountered an error: %s", exc)
            return None

    async def generate_quotation_assistant_analysis(
        self, request: QuotationAssistantRequest
    ) -> Optional[QuotationAssistantResponseData]:
        """Parse natural language sales prompt into structured line item suggestions via Gemini LLM."""
        if not self._api_key or self._client is None:
            logger.debug("Gemini API key not configured or client uninitialized.")
            return None

        prompt = (
            f"Customer ID: {request.customerId}\n"
            f"Currency: {request.currency}\n"
            f"Sales Request Prompt: {request.prompt}\n"
            f"Available Product Catalog: {json.dumps(request.catalogContext) if request.catalogContext else 'No catalog provided'}\n"
        )

        try:
            config = types.GenerateContentConfig(
                system_instruction=QUOTATION_ASSISTANT_SYSTEM_INSTRUCTION,
                response_mime_type="application/json",
                temperature=0.2,
            )

            response = await self._client.aio.models.generate_content(
                model=self._model,
                contents=prompt,
                config=config,
            )

            if not response or not response.text:
                logger.warning(
                    "Empty response received from Gemini quotation assistant."
                )
                return None

            raw_dict = json.loads(response.text)
            # Inject customerId if omitted by the LLM
            if "customerId" not in raw_dict or not raw_dict["customerId"]:
                raw_dict["customerId"] = request.customerId

            validated_output = validate_quotation_output(
                raw_dict, catalog=request.catalogContext
            )
            return validated_output

        except json.JSONDecodeError as json_err:
            logger.warning(
                "Failed to decode JSON from Gemini quotation assistant output: %s",
                json_err,
            )
            return None
        except Exception as exc:
            logger.warning(
                "Gemini quotation assistant evaluation encountered an error: %s",
                exc,
            )
            return None


gemini_provider = GeminiProvider()
