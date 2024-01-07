import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const EditForm = ({ workout, onCancel, onSave }) => {
  const [editedWorkout, setEditedWorkout] = useState({
    name: workout.name,
    load: workout.load,
    reps: workout.reps,
    sets: workout.sets,
  });
  const [error, setError] = useState(null);

  const { user } = useAuthContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedWorkout((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/workouts/${workout._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
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
    <form className="create" onSubmit={handleSave}>
      <label style={{ fontSize: "20px" }}>
        Exercise Name:
        <input
          style={{ fontSize: "15px" }}
          type="text"
          name="name"
          value={editedWorkout.name}
          onChange={handleChange}
        />
      </label>
      <label style={{ fontSize: "20px" }}>
        Load (pounds):
        <input
          style={{ fontSize: "15px" }}
          type="text"
          name="load"
          value={editedWorkout.load}
          onChange={handleChange}
        />
      </label>
      <label style={{ fontSize: "20px" }}>
        Reps:
        <input
          style={{ fontSize: "15px" }}
          type="text"
          name="reps"
          value={editedWorkout.reps}
          onChange={handleChange}
        />
      </label>
      <label style={{ fontSize: "20px" }}>
        Sets:
        <input
          style={{ fontSize: "15px" }}
          type="text"
          name="sets"
          value={editedWorkout.sets}
          onChange={handleChange}
        />
      </label>
      <button style={{ margin: "2px", fontSize: "18px" }} onClick={handleSave}>
        Save
      </button>
      <button style={{ margin: "2px", fontSize: "18px" }} onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditForm;
