from typing import Any, Generic, Literal, Optional, TypeVar
from pydantic import BaseModel

T = TypeVar("T")


class ErrorDetail(BaseModel):
    code: str
    message: str
    details: Optional[dict[str, Any]] = None


class StandardErrorResponse(BaseModel):
    success: bool = False
    error: ErrorDetail
    requestId: Optional[str] = None


class StandardResponse(BaseModel, Generic[T]):
    success: bool = True
    data: T
    requestId: Optional[str] = None


class HealthResponse(BaseModel):
    status: Literal["HEALTHY", "DEGRADED", "UNAVAILABLE"] = "HEALTHY"
    version: str = "1.0.0"
    service: str = "dealflow360-ai"
