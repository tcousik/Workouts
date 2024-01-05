import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();

  const [name, setName] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { name, load, reps, sets };

    const response = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setError(null);
      setName("");
      setLoad("");
      setReps("");
      setSets("");
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3 style={{ textAlign: "center" }}>Add a Workout</h3>

      <label htmlFor="name">Exercise Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        id="name"
        name="name"
        className={emptyFields.includes("name") ? "error" : ""}
      />
      <label htmlFor="load">Load (lb):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        id="load"
        name="load"
        className={emptyFields.includes("load") ? "error" : ""}
      />
      <label htmlFor="reps">Number of Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        id="reps"
        name="reps"
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <label htmlFor="sets">Number of Sets:</label>
      <input
        type="number"
        onChange={(e) => setSets(e.target.value)}
        value={sets}
        id="sets"
        name="sets"
        className={emptyFields.includes("sets") ? "error" : ""}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
