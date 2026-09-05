from typing import Any, Optional


class ErrorCodes:
    AI_VALIDATION_FAILED = "AI_VALIDATION_FAILED"
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR"
    SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE"
    NOT_FOUND = "NOT_FOUND"


class AIServiceException(Exception):
    def __init__(
        self,
        code: str,
        message: str,
        details: Optional[dict[str, Any]] = None,
        status_code: int = 400,
    ) -> None:
        super().__init__(message)
        self.code = code
        self.message = message
        self.details = details
        self.status_code = status_code
