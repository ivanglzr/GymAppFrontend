import { TrainingsContext } from "@/context/trainings";
import { useContext } from "react";

export function useTrainingsContext() {
  const context = useContext(TrainingsContext);

  if (!context) throw new Error("Element isn't in the provider");

  const { trainings, setTrainings, error, loading } = context;

  return {
    trainings,
    setTrainings,
    error,
    loading,
  };
}
