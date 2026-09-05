# DealFlow360 API Reference

Base URL: `http://localhost:5000/api/v1`

All responses use `{ success, data | error, message?, requestId }`. Except for
health and the public authentication endpoints, send
`Authorization: Bearer <token>`.

## Health

- GET `/health` — public API health check.

## Auth

- POST `/auth/register`
- POST `/auth/login`
- POST `/auth/refresh`
- POST `/auth/logout`
- GET `/auth/me`

## Company, master data, and inventory

All routes in this section require authentication. `PUT /company` and every
create, update, or delete operation listed below require `ADMIN`; read operations
are available to all authenticated users.

- GET/PUT `/company`
- GET/POST `/users`, GET/PUT/DELETE `/users/:id`
- GET/POST `/products`, GET/PUT/DELETE `/products/:id`
- GET/POST `/customers`, GET/PUT/DELETE `/customers/:id`
- GET/POST `/discount-rules`, GET/PUT/DELETE `/discount-rules/:id`
- GET/POST `/warehouses`, GET/PUT/DELETE `/warehouses/:id`
- GET `/inventory`, GET `/inventory/:productId`, PUT `/inventory/:id`

## Quotations

- POST `/quotations`
- GET `/quotations`
- GET `/quotations/:id`
- POST `/quotations/:id/submit`
- POST `/quotations/:id/approve`
- POST `/quotations/:id/reject`
- POST `/quotations/:id/deal-health`
- GET `/quotations/:id/deal-health`

## Approvals

- GET `/approvals`
- GET `/approvals/:id`

`HIGH` and `CRITICAL` risk quotations (risk score 70 or higher) are assigned to
`FINANCE_MANAGER`. Other quotations are assigned to `MANAGER`. Only the assigned
role can approve or reject a pending quotation. A high-severity discount rule
violation is also initially routed to the finance manager. A new deal-health
assessment reroutes only still-pending approvals.

## Negotiation

- POST `/negotiations/:id`

## Orders

- POST `/orders/from-quotation/:quotationId`
- GET `/orders`
- GET `/orders/:id`
- POST `/orders/:id/allocate`
- GET `/orders/:id/fulfillment`
- POST `/orders/:id/inventory/commit`

## Invoices

- POST `/invoices/from-order/:orderId`
- GET `/invoices`
- GET `/invoices/:id`

## AI

- POST `/ai/quotation-assistant`
- POST `/ai/deal-health`

`POST /quotations/:id/deal-health` saves the assessment and drives approval
routing. `POST /ai/deal-health` only proxies the AI gateway response.

## Route access summary

| Area | Roles |
| --- | --- |
| Create and submit quotations; quotation assistant | `SALES` |
| Approve/reject standard quotation | Assigned `MANAGER` |
| Approve/reject high-risk quotation | Assigned `FINANCE_MANAGER` |
| Submit negotiation | `CUSTOMER` |
| Create orders, allocate inventory, create invoices | `SALES`, `MANAGER` |
| Manage company master data and inventory | `ADMIN` |

## Quotation request

```json
{
  "customerId": "cus_123",
  "items": [
    {
      "productId": "prod_123",
      "quantity": 20,
      "discountPercent": 10
    }
  ],
  "notes": "B2B laptop package"
}
```

## Negotiation request

```json
{
  "requestedDiscountPercent": 15,
  "message": "Can you provide an additional discount for this quantity?"
}
```

## Standard response

```json
{
  "success": true,
  "data": {},
  "message": "Success",
  "requestId": "req_123"
}
```

## Standard error

```json
{
  "success": false,
  "error": {
    "code": "DISCOUNT_LIMIT_EXCEEDED",
    "message": "Requested discount exceeds configured policy",
    "details": {}
  },
  "requestId": "req_123"
}
```
