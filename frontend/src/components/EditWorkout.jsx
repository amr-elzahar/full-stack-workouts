import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { editWorkout } from "../store/workout-slice";

const EditWorkout = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/workouts/${id}`);
        const { title, load, reps } = await response.json();
        setTitle(title);
        setLoad(load);
        setReps(reps);
      } catch (error) {
        setError("Couldn't retrieve workout details!");
      }
    };
    fetchData();
  }, [id]);

  const updateWorkout = async (id, body) => {
    await fetch(`http://localhost:5000/workouts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const workout = { title, load, reps };
      await updateWorkout(id, workout);
      dispatch(editWorkout({ id, ...workout }));
      setTitle("");
      setLoad("");
      setReps("");
      navigate("/");
    } catch (error) {
      setError("Couldn't update workout!");
    }
  };
  return (
    <div className="edit-workout">
      <form className="create" onSubmit={submitHandler}>
        <h3>Add a New Workout</h3>

        <label>Excersice Title:</label>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <label>Load (in kg):</label>
        <input
          type="number"
          value={load}
          onChange={(event) => setLoad(event.target.value)}
          required
        />

        <label>Number of Reps:</label>
        <input
          type="number"
          value={reps}
          onChange={(event) => setReps(event.target.value)}
          required
        />

        <button type="submit">Update</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default EditWorkout;
