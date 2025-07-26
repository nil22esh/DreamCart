import express from "express";
import { validationsCreateOrder } from "../validations/order.validations.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getMyOrders,
  updateOrder,
} from "../controllers/order.controller.js";
import { isAdminMiddleware } from "./../middlewares/isAdmin.middleware.js";

const orderRouter = express.Router();

orderRouter.post(
  "/create-order",
  validationsCreateOrder,
  authMiddleware,
  createOrder
);
orderRouter.get("/all-orders", authMiddleware, isAdminMiddleware, getAllOrders);
orderRouter.get("/my-orders", authMiddleware, getMyOrders);
orderRouter.put("/update-order/:id", authMiddleware, updateOrder);
orderRouter.delete("/delete-order/:id", authMiddleware, deleteOrder);

export default orderRouter;
