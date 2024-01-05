import React from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();

  const handleDelete = async () => {
    const response = await fetch(
      "http://localhost:4000/api/workouts/" + workout._id,
      { method: "DELETE" }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const handleEdit = async () => {};

  return (
    <div className="workout-details">
      <div className="header">
        <h4>
          <strong>{workout.name}</strong>
        </h4>
        <div className="buttons">
          <span className="material-symbols-outlined" onClick={handleEdit}>
            edit
          </span>
          <span className="material-symbols-outlined" onClick={handleDelete}>
            delete
          </span>
        </div>
      </div>
      <p>Load(lb): {workout.load}</p>
      <p>Reps: {workout.reps}</p>
      <p>Sets: {workout.sets}</p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
    </div>
  );
};

export default WorkoutDetails;
