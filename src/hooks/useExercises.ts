"use client";

import { UserExercise } from "../index.d";
import { GetUserExercisesResponse } from "@/interfaces/BackendResponses";

import { useEffect, useState } from "react";

import { getUserExercises } from "@/services/exercise";

export function useExercises() {
  const [exercises, setExercises] = useState<Array<UserExercise>>();
  const [error, setError] = useState<boolean>(false);
  const loading = !exercises && !error;

  useEffect(() => {
    getUserExercises()
      .then((res: GetUserExercisesResponse) => {
        setExercises(res.exercises);
      })
      .catch((_) => setError(true));
  }, []);

  return { exercises, setExercises, error, loading };
}
