# Delizia B2B Platform Specifications

## Project Overview
The Delizia B2B platform aims to provide an efficient distribution system for businesses to manage their orders and supply efficiently. This platform will facilitate real-time interactions between suppliers and retailers, ensuring a seamless operation.

## Technology Stack
- **Frontend:** React.js
- **Backend:** Node.js with Express
- **Database:** MongoDB
- **Authentication:** OAuth 2.0
- **Hosting:** AWS or Heroku
- **Messaging:** WhatsApp API for notifications

## Data Models
1. **User** - Represents users of the platform (suppliers and retailers).
   - `id`: String
   - `name`: String
   - `role`: Enum (supplier, retailer)
   - `email`: String
   - `password`: String
   - `phone`: String

2. **Product** - Represents products to be sold through the platform.
   - `id`: String
   - `name`: String
   - `description`: String
   - `price`: Number
   - `stock`: Number

3. **Order** - Represents orders placed by retailers.
   - `id`: String
   - `userId`: String
   - `products`: Array of products
   - `status`: Enum (pending, shipped, delivered)

## API Endpoints
- **User Authentication**
   - `POST /api/auth/login`: Login user.
   - `POST /api/auth/register`: Register new user.

- **Products**
   - `GET /api/products`: Fetch all products.
   - `POST /api/products`: Add new product.
   - `PUT /api/products/:id`: Update product.
   - `DELETE /api/products/:id`: Remove product.

- **Orders**
   - `GET /api/orders`: Fetch all orders for a user.
   - `POST /api/orders`: Place a new order.
   - `PUT /api/orders/:id`: Update order status.

## User Roles
- **Admin:** Full access to the platform, can manage users, products, and orders.
- **Supplier:** Can add products and manage orders related to their products.
- **Retailer:** Can view products and place orders.

## WhatsApp Integration
The platform will integrate with the WhatsApp API to send notifications about:
- Order confirmation.
- Order shipping updates.
- Promotional messages.

## PDF Catalog Requirements
- Generate a PDF catalog containing all products formatted in a user-friendly manner.
- Allow users to download the catalog from the platform.

## Acceptance Criteria
- All specified API endpoints must be functional and return appropriate responses.
- Users must be able to register, log in, and perform actions based on their role.
- The PDF catalog should generate correctly and be downloadable.

## MVP Scope
- User authentication.
- Basic product management (CRUD operations).
- Order management for retailers.
- WhatsApp notification for order confirmations.
- PDF catalog generation.