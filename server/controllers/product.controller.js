import { validationResult } from "express-validator";
import Product from "../models/product.schema.js";
import mongoose, { mongo } from "mongoose";

export const postNewProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const userId = req.user._id;
  const {
    name,
    price,
    description,
    category,
    stock,
    reviews = [],
    rating,
    numReviews,
  } = req.body;
  try {
    const product = await Product.create({
      createdBy: userId,
      name,
      price,
      description,
      category,
      stock,
      reviews,
      rating,
      numReviews,
    });
    return res
      .status(201)
      .json({ message: "Product created successfully", product });
  } catch (error) {
    console.log(`Error while creating new product: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      message: "Products fetched successfully",
      count: products.length,
      products,
    });
  } catch (error) {
    console.log(`Error while fetching products: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductById = async (req, res) => {
  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({ message: "Product not found" });
  }
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product found", product });
  } catch (error) {
    console.log(`Error while fetching product: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProductById = async (req, res) => {
  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({ message: "Product not found" });
  }
  try {
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    console.log(`Error while updating product: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProductById = async (req, res) => {
  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({ message: "Product not found" });
  }
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted", product });
  } catch (error) {
    console.log(`Error while deleting product: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductsByCategory = async (req, res) => {
  const category = req.query.category;
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  try {
    const products = await Product.find({ category });
    return res
      .status(200)
      .json({ message: "Products found", count: products.length, products });
  } catch (error) {
    console.log(`Error while fetching products: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createProductReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const productId = req.params.id;
  const userId = req.user._id;
  const { rating, comment } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const review = {
      name: req.user.name,
      rating,
      comment,
      user: userId,
    };
    product.reviews.push(review);
    await product.save();
    return res.status(200).json({ message: "Review created", review });
  } catch (error) {
    console.log(`Error while creating review: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductReviews = async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    return res.status(404).json({ message: "Product not found" });
  }
  try {
    const reviews = await Product.find({ _id: productId }, { reviews: 1 });
    return res
      .status(200)
      .json({ message: "Reviews found", count: reviews.length, reviews });
  } catch (error) {
    console.log(`Error while fetching reviews: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProductReview = async (req, res) => {
  const productId = req.params.productId;
  const reviewId = req.params.reviewId;
  if (!productId || !reviewId) {
    return res.status(404).json({ message: "Product not found" });
  }
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const review = product.reviews.find(
      (review) => review._id.toString() === reviewId
    );
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    product.reviews = product.reviews.filter(
      (review) => review._id.toString() !== reviewId
    );
    await product.save();
    return res.status(200).json({ message: "Review deleted", review });
  } catch (error) {
    console.log(`Error while deleting review: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
