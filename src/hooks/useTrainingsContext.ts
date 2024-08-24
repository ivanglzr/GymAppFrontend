import { TrainingsContext } from "@/context/trainings";
import { useContext } from "react";

export function useTrainingsContext() {
  const context = useContext(TrainingsContext);

  if (!context) throw new Error("Element isn't in provider");

  return context;
}
