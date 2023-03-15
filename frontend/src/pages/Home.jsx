import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RingLoader } from "react-spinners";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { addWorkout } from "../store/workout-slice";

const Home = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const { workouts } = useSelector((state) => state.workout);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/workouts");
        const workoutsData = await response.json();
        dispatch(addWorkout(workoutsData));
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch, workouts]);

  return (
    <div className="home">
      <div className="workouts">
        {isLoading && (
          <div className="loader-wrapper">
            <RingLoader color={"#123abc"} />
          </div>
        )}
        {error && <p>Failed to fetch data</p>}
        {workouts.map((workout) => {
          return <WorkoutDetails key={workout._id} details={workout} />;
        })}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
