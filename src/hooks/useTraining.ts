"use client";

import { useTrainingsContext } from "./useTrainingsContext";

export function useTraining(trainingId: string) {
  const { trainings, error, loading } = useTrainingsContext();
  const training = trainings?.find((e) => e._id?.toString() === trainingId);

  return {
    training,
    error,
    loading,
  };
}
