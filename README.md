# 👤 User API - Express RESTful Endpoints

This module provides authentication and user profile management APIs for your MERN-based application. It includes secure registration, login, logout, profile updates, password resets, and admin-only access to all users.

---

## 📁 Routes Overview

Base URL: `/api/users`

| Method | Endpoint          | Description                           | Middleware                                 |
| ------ | ----------------- | ------------------------------------- | ------------------------------------------ |
| POST   | `/register`       | Register a new user                   | `validateRegistration`                     |
| POST   | `/login`          | Login user and return token           | `validateLogin`                            |
| GET    | `/me`             | Get current authenticated user        | `authMiddleware`                           |
| GET    | `/logout`         | Logout the user (clear token/session) |                                            |
| GET    | `/all-users`      | Fetch all users (admin only)          | `authMiddleware`, `isAdminMiddleware`      |
| PUT    | `/update-profile` | Update user profile info              | `authMiddleware`                           |
| PUT    | `/reset-password` | Reset the password securely           | `authMiddleware`, `validateUpdatePassword` |

---

## 🧠 Controllers

### `registerUser(req, res)`

- Registers a new user after validating input.
- Stores hashed password in DB.

### `loginUser(req, res)`

- Authenticates user using email and password.
- Returns a token/session upon success.

### `logoutUser(req, res)`

- Destroys the session or clears auth cookie/token.

### `getUser(req, res)`

- Returns the authenticated user's profile.

### `getAllUsers(req, res)`

- Returns all users (admin-only access).

### `updateUser(req, res)`

- Allows logged-in users to update name, email, phone, etc.

### `resetPassword(req, res)`

- Authenticated user can reset their password securely.

---

## 🛡️ Middlewares

### `authMiddleware`

- Verifies JWT token or session to protect private routes.

### `isAdminMiddleware`

- Checks if the authenticated user has an admin role.

---

## ✅ Validations

| Middleware               | Purpose                                        |
| ------------------------ | ---------------------------------------------- |
| `validateRegistration`   | Ensures user registration fields meet criteria |
| `validateLogin`          | Checks email/password format                   |
| `validateUpdatePassword` | Enforces password strength during reset        |

---

# 📦 Product API - RESTful Routes Documentation

This module provides a complete set of endpoints to manage products in an e-commerce platform. It includes features for product creation, updating, deletion, review management, and categorization. Admin privileges are required for sensitive operations like managing products, while authenticated users can post reviews.

---

## 🔄 API Endpoints

| Method | Endpoint                                              | Description                    | Middleware                                |
| ------ | ----------------------------------------------------- | ------------------------------ | ----------------------------------------- |
| POST   | `/add-product`                                        | Add a new product              | `validationPostProduct`, `authMiddleware` |
| GET    | `/get-all-products`                                   | Get all products (Admin Only)  | `authMiddleware`, `isAdminMiddleware`     |
| GET    | `/get-product/:id`                                    | Get a product by its ID        | `authMiddleware`                          |
| PUT    | `/update-product/:id`                                 | Update a product (Admin Only)  | `authMiddleware`, `isAdminMiddleware`     |
| DELETE | `/delete-product/:id`                                 | Delete a product (Admin Only)  | `authMiddleware`, `isAdminMiddleware`     |
| GET    | `/get-products-by-category?category=Electronics`      | Filter products by category    | `authMiddleware`                          |
| POST   | `/create-product-review/:id`                          | Create a review for a product  | `authMiddleware`                          |
| GET    | `/get-product-reviews/:id`                            | Get all reviews for a product  | `authMiddleware`                          |
| DELETE | `/delete-product-review/:productId/reviews/:reviewId` | Delete a review from a product | `authMiddleware`                          |

---

## 🧠 Controllers

### `postNewProduct(req, res)`

- Adds a new product to the database.

### `getAllProducts(req, res)`

- Returns all products (Admin only).

### `getProductById(req, res)`

- Fetches a product by its unique identifier.

### `updateProductById(req, res)`

- Updates product details (Admin only).

### `deleteProductById(req, res)`

- Deletes a product from the database (Admin only).

### `getProductsByCategory(req, res)`

- Filters products based on query param `category`.

### `createProductReview(req, res)`

- Adds a review for a product.

### `getProductReviews(req, res)`

- Fetches all reviews for a given product.

### `deleteProductReview(req, res)`

- Deletes a specific review from a product.

---

---

## ✅ Validation

### `validationPostProduct`

- Validates product fields like name, price, description, category, etc.

---

# 🛒 Orders API:

This module is part of a full-stack e-commerce application built with the MERN stack. It includes all API endpoints to manage **products**, **product reviews**, and **orders**.

---

---

## 📦 Product API Endpoints

| Method | Endpoint                                              | Description                    | Middleware                                |
| ------ | ----------------------------------------------------- | ------------------------------ | ----------------------------------------- |
| POST   | `/add-product`                                        | Add a new product              | `validationPostProduct`, `authMiddleware` |
| GET    | `/get-all-products`                                   | Get all products (Admin Only)  | `authMiddleware`, `isAdminMiddleware`     |
| GET    | `/get-product/:id`                                    | Get a product by its ID        | `authMiddleware`                          |
| PUT    | `/update-product/:id`                                 | Update a product (Admin Only)  | `authMiddleware`, `isAdminMiddleware`     |
| DELETE | `/delete-product/:id`                                 | Delete a product (Admin Only)  | `authMiddleware`, `isAdminMiddleware`     |
| GET    | `/get-products-by-category?category=Electronics`      | Filter products by category    | `authMiddleware`                          |
| POST   | `/create-product-review/:id`                          | Create a review for a product  | `authMiddleware`                          |
| GET    | `/get-product-reviews/:id`                            | Get all reviews for a product  | `authMiddleware`                          |
| DELETE | `/delete-product-review/:productId/reviews/:reviewId` | Delete a review from a product | `authMiddleware`                          |

---

## 📦 Product Controller Functions

- `postNewProduct` – Create a new product
- `getAllProducts` – Get list of all products (Admin only)
- `getProductById` – Get product details by ID
- `updateProductById` – Update product details (Admin only)
- `deleteProductById` – Remove a product (Admin only)
- `getProductsByCategory` – Get products by category
- `createProductReview` – Submit a review for a product
- `getProductReviews` – Retrieve product reviews
- `deleteProductReview` – Remove a review from a product

---

## 📦 Order API Endpoints

| Method | Endpoint            | Description                       | Middleware                                 |
| ------ | ------------------- | --------------------------------- | ------------------------------------------ |
| POST   | `/create-order`     | Create a new order                | `validationsCreateOrder`, `authMiddleware` |
| GET    | `/all-orders`       | Get all orders (Admin only)       | `authMiddleware`, `isAdminMiddleware`      |
| GET    | `/my-orders`        | Get all orders placed by the user | `authMiddleware`                           |
| PUT    | `/update-order/:id` | Update an existing order          | `authMiddleware`                           |
| DELETE | `/delete-order/:id` | Cancel/delete an order            | `authMiddleware`                           |

---

## 📦 Order Controller Functions

- `createOrder` – Create and place a new order
- `getAllOrders` – Fetch all orders (Admin only)
- `getMyOrders` – Get orders placed by current user
- `updateOrder` – Modify an order (status, payment, etc.)
- `deleteOrder` – Delete/cancel a user order

---

## 🛡️ Middlewares

### `authMiddleware`

- Ensures that the user is authenticated using JWT/session.

### `isAdminMiddleware`

- Grants access to admin-only routes after role verification.

---

## ✅ Validations

- `validationPostProduct` – Ensures product fields (e.g., name, price, category) are correct before creation.
- `validationsCreateOrder` – Verifies product list, shipping address, total amount before processing an order.

---
