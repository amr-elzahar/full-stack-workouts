import React from "react";
import { useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";

import { removeWorkout } from "../store/workout-slice";

const WorkoutDetails = ({ details }) => {
  const dispatch = useDispatch();
  const removeHandler = async () => {
    dispatch(removeWorkout({ _id: details._id }));

    try {
      await fetch(`http://localhost:5000/workouts/${details._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: details._id }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="workout-details">
      <button className="btn-remove" onClick={removeHandler}>
        <FaTrash color="red" size={20} />
      </button>
      <h4>{details.title}</h4>
      <p>
        <strong>Load (kg): </strong> {details.load}
      </p>
      <p>
        <strong>reps (kg): </strong> {details.reps}
      </p>
    </div>
  );
};

export default WorkoutDetails;
