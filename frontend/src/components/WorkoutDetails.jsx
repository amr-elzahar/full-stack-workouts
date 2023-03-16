import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";

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
        <FaTrash color="#ff0000" size={20} />
      </button>
      <Link to={`/edit-workout/${details._id}`} className="btn-edit">
        <TbEdit color="#00b7ff" size={20} />
      </Link>

      <Link to={`/workout/${details._id}`}>
        <h4>{details.title}</h4>
      </Link>
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
