const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// Get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id;

  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

// Get one workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(400).json({ error: "Workout not found" });
  }

  res.status(200).json(workout);
};

// Create a workout
const createWorkout = async (req, res) => {
  const { name, load, reps, sets } = req.body;

  let emptyFields = [];
  let errorFields = [];

  // Empty entries
  if (!name) {
    emptyFields.push("name");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!sets) {
    emptyFields.push("sets");
  }

  // Invalid numbers
  if (load < 0) {
    errorFields.push("load");
  }
  if (reps < 1) {
    errorFields.push("reps");
  }
  if (sets < 1) {
    errorFields.push("sets");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the required fields", emptyFields });
  }

  if (errorFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please enter a valid number", errorFields });
  }

  // Add to DB
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ name, load, reps, sets, user_id });
    console.log("Response sent:", workout);
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(400).json({ error: "Workout not found" });
  }

  res.status(200).json(workout);
};

// Update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );

  if (!workout) {
    return res.status(400).json({ error: "Workout not found" });
  }

  res.status(200).json(workout);
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
