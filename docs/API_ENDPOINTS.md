# API Endpoints Documentation

## Overview

This documentation provides a comprehensive overview of the REST API endpoints available for the Delizia B2B Distribution platform.

## Endpoints

### 1. Get All Products
- **Endpoint**: `/api/products`
- **Method**: GET
- **Description**: Retrieve all products in the inventory.

#### Request Example
```
GET /api/products HTTP/1.1
Host: api.delizia-b2b-distribution.com
Authorization: Bearer <token>
```

#### Response Example
```json
{
    "products": [
        {
            "id": 1,
            "name": "Product A",
            "price": 100.0,
            "description": "Description of Product A"
        },
        {
            "id": 2,
            "name": "Product B",
            "price": 150.0,
            "description": "Description of Product B"
        }
    ]
}
```

### 2. Create a New Product
- **Endpoint**: `/api/products`
- **Method**: POST
- **Description**: Create a new product in the inventory.

#### Request Example
```
POST /api/products HTTP/1.1
Host: api.delizia-b2b-distribution.com
Content-Type: application/json
Authorization: Bearer <token>

{
    "name": "Product C",
    "price": 200.0,
    "description": "Description of Product C"
}
```

#### Response Example
```json
{
    "id": 3,
    "name": "Product C",
    "price": 200.0,
    "description": "Description of Product C"
}
```

### 3. Update a Product
- **Endpoint**: `/api/products/{id}`
- **Method**: PUT
- **Description**: Update an existing product's information.

#### Request Example
```
PUT /api/products/3 HTTP/1.1
Host: api.delizia-b2b-distribution.com
Content-Type: application/json
Authorization: Bearer <token>

{
    "name": "Updated Product C",
    "price": 250.0,
    "description": "Updated description of Product C"
}
```

#### Response Example
```json
{
    "id": 3,
    "name": "Updated Product C",
    "price": 250.0,
    "description": "Updated description of Product C"
}
```

### 4. Delete a Product
- **Endpoint**: `/api/products/{id}`
- **Method**: DELETE
- **Description**: Delete a product from the inventory.

#### Request Example
```
DELETE /api/products/3 HTTP/1.1
Host: api.delizia-b2b-distribution.com
Authorization: Bearer <token>
```

#### Response Example
```json
{
    "message": "Product deleted successfully."
}
```

## Conclusion

This documentation outlines the basic endpoints for managing products within the Delizia B2B Distribution platform. For further details or additional endpoints, please refer to the official documentation.