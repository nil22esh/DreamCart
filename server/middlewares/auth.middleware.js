import jwt from "jsonwebtoken";
import User from "../models/user.schema.js";

export const authMiddleware = async (req, res, next) => {
  const token =
    req.cookies.jwt_token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorised: No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
