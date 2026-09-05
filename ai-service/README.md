# DealFlow360 AI Service

An internal Python FastAPI intelligence microservice for **DealFlow360**. It provides natural language quote parsing and advisory deal risk assessments to the Node.js API Gateway.

---

## Architectural Principles

1. **Advisory Intelligence Only**: Does not directly connect to MySQL or mutate database records.
2. **Deterministic Governance**: Returns risk scores, reasons, and suggested items without overriding authoritative business rules.
3. **Strict Contracts**: Validates all incoming and outgoing payloads against strict Pydantic v2 schemas.

---

## Getting Started

### 1. Prerequisites
- Python 3.10+
- Virtual environment manager (`venv`)

### 2. Setup Virtual Environment
```bash
# From within the ai-service directory:
python -m venv .venv

# Activate the virtual environment
# Windows (PowerShell):
.\.venv\Scripts\Activate.ps1
# Windows (CMD):
.\.venv\Scripts\activate.bat
# Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Environment Configuration
Copy `.env.example` to `.env` and fill in your Gemini API key:
```bash
copy .env.example .env
```

### 4. Running the Service
```bash
uvicorn app.main:app --reload --port 8000
```
Interactive Swagger documentation will be available at:
`http://localhost:8000/docs`

### 5. Running Tests
```bash
pytest -v
```

---

## Directory Layout

```
ai-service/
├── app/
│   ├── __init__.py
│   ├── main.py                  # FastAPI application entrypoint
│   ├── config/                  # Pydantic settings and env loader
│   ├── schemas/                 # Strict Pydantic v2 API contracts
│   ├── services/                # Quotation parsing and deal health services
│   ├── providers/               # LLM integration (Gemini)
│   ├── validators/              # Custom validators
│   └── utils/                   # Error handling and helpers
├── tests/                       # Pytest test suite
├── docs/                        # Architecture & system specifications
├── requirements.txt             # Python dependencies
├── .env.example                 # Environment variables template
└── README.md
```
