import { createSlice } from "@reduxjs/toolkit";

const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    workouts: [],
  },
  reducers: {
    addWorkout(state, action) {
      state.workouts = action.payload;
    },
    removeWorkout(state, action) {
      const removedWorkoutId = action.payload._id;
      state.workouts = state.workouts.filter(
        (workout) => workout._id !== removedWorkoutId
      );
    },
    editWorkout(state, action) {
      state.workouts = action.payload;
    },
  },
});

export default workoutSlice;
export const { addWorkout, removeWorkout, editWorkout } = workoutSlice.actions;
