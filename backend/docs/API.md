# DealFlow360 API Quick Reference

Base: `/api/v1`

## Auth

- POST `/auth/register`
- POST `/auth/login`
- POST `/auth/refresh`
- POST `/auth/logout`
- GET `/auth/me`

## Admin

- GET/PUT `/company`
- CRUD `/users`
- CRUD `/products`
- CRUD `/customers`
- CRUD `/discount-rules`
- CRUD `/warehouses`
- GET `/inventory`
- GET `/inventory/:productId`
- PUT `/inventory/:id`

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