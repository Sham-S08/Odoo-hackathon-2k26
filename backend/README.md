# DealFlow360 Backend

Node.js + Express + Prisma + MySQL backend implementing the uploaded DealFlow360 system specification.

## Architecture

```text
React
  |
  | REST / JSON
  v
Node.js + Express
  |
  +-- Auth / RBAC
  +-- Quotation Engine
  +-- Rule Engine
  +-- Approval Workflow
  +-- Negotiation Versioning
  +-- Inventory / Warehouse
  +-- Sales Orders
  +-- Invoices
  +-- Audit Logs
  |
  v
Prisma
  |
  v
MySQL

AI:
Node -> AI Gateway -> Python/FastAPI or other provider
```

## Setup

1. Create a MySQL database:

```sql
CREATE DATABASE dealflow360;
```

2. Copy `.env.example` to `.env` and set `DATABASE_URL`.

3. Install:

```bash
npm install
```

4. Generate Prisma client:

```bash
npx prisma generate
```

5. Create the database schema:

```bash
npx prisma migrate dev --name init
```

6. Seed demo data:

```bash
npm run seed
```

7. Start:

```bash
npm run dev
```

API: `http://localhost:5000`

Health: `GET /health`

Base API: `/api/v1`

## Demo users

All demo users use password `Admin@123`:

- `admin@dealflow360.local`
- `manager@dealflow360.local`
- `sales@dealflow360.local`
- `customer@abc.local`

## Important implementation decisions

- Product prices always come from MySQL, never from the LLM.
- Rule Engine is deterministic and reads DiscountRule records.
- Every quotation is created as `PENDING_APPROVAL`.
- Manager approval remains mandatory even when the rule engine passes.
- Customer negotiation creates a new QuotationVersion.
- Negotiation recalculates totals, evaluates rules, and calls Deal Health AI again.
- Customer access is restricted by `customerId`.
- Inventory is not touched when a quotation is created.
- Allocation happens after order creation.
- Inventory allocation and deduction are performed in a Prisma transaction.
- Invoice totals are calculated from the server-side order.
- Important state changes create AuditLog records.
- Public API starts at `/api/v1`.
- AI is accessed through an internal gateway so the provider can later be replaced.

## AI contract

The Node backend expects:

`POST ${AI_SERVICE_URL}/v1/quotation-assistant`

and:

`POST ${AI_SERVICE_URL}/v1/deal-health`

For a hackathon, you can run a small Python/FastAPI mock first and replace it with the real model later.

## End-to-end demo

1. Login as SALES.
2. Create quotation with `POST /api/v1/quotations`.
3. Generate deal health.
4. Login as MANAGER.
5. Read `GET /api/v1/approvals`.
6. Approve quotation.
7. Login as CUSTOMER.
8. View customer quotations.
9. Negotiate.
10. Manager approves the new version.
11. Customer accepts.
12. Create sales order.
13. Allocate inventory.
14. Create invoice.

## Production hardening still required

This is an MVP/hackathon backend, not production ERP software. Before production, add refresh-token rotation, stronger request validation, pagination, rate limiting, idempotency keys, proper money/Decimal handling end-to-end, concurrency-safe inventory reservation, structured logging, tests, secret management, and complete audit coverage.