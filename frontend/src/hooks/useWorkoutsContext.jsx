import {
  WorkoutContext,
  WorkoutContextProvider,
} from "../context/WorkoutContext";

import { useContext } from "react";

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw Error(
      "useWorkoutContext can't be used outside WorkoutContextProvider"
    );
  }

  return context;
};
