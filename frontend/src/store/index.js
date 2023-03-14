import { configureStore } from "@reduxjs/toolkit";
import workoutSlice from "./workout-slice";

const store = configureStore({
  reducer: {
    workout: workoutSlice.reducer,
  },
});

export default store;
