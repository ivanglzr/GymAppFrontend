"use client";

import { useTrainingsContext } from "./useTrainingsContext";

export function useTrainings() {
  const { trainings, setTrainings, error, loading } = useTrainingsContext();

  return {
    trainings,
    setTrainings,
    error,
    loading,
  };
}
