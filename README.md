# DealFlow360

> An intelligent, self-governing B2B Sales Operations platform that goes beyond quote-to-invoice by enforcing pricing discipline, reacting to inventory reality, and enabling live customer negotiation.

**Built in 24 hours at Odoo Hackathon 2026 — Finalist 🏆**

---

## Table of Contents

- [Overview](#overview)
- [Core Capabilities](#core-capabilities)
- [Tech Stack](#tech-stack)
- [Workflow](#workflow)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Team](#team)

---

## Overview

DealFlow360 is a full-stack B2B sales operations platform designed to close the gap between quoting and invoicing. Instead of treating pricing, inventory, and negotiation as static, manual steps, DealFlow360 actively governs them — enforcing discount ceilings, routing quotes for approval based on real-time risk scoring, reacting to live warehouse stock, and letting customers negotiate directly through a dedicated portal.

## Core Capabilities

| Feature | Description |
|---------|-------------|
| **Multi-tier Discount Governance** | Per-category, per-tier discount ceilings with blended risk scoring |
| **Automated Approval Routing** | Quotes auto-route to Manager or Finance based on risk score |
| **AI Upsell/Cross-sell** | Real-time product suggestions with margin impact |
| **Multi-Warehouse Fulfillment** | Auto-split orders based on live stock, with backorder handling |
| **Hybrid Billing** | One-time + recurring subscription lines on a single order |
| **Deal Health Monitoring** | Risk scores, stalled deals, and discount anomalies |
| **Customer Portal Negotiation** | Customers negotiate directly, re-entering approval if needed |
| **Role-Based Access** | Admin, Sales, Manager, Finance, Customer — each with dedicated dashboards |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Node.js + Express + Prisma ORM |
| Database | MySQL (18+ tables) |
| AI Service | Python + FastAPI |
| Auth | JWT with role-based routing |

## Workflow

```
Admin configures → Sales builds quote → Manager approves →
Finance fulfills & bills → Customer negotiates → Order complete
```

## Project Structure

```
Odoo-hackathon-2k26/
├── Frontend/         # React + Vite + Tailwind client
├── backend/          # Node.js + Express + Prisma API
├── ai-service/       # Python + FastAPI AI microservice
├── .env.example       # Sample environment configuration
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Python 3.10+
- MySQL

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Sham-S08/Odoo-hackathon-2k26.git
   cd Odoo-hackathon-2k26
   ```

2. Set up environment variables

   ```bash
   cp .env.example .env
   ```

   Then fill in the required values (see [Environment Variables](#environment-variables)).

3. Install and run the backend

   ```bash
   cd backend
   npm install
   npx prisma migrate dev
   npm run dev
   ```

4. Install and run the frontend

   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

5. Install and run the AI service

   ```bash
   cd ai-service
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

## Environment Variables

Copy `.env.example` to `.env` in the relevant service directories and configure values such as:

- Database connection string (MySQL)
- JWT secret
- AI service URL/API keys
- Frontend API base URL

Refer to `.env.example` in the repository root for the full list of required variables.

## Team

Built by the DealFlow360 team at the Odoo Hackathon 2026.

---

*This README was generated based on the project summary provided. Please update sections (setup commands, environment variables, team credits) to match the exact implementation details of this repository.*
