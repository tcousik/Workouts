import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();

  const [name, setName] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { name, load, reps, sets };

    const response = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      setName("");
      setLoad("");
      setReps("");
      setSets("");
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a workout</h3>

      <label htmlFor="name">Exercise Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        id="name"
        name="name"
      />
      <label htmlFor="load">Load (pounds):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        id="load"
        name="load"
      />
      <label htmlFor="reps"># Of Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        id="reps"
        name="reps"
      />
      <label htmlFor="sets"># Of Sets:</label>
      <input
        type="number"
        onChange={(e) => setSets(e.target.value)}
        value={sets}
        id="sets"
        name="sets"
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
