# Delizia B2B Distribution

Delizia B2B Distribution is a starter backend API for managing users, products, orders, and product catalog exports.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the API server:
   ```bash
   npm start
   ```
3. Open health check:
   ```
   http://localhost:3000/api/health
   ```

## Available Scripts

- `npm start` - run server on port `3000` (or `PORT` env variable).
- `npm run dev` - run in watch mode.
- `npm test` - syntax check for server file.

## Environment Variables

- `PORT` (optional): default `3000`
- `JWT_SECRET` (optional): default `dev-secret-change-me`

## Core Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Products (requires Bearer token)
- `GET /api/products`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

### Orders (requires Bearer token)
- `GET /api/orders`
- `POST /api/orders`
- `PUT /api/orders/:id`

### Catalog (requires Bearer token)
- `GET /api/catalog.pdf`

## Notes

- Current implementation uses **in-memory storage** for MVP speed.
- Data is reset whenever the server restarts.
- MongoDB integration can be added next as a phase-2 step.
