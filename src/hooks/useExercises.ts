"use client";

import { BackendReponse, UserExercise } from "../index.d";

import { useEffect, useState } from "react";

import { getUserExercises } from "@/services/exercise";

interface GetUserExercisesReponse extends BackendReponse {
  exercises: Array<UserExercise>;
}

export function useExercises() {
  const [exercises, setExercises] = useState<Array<UserExercise>>();
  const [error, setError] = useState<boolean>(false);
  const loading = !exercises && !error;

  useEffect(() => {
    getUserExercises()
      .then((res: GetUserExercisesReponse) => {
        if (res.status === "error") {
          setError(true);
        }

        setExercises(res.exercises);
      })
      .catch(_ => setError(true));
  }, []);

  return { exercises, setExercises, error, loading };
}
