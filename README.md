# Forex Conversion Backend

## Overview
This service provides a simple API for converting currency amounts using live foreign exchange rates and storing conversion history. It exposes endpoints to fetch rates, perform conversions, and retrieve past conversions.

The backend is built with Node.js, Express, TypeScript, and PostgreSQL, using Prisma as the ORM.

---

## Tech Stack
- Node.js
- Express
- TypeScript (ESM / NodeNext)
- PostgreSQL
- Prisma ORM

---

## API Endpoints

### Health Check
GET /health


Response:
```json
{ "status": "ok" }

Fetch Exchange Rates
GET /rates?base=USD


Returns live exchange rates for the given base currency.

Convert Currency
POST /convert


Payload:

{
  "amount": 100,
  "baseCurrency": "USD",
  "targetCurrency": "KES"
}


Response:

{
  "amount": 100,
  "baseCurrency": "USD",
  "targetCurrency": "KES",
  "conversionRate": 145.23,
  "convertedAmount": 14523
}


Each successful conversion is persisted in the database.

Conversion History
GET /conversions


Returns a list of all past conversions, ordered by most recent first.

Setup Instructions
1. Install Dependencies
npm install

2. Environment Variables

Create a .env file:

DATABASE_URL=postgresql://...
EXCHANGE_RATE_API_KEY=your_api_key
EXCHANGE_RATE_BASE_URL=http://api.exchangerate.host
FRONTEND_ORIGIN=http://localhost:3001


An .env.example file is provided for reference.

3. Database Setup

Run migrations:

npx prisma migrate dev


(Optional) Open Prisma Studio:

npx prisma studio

4. Run the Server
npm run dev


The backend will start on http://localhost:3000.

Approach

Business logic is isolated in services.

Controllers handle request validation and orchestration.

Routes are thin and declarative.

Prisma is used only inside services.

External exchange rates are fetched via the exchangerate.host live endpoint, with conversion logic handled internally.

Errors are handled centrally with consistent JSON responses.

Assumptions

No authentication is required.

All conversions belong to a single global history.

Real-time exchange rates are sufficient; caching is not required for this scope.

The exchangerate.host /convert endpoint is not used due to subscription limitations.

Additional Notes

Input validation is intentionally duplicated on frontend and backend.

CORS is configured to allow a known frontend origin in development and can be restricted in production.

The codebase is structured to allow easy modification during live review.


