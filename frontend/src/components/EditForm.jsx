import { useState } from "react";

const EditForm = ({ workout, onCancel, onSave }) => {
  const [editedWorkout, setEditedWorkout] = useState({
    name: workout.name,
    load: workout.load,
    reps: workout.reps,
    sets: workout.sets,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedWorkout((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
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
        onSave(updatedWorkout);
      } else {
        console.error("Failed to update workout");
      }
    } catch (error) {
      console.error("Error updating workout", error);
    }
  };

  return (
    <div className="edit-workout-form">
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={editedWorkout.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Load:
        <input
          type="text"
          name="load"
          value={editedWorkout.load}
          onChange={handleChange}
        />
      </label>
      <label>
        Reps:
        <input
          type="text"
          name="reps"
          value={editedWorkout.reps}
          onChange={handleChange}
        />
      </label>
      <label>
        Sets:
        <input
          type="text"
          name="sets"
          value={editedWorkout.sets}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditForm;