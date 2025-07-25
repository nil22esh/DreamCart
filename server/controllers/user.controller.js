import { validationResult } from "express-validator";
import User from "../models/user.schema.js";
import { mongoose } from "mongoose";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password, phone, address, isAdmin } = req.body;
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: "Please provide all fields" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      name,
      email,
      password,
      isAdmin,
      address,
      phone,
    });
    const token = user.generateAuthToken();
    res.cookie("jwt_token", token, {
      httpOnly: true,
      secure: process.env.ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res
      .status(201)
      .json({ message: "User registered successfully", user, token });
  } catch (error) {
    console.log(`Error while registering user: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isPasswordValid = await existingUser.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid eamil and password" });
    }
    const token = await existingUser.generateAuthToken();
    res.cookie("jwt_token", token, {
      httpOnly: true,
      secure: process.env.ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "User logged in successfully",
      user: existingUser,
      token,
    });
  } catch (error) {
    console.log(`Error while logging in user: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res.status(400).json({ message: "User not found" });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.log(`Error while getting user: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    if (!req.cookies.jwt_token) {
      return res.status(400).json({ message: "User not logged in" });
    }
    res.clearCookie("jwt_token");
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(`Error while logging out user: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res
      .status(200)
      .json({ message: "Users found", count: users.length, users });
  } catch (error) {
    console.log(`Error while getting all users: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!updateUser) {
      return res.status(400).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.log(`Error while updating user: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.types.ObjectId.isValid(userId)) {
    return res.status(401).json({ message: "user id not found" });
  }
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(400).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.log(`Error while deleting user: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { oldPassword, newPassword } = req.body;
  const userId = req.user?._id;
  console.log(req.user);
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: User not found" });
  }
  try {
    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordMatch = await user.comparePassword(oldPassword);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }
    user.password = newPassword;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log(`Error while resetting password: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
