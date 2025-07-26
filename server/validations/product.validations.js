import { body } from "express-validator";

export const validationPostProduct = [
  body("name")
    .isLength({ min: 10 })
    .withMessage("Name must be at least 10 characters long"),
  body("description")
    .isLength({ min: 3 })
    .withMessage("Description must be at least 3 characters long"),
  body("description").notEmpty().withMessage("Description is required"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("price").notEmpty().withMessage("Name is required"),
  body("category")
    .isLength({ min: 3 })
    .withMessage("Product category is required"),
  body("stock").isNumeric().withMessage("Stock must be a number"),
  body("stock").notEmpty().withMessage("Stock is required"),
  ,
];

export const validationPostReview = [
  body("name").notEmpty().withMessage("Name is required"),
  body("rating").isNumeric().withMessage("Rating must be a number"),
  body("comment").notEmpty().withMessage("Comment is required"),
];
