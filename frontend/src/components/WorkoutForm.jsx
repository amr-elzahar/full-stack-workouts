import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { addWorkout } from "../store/workout-slice";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      dispatch(addWorkout({ _id: uuidv4(), title, reps, load }));
      const response = await fetch("http://localhost:5000/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, reps, load }),
      });

      if (!response.ok) {
        const errorMessage = `An error occured: ${response.status}`;
        setError(errorMessage);
      }
      if (response.ok) {
        setError(null);
        setTitle("");
        setLoad("");
        setReps("");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <form className="create" onSubmit={submitHandler}>
      <h3>Add a New Workout</h3>

      <label>Excersice Title:</label>
      <input
        type="text"
        onChange={(event) => setTitle(event.target.value)}
        value={title}
        required
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(event) => setLoad(event.target.value)}
        value={load}
        required
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        onChange={(event) => setReps(event.target.value)}
        value={reps}
        required
      />

      <button type="submit">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
