import React from "react";

const WorkoutDetails = ({ details }) => {
  return (
    <div className="workout-details">
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
