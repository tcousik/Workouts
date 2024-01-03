import React from "react";

const WorkoutDetails = ({ workout }) => {
  return (
    <div className="workout-details">
      <h4>
        <strong>{workout.title}</strong>
      </h4>
      <p>Load(lb): {workout.load}</p>
      <p>Reps: {workout.reps}</p>
      <p>{workout.createdAt}</p>
    </div>
  );
};

export default WorkoutDetails;
