// console.log("Server...");

const path = require("path");
const express = require("express");
const colors = require("colors");

require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  // Loading the index.html that is in the static build folder
  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "frontend", "build", "index.html"),
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Support Desk API" });
  });
}

// The error middleware is the last middleware that run in the app if we dont use the defualt build in error handler in express
app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server listen on port ${PORT}`);
  });
});
