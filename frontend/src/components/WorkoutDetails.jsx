import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import EditForm from "./EditForm";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const [editMode, setEditMode] = useState(false);

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

  const handleEdit = async () => {
    setEditMode(true);
  };

  const handleSaveEdit = async (editedWorkout) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/workouts/${workout._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedWorkout),
        }
      );

      if (response.ok) {
        const updatedWorkout = await response.json();
        dispatch({ type: "UPDATE_WORKOUT", payload: updatedWorkout });
        setEditMode(false);
      } else {
        console.error("Failed to update workout");
      }
    } catch (error) {
      console.error("Error updating workout", error);
    }
  };

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="workout-details">
      {editMode ? (
        <EditForm
          workout={workout}
          onCancel={() => setEditMode(false)}
          onSave={handleSaveEdit}
        />
      ) : (
        <div>
          <div className="header">
            <h4>{workout.name}</h4>
            <div className="buttons">
              <span className="material-symbols-outlined" onClick={handleEdit}>
                edit
              </span>
              <span
                className="material-symbols-outlined"
                onClick={handleDelete}
              >
                delete
              </span>
            </div>
          </div>
          <p>
            <strong>Load(lb):</strong> {workout.load}
          </p>
          <p>
            <strong>Reps:</strong> {workout.reps}
          </p>
          <p>
            <strong>Sets:</strong> {workout.sets}
          </p>
          <p>
            {capitalizeFirstLetter(
              formatDistanceToNow(new Date(workout.createdAt), {
                addSuffix: true,
              })
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkoutDetails;
