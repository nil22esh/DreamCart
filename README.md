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
