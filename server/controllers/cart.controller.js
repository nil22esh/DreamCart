import Cart from "../models/cart.schema.js";
import Product from "./../models/product.schema.js";
import { validationResult } from "express-validator";

export const addItemToCart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { cartItems } = req.body;
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res
      .status(400)
      .json({ message: "Cart items are missing or invalid." });
  }
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        cartItems: [],
        totalQuantity: 0,
        totalPrice: 0,
      });
    }
    for (const item of cartItems) {
      const { productId, quantity } = item;
      if (!productId || quantity <= 0) continue;
      const product = await Product.findById(productId);
      if (!product) continue;
      const existingItemIndex = cart.cartItems.findIndex(
        (ci) => ci.productId.toString() === productId
      );
      if (existingItemIndex >= 0) {
        cart.cartItems[existingItemIndex].quantity += quantity;
      } else {
        cart.cartItems.push({ productId, quantity });
      }
    }
    let totalQty = 0;
    let totalPrice = 0;
    for (const item of cart.cartItems) {
      const product = await Product.findById(item.productId);
      if (product) {
        totalQty += item.quantity;
        totalPrice += product.price * item.quantity;
      }
    }
    cart.totalQuantity = totalQty;
    cart.totalPrice = totalPrice;
    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ message: "Server error while adding to cart." });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    const productId = req.params.productId;
    const existingItemIndex = cart.cartItems.findIndex(
      (ci) => ci.productId.toString() === productId
    );
    if (existingItemIndex >= 0) {
      cart.cartItems.splice(existingItemIndex, 1);
    }
    let totalQty = 0;
    let totalPrice = 0;
    for (const item of cart.cartItems) {
      const product = await Product.findById(item.productId);
      if (product) {
        totalQty += item.quantity;
        totalPrice += product.price * item.quantity;
      }
    }
    cart.totalQuantity = totalQty;
    cart.totalPrice = totalPrice;
    const updatedCart = await cart.save();
    return res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error removing from cart:", error.message);
    res.status(500).json({ message: "Server error while removing from cart." });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    return res.status(200).json({ message: "Cart fetched successfully", cart });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching cart", error });
  }
};

export const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate({ user: req.user._id }, req.body, {
      new: true,
    });
    return res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (error) {
    console.log(`Error while updating cart: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ user: req.user._id });
    return res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    console.log(`Error while clearing cart: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
