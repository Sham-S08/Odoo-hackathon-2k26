"""Custom payload and domain validators."""
from .deal_health_validator import validate_deal_health_output
from .quotation_validator import validate_quotation_output

__all__ = ["validate_deal_health_output", "validate_quotation_output"]
