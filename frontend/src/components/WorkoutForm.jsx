import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [name, setName] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [errorFields, setErrorFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const workout = { name, load, reps, sets };

    const response = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
      setErrorFields(json.errorFields || []);
    } else {
      setError(null);
      setName("");
      setLoad("");
      setReps("");
      setSets("");
      setEmptyFields([]);
      setErrorFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3
        style={{ textAlign: "center", fontSize: "30px", marginBottom: "10px" }}
      >
        Add a Workout
      </h3>

      <label htmlFor="name" style={{ fontSize: "20px" }}>
        Exercise Name:
      </label>
      <input
        style={{ fontSize: "15px" }}
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        id="name"
        name="name"
        className={emptyFields.includes("name") ? "error" : ""}
      />
      <label htmlFor="load" style={{ fontSize: "20px" }}>
        Load (pounds):
      </label>
      <input
        style={{ fontSize: "15px" }}
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        id="load"
        name="load"
        className={
          emptyFields.includes("load") || errorFields.includes("load")
            ? "error"
            : ""
        }
      />
      <label htmlFor="reps" style={{ fontSize: "20px" }}>
        Number of Reps:
      </label>
      <input
        style={{ fontSize: "15px" }}
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        id="reps"
        name="reps"
        className={
          emptyFields.includes("reps") || errorFields.includes("reps")
            ? "error"
            : ""
        }
      />
      <label htmlFor="sets" style={{ fontSize: "20px" }}>
        Number of Sets:
      </label>
      <input
        style={{ fontSize: "15px" }}
        type="number"
        onChange={(e) => setSets(e.target.value)}
        value={sets}
        id="sets"
        name="sets"
        className={
          emptyFields.includes("sets") || errorFields.includes("sets")
            ? "error"
            : ""
        }
      />
      <button style={{ fontSize: "15px" }}>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
