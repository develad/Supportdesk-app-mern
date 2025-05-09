const asyncHandler = require("express-async-handler");
// Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  //   console.log(req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Find if the user already exists

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Check user and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
  //   res.send("Login Route");
});

// @desc    Get current user
// @route   /api/users/me
// @access  Private
// Get current user

const getMe = asyncHandler(async (req, res) => {
  // res.send("me");
  // const { _id, name, email } = req.user;
  // res.status(200).json({
  //   id: _id,
  //   name,
  //   email,
  // });
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

// Generate token
const generateToken = (id) => {
  // putting an object of id. ex:{"id":"63dad8a3cf28d1e655f44f95"}
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};

// You can only return one response at a time from any Express route handler / controller.

// So we need to return in the if condition so that we exit the function and don't run any further code.
// If we did not return to exit the function then both the if condition would run and send a json response and then we would try to send the text response.
// If you try to do this you will get errors in your terminal.

// return res.status(400).json({ message: "Please include all fields" });
