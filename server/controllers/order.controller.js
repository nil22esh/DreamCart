import { validationResult } from "express-validator";
import Order from "../models/order.schema.js";
import mongoose from "mongoose";

export const createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const userId = req.user._id;
  const {
    orderItems = [],
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = req.body;
  try {
    const order = await Order.create({
      orderItems,
      user: userId,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid,
      paidAt,
      isDelivered,
      deliveredAt,
    });
    return res
      .status(201)
      .json({ message: "Order created successfully", order });
  } catch (error) {
    console.log(`Error while creating order: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email phone");
    return res.status(200).json({
      message: "Orders fetched successfully",
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.log(`Error while fetching orders: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMyOrders = async (req, res) => {
  const userId = req.user._id;
  try {
    const orders = await Order.find({ user: userId });
    return res.status(200).json({
      message: "Orders fetched successfully",
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.log(`Error while fetching orders: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateOrder = async (req, res) => {
  const orderId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({ message: "Order id not found" });
  }
  try {
    const order = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "Order updated successfully", order });
  } catch (error) {
    console.log(`Error while updating order: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteOrder = async (req, res) => {
  const orderId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({ message: "Order id not found" });
  }
  try {
    const order = await Order.findByIdAndDelete(orderId);
    return res
      .status(200)
      .json({ message: "Order deleted successfully", order });
  } catch (error) {
    console.log(`Error while deleting order: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
