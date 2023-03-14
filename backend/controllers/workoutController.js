const mongoose = require("mongoose");

const Workout = require("../models/workoutModel");

exports.getAllWorkouts = async (req, res) => {
  try {
    const allWorkouts = await Workout.find({});
    res.status(200).json(allWorkouts);
  } catch (err) {
    res.status(400).json({ error: err.msg });
  }
};

exports.getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such workout!" });
  }
  try {
    const singleWorkout = await Workout.findById(id);
    res.status(200).json(singleWorkout);
  } catch (err) {
    res.status(400).json({ error: err.msg });
  }
};

exports.createWorkout = async (req, res) => {
  const enteredTitle = req.body.title;
  const enteredReps = req.body.reps;
  const enteredLoad = req.body.load;

  try {
    const workout = await Workout.create({
      title: enteredTitle,
      reps: enteredReps,
      load: enteredLoad,
    });
    res.status(200).json({ message: "Workout is created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.msg });
  }
};

exports.updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such workout!" });
  }

  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ message: "Workout is updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.msg });
  }
};

exports.deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such workout!" });
  }

  try {
    const deletedWorkout = await Workout.findByIdAndDelete(id);
    res.status(200).json({ message: "Workout is deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.msg });
  }
};
