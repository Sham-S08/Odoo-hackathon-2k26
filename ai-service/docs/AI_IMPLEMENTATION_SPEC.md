# DealFlow360 AI Service Specification

## 1. System Role & Architecture Overview

The **DealFlow360 AI Service** acts as an internal, stateless intelligence microservice built on Python and FastAPI. It operates strictly as an advisory intelligence layer and interfaces solely with the primary **Node.js API Gateway**.

```
+-------------------------------------------------------------+
|                      DealFlow360 Frontend                   |
+-------------------------------------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                     Node.js API Gateway                     |
|            (Authoritative Source of Truth & DB)             |
+-------------------------------------------------------------+
               | (Internal REST / JSON HTTP)
               v
+-------------------------------------------------------------+
|                    FastAPI AI Service                       |
|           - Advisory Deal Health & Risk Scoring             |
|           - Natural Language Quotation Parsing              |
|           - Gemini LLM Provider Integration                 |
+-------------------------------------------------------------+
```

---

## 2. Core Architectural Principles & Strict Boundaries

1. **Advisory Role Only:**
   - The AI Service produces recommendations, risk assessments, and draft line items.
   - It **never** mutates business records, never connects directly to the MySQL database, never sets authoritative pricing, and never directly approves or rejects deals.

2. **Authoritative State in Node.js Gateway:**
   - The Node.js API Gateway is the single source of truth for business logic, permissions, inventory validation, customer verification, and transactional state changes.
   - Any suggestion output by this service must be confirmed by human operators or validated against authoritative business rules in the Gateway before persistence.

3. **Deterministic Governance & Strict Contracts:**
   - All external communication conforms strictly to Pydantic v2 schemas.
   - Unexpected payloads or schema deviations are rejected with standard error codes (`AI_VALIDATION_FAILED`).

---

## 3. Endpoints Catalog

### `GET /health`
- **Purpose**: Liveness and readiness probe for orchestration and gateway monitoring.
- **Contract**:
  - Response: `HealthResponse` (`status`, `version`, `service`).
  - Possible `status` values: `"HEALTHY"`, `"DEGRADED"`, `"UNAVAILABLE"`.

### `POST /v1/quotation-assistant`
- **Purpose**: Parses unstructured natural language user prompts (e.g., "Customer wants 5 units of industrial pumps with 10% discount") and matches them against catalog items to suggest structured quote lines.
- **Contract**:
  - Request: `QuotationAssistantRequest` (`customerId`, `prompt`, `currency`, `catalogContext`).
  - Response: `QuotationAssistantResponseData` (`customerId`, `items`, `notes`, `needsClarification`, `clarificationPrompt`).

### `POST /v1/deal-health`
- **Purpose**: Evaluates quotation margin, discounts, customer order history, and business rule violations to calculate an advisory risk score and generate actionable recommendations.
- **Contract**:
  - Request: `DealHealthRequest` (`quotationId`, `customer`, `financials`, `ruleViolations`, `dealSize`, `items`).
  - Response: `DealHealthResponseData` (`riskScore`, `riskLevel`, `reasons`, `recommendations`).

---

## 4. Risk Classification Matrix

Deal health scores are calculated on a deterministic scale from `0` to `100`:

| Risk Level | Score Range | Description | Recommended Governance Action |
|------------|-------------|-------------|-------------------------------|
| **LOW** | 0 – 30 | Low risk, healthy margin, compliant discounts, and known customer profile. | Standard approval flow or fast-track. |
| **MEDIUM** | 31 – 60 | Moderate risk (e.g. slight margin compression or new customer). | Standard managerial review. |
| **HIGH** | 61 – 80 | Elevated risk (e.g. steep discount, rule violation, or high total deal exposure). | Senior manager approval required. |
| **CRITICAL**| 81 – 100 | Severe risk (e.g. negative margin, unauthorized pricing breaches). | Executive escalation required before quoting. |

---

## 5. Error Handling Contract

All non-2xx responses are mapped to a uniform JSON structure:

```json
{
  "success": false,
  "error": {
    "code": "AI_VALIDATION_FAILED",
    "message": "Request validation failed",
    "details": { ... }
  },
  "requestId": "req-12345"
}
```

Standard error codes:
- `AI_VALIDATION_FAILED`: Request payload failed Pydantic schema validation (HTTP 422).
- `INTERNAL_SERVER_ERROR`: Unhandled exception within the AI microservice (HTTP 500).
- `SERVICE_UNAVAILABLE`: Downstream provider (e.g., Gemini API) is unreachable or failing (HTTP 503).
