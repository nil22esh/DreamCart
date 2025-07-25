import express from "express";
import {
  getAllUsers,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser,
} from "../controllers/user.controller.js";
import {
  validateLogin,
  validateRegistration,
  validateUpdatePassword,
} from "../validations/user.validations.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { isAdminMiddleware } from "../middlewares/isAdmin.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", validateRegistration, registerUser);
userRouter.post("/login", validateLogin, loginUser);
userRouter.get("/me", authMiddleware, getUser);
userRouter.get("/logout", logoutUser);
userRouter.get("/all-users", authMiddleware, isAdminMiddleware, getAllUsers);
userRouter.put("/update-profile", authMiddleware, updateUser);
userRouter.put(
  "/reset-password",
  authMiddleware,
  validateUpdatePassword,
  resetPassword
);

export default userRouter;
