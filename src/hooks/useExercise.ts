"use client";

import { useEffect, useState } from "react";
import { UserExercise } from "..";
import { getExerciseById } from "@/services/exercise";

export function useExercise(exerciseId: string) {
  const [exercise, setExercise] = useState<UserExercise>();
  const [error, setError] = useState<boolean>(false);
  const loading = !exercise && !error;

  useEffect(() => {
    getExerciseById(exerciseId)
      .then((res) => {
        setExercise(res.exercise);
      })
      .catch((_) => setError(true));
  }, [exerciseId]);

  return {
    exercise,
    setExercise,
    error,
    loading,
  };
}
