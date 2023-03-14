const express = require("express");

const workoutController = require("../controllers/workoutController");

const router = express.Router();

// GET all workouts
router.get("/", workoutController.getAllWorkouts);

// GET a single workout
router.get("/:id", workoutController.getSingleWorkout);

// CREATE new workouts
router.post("/", workoutController.createWorkout);

// UPDATE a workouts
router.patch("/:id", workoutController.updateWorkout);

// DELETE a workouts
router.delete("/:id", workoutController.deleteWorkout);

// Exportation
module.exports = router;
