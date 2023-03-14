import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addWorkout } from "../store/workout-slice";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, reps, load }),
      });

      if (!response.ok) {
        const errorMessage = `An error occurred: ${response.status}`;
        setError(errorMessage);
      }

      const addedWorkout = await response.json();
      if (response.ok) {
        setError(null);
        setTitle("");
        setLoad("");
        setReps("");
        console.log("new workout added:", addedWorkout);
        dispatch(addWorkout(addedWorkout));
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form className="create" onSubmit={submitHandler}>
        <h3>Add a New Workout</h3>

        <label>Excersize Title:</label>
        <input
          type="text"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />

        <label>Load (in kg):</label>
        <input
          type="number"
          onChange={(event) => setLoad(event.target.value)}
          value={load}
        />

        <label>Number of Reps:</label>
        <input
          type="number"
          onChange={(event) => setReps(event.target.value)}
          value={reps}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <p className="loading-spinner"></p>
            </>
          ) : (
            "Add Workout"
          )}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default WorkoutForm;