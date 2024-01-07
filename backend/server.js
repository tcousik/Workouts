require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Serve the production build files from the frontend directory
app.use(express.static(path.join(__dirname, "frontend")));

// Routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// Serve the main HTML file for all routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/index.html"));
});

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB and listening on port`, process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
