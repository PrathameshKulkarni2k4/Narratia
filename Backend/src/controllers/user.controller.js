import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const Register = asyncHandler(async (req, res) => {
  const { name, username, email, phone, password } = req.body;

  if (!name || !username || !email || !phone || !password) {
    throw new ApiError(400, "Please fill in all fields");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const user = await User.create({
    name,
    username,
    email,
    phone,
    password: hashedPassword,
  });

  return res.status(201).json(new ApiResponse(201, user, "User registered successfully"));
});

export const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please fill in all fields");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const tokenData = { userId: user._id };
  const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRY });


  return res.status(200)
  .cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  })
  .json(
    new ApiResponse(200, { user }, `Welcome back ${user.name}`)
  );
});

export const Logout = asyncHandler(async (req, res) => {

  return res
  .status(200)
  .cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
  })
  .json(new ApiResponse(200, null, "Logged out successfully"));
});
