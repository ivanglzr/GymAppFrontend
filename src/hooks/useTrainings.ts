"use client";

import { Training } from "../index.d";
import { GetTrainingsResponse } from "@/interfaces/BackendResponses";

import { getTrainings } from "@/services/training";

import { useEffect, useState } from "react";

export function useTrainings() {
  const [trainings, setTrainings] = useState<Array<Training>>([]);
  const [error, setError] = useState<boolean>();
  const loading = !trainings && !error;

  useEffect(() => {
    getTrainings()
      .then((res: GetTrainingsResponse) => {
        const trainingsParsed = res.trainings.map((training) => {
          return {
            ...training,
            date: new Date(training.date),
          };
        });

        setTrainings(trainingsParsed);
      })
      .catch((_) => setError(true));
  }, []);

  return {
    trainings,
    setTrainings,
    error,
    loading,
  };
}
