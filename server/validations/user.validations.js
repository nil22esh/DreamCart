import { body } from "express-validator";

export const validateRegistration = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6+ chars"),
  body("phone").notEmpty().withMessage("Phone is required"),
];

export const validateLogin = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6+ chars"),
];

export const validateUpdatePassword = [
  body("oldPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be 6+ chars"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be 6+ chars"),
];
