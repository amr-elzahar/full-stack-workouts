import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWorkouts = createAsyncThunk(
  "workout/fetchWorkouts",
  async () => {
    const response = await fetch("http://localhost:5000/workouts");
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Error fetching workouts: ${response.status}`);
    }
    return data;
  }
);

const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    workouts: [],
  },
  reducers: {
    addWorkout(state, action) {
      const addedWorkout = action.payload;
      state.workouts.push(addedWorkout);
    },
    removeWorkout(state, action) {
      const removedWorkoutId = action.payload;
      state.workouts = state.workouts.filter(
        (workout) => workout._id !== removedWorkoutId
      );
    },
  },
});

export default workoutSlice;
export const { addWorkout, removeWorkout } = workoutSlice.actions;
