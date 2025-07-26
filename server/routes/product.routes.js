import express from "express";
import { body } from "express-validator";
import { authMiddleware } from "./../middlewares/auth.middleware.js";
import {
  createProductReview,
  deleteProductById,
  deleteProductReview,
  getAllProducts,
  getProductById,
  getProductReviews,
  getProductsByCategory,
  postNewProduct,
  updateProductById,
} from "../controllers/product.controller.js";
import { isAdminMiddleware } from "./../middlewares/isAdmin.middleware.js";
import { validationPostProduct } from "../validations/product.validations.js";

const productRouter = express.Router();

productRouter.post(
  "/add-product",
  validationPostProduct,
  authMiddleware,
  postNewProduct
);
productRouter.get(
  "/get-all-products",
  authMiddleware,
  isAdminMiddleware,
  getAllProducts
);
productRouter.get("/get-product/:id", authMiddleware, getProductById);
productRouter.put(
  "/update-product/:id",
  authMiddleware,
  isAdminMiddleware,
  updateProductById
);
productRouter.delete(
  "/delete-product/:id",
  authMiddleware,
  isAdminMiddleware,
  deleteProductById
);
productRouter.get(
  "/get-products-by-category",
  authMiddleware,
  getProductsByCategory
);
productRouter.post(
  "/create-product-review/:id",
  authMiddleware,
  createProductReview
);
productRouter.get(
  "/get-product-reviews/:id",
  authMiddleware,
  getProductReviews
);
productRouter.delete(
  "/delete-product-review/:productId/reviews/:reviewId",
  authMiddleware,
  deleteProductReview
);

export default productRouter;
