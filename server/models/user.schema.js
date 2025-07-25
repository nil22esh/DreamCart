import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "First name must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      minlength: [6, "First name must be at least 3 characters long"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("User", userSchema);
export default User;
