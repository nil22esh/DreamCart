import { body } from "express-validator";

export const validationsCreateOrder = [
  body("orderItems").isArray().withMessage("Order items must be an array"),
  body("orderItems.*.product")
    .isString()
    .withMessage("Product must be a string"),
  body("orderItems.*.quantity")
    .isNumeric()
    .withMessage("Quantity must be a number"),
  body("shippingAddress.fullName")
    .isString()
    .withMessage("Full name must be a string"),
  body("shippingAddress.address")
    .isString()
    .withMessage("Address must be a string"),
  body("shippingAddress.city").isString().withMessage("City must be a string"),
  body("shippingAddress.postalCode")
    .isString()
    .withMessage("Postal code must be a string"),
  body("shippingAddress.country")
    .isString()
    .withMessage("Country must be a string"),
  body("paymentMethod")
    .isString()
    .withMessage("Payment method must be a string"),
  body("totalPrice").isNumeric().withMessage("Total price must be a number"),
];
