from typing import List
from pydantic import BaseModel, Field


class CustomerContext(BaseModel):
    tier: str
    previousOrderCount: int = 0
    previousTotalValue: float = 0.0


class FinancialContext(BaseModel):
    subtotal: float
    discountPercent: float
    estimatedMarginPercent: float


class RuleViolation(BaseModel):
    type: str
    requested: float
    allowed: float
    severity: str


class QuotationLineContext(BaseModel):
    category: str
    quantity: int
    discountPercent: float


class DealHealthRequest(BaseModel):
    quotationId: str
    customer: CustomerContext
    financials: FinancialContext
    ruleViolations: List[RuleViolation] = Field(default_factory=list)
    dealSize: float
    items: List[QuotationLineContext] = Field(default_factory=list)


class DealHealthResponseData(BaseModel):
    riskScore: int = Field(ge=0, le=100)
    riskLevel: str
    reasons: List[str]
    recommendations: List[str]
