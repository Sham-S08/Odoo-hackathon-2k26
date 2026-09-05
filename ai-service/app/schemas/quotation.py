from typing import Any, Optional
from pydantic import BaseModel, Field


class QuotationAssistantItemSuggestion(BaseModel):
    productId: str
    quantity: int
    reason: Optional[str] = None
    confidence: float = Field(default=1.0, ge=0.0, le=1.0)


class QuotationAssistantRequest(BaseModel):
    customerId: str
    prompt: str
    currency: Optional[str] = "INR"
    catalogContext: Optional[list[dict[str, Any]]] = None


class QuotationAssistantResponseData(BaseModel):
    customerId: str
    items: list[QuotationAssistantItemSuggestion]
    notes: Optional[str] = None
    needsClarification: bool = False
    clarificationPrompt: Optional[str] = None
