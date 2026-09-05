from typing import Any
from fastapi import FastAPI, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.config import settings
from app.schemas.common import (
    ErrorDetail,
    HealthResponse,
    StandardErrorResponse,
    StandardResponse,
)
from app.schemas.deal_health import DealHealthRequest, DealHealthResponseData
from app.schemas.quotation import (
    QuotationAssistantRequest,
    QuotationAssistantResponseData,
)
from app.services.deal_health import evaluate_deal_health
from app.services.quotation_assistant import assist_quotation
from app.utils.errors import AIServiceException, ErrorCodes

app = FastAPI(
    title="DealFlow360 AI Service",
    version="1.0.0",
    description="Advisory AI intelligence microservice for DealFlow360",
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    error_response = StandardErrorResponse(
        success=False,
        error=ErrorDetail(
            code=ErrorCodes.AI_VALIDATION_FAILED,
            message="Request validation failed",
            details={"errors": jsonable_encoder(exc.errors())},
        ),
        requestId=request.headers.get("X-Request-ID"),
    )
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=error_response.model_dump(),
    )


@app.exception_handler(AIServiceException)
async def ai_service_exception_handler(
    request: Request, exc: AIServiceException
) -> JSONResponse:
    error_response = StandardErrorResponse(
        success=False,
        error=ErrorDetail(
            code=exc.code,
            message=exc.message,
            details=exc.details,
        ),
        requestId=request.headers.get("X-Request-ID"),
    )
    return JSONResponse(
        status_code=exc.status_code,
        content=error_response.model_dump(),
    )


@app.exception_handler(Exception)
async def generic_exception_handler(
    request: Request, exc: Exception
) -> JSONResponse:
    error_response = StandardErrorResponse(
        success=False,
        error=ErrorDetail(
            code=ErrorCodes.INTERNAL_SERVER_ERROR,
            message="An unexpected internal error occurred",
            details={"error_type": type(exc).__name__},
        ),
        requestId=request.headers.get("X-Request-ID"),
    )
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=error_response.model_dump(),
    )


@app.get(
    "/health",
    response_model=HealthResponse,
    tags=["System"],
    summary="Service Health Check",
)
async def get_health() -> HealthResponse:
    return HealthResponse(
        status="HEALTHY",
        version="1.0.0",
        service="dealflow360-ai",
    )


@app.post(
    "/v1/quotation-assistant",
    response_model=StandardResponse[QuotationAssistantResponseData],
    tags=["Quotation"],
    summary="Natural Language Quotation Assistant (Advisory)",
)
async def post_quotation_assistant(
    payload: QuotationAssistantRequest,
    request: Request,
) -> StandardResponse[QuotationAssistantResponseData]:
    result = await assist_quotation(payload)
    return StandardResponse(
        success=True,
        data=result,
        requestId=request.headers.get("X-Request-ID"),
    )


@app.post(
    "/v1/deal-health",
    response_model=DealHealthResponseData,
    tags=["Deal Health"],
    summary="Advisory Deal Health and Risk Analysis",
)
async def post_deal_health(
    payload: DealHealthRequest,
) -> Any:
    return await evaluate_deal_health(payload)
