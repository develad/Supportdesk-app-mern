const asyncHandler = require("express-async-handler");
// Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.

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
  res.send("Register Route");
});

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  res.send("Login Route");
});

module.exports = {
  registerUser,
  loginUser,
};

// You can only return one response at a time from any Express route handler / controller.

// So we need to return in the if condition so that we exit the function and don't run any further code.
// If we did not return to exit the function then both the if condition would run and send a json response and then we would try to send the text response.
// If you try to do this you will get errors in your terminal.

// return res.status(400).json({ message: "Please include all fields" });
