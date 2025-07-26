import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  addItemToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.post("/add-to-cart", authMiddleware, addItemToCart);
cartRouter.delete("/remove-from-cart/:id", authMiddleware, removeFromCart);
cartRouter.get("/get-cart", authMiddleware, getCart);
cartRouter.put("/update-cart", authMiddleware, updateCart);
cartRouter.delete("/clear-cart", authMiddleware, clearCart);

export default cartRouter;
