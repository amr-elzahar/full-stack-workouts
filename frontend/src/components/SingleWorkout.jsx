import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleWorkout = () => {
  const [workout, setWorkout] = useState({});
  const [error, setError] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/workouts/${id}`);
        const singleWorkout = await response.json();

        if (response.ok) {
          setWorkout(singleWorkout);
        }

        if (!response.ok) {
          const errorMessage = `An error occurred while fetching data.`;
          setError(errorMessage);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [id]);
  return (
    <>
      {error && <p>Sorry, Something went wrong!</p>}

      {workout && (
        <div className="workout">
          <p className="workout-title">
            <strong>Title:</strong> {workout.title}
          </p>
          <p className="workout-load">
            <strong>Load (kg): </strong>
            {workout.load}
          </p>
          <p className="workout-reps">
            <strong>reps (kg): </strong>
            {workout.reps}
          </p>
        </div>
      )}
    </>
  );
};

export default SingleWorkout;
