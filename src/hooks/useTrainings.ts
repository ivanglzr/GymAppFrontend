"use client";

import { Training } from "../index.d";

import { getTrainings } from "@/services/training";

import { useEffect, useState } from "react";

interface GetTrainingsResponse {
  status: "error" | "success";
  message: string;
  trainings: Array<Training>;
}

export function useTrainings() {
  const [trainings, setTrainings] = useState<Array<Training>>([]);
  const [error, setError] = useState<boolean>();
  const loading = !trainings && !error;

  useEffect(() => {
    getTrainings()
      .then((res: GetTrainingsResponse) => {
        if (res.status === "error") {
          setError(true);
          return;
        }

        const trainingsParsed = res.trainings.map(training => {
          return {
            ...training,
            date: new Date(training.date),
          };
        });

        setTrainings(trainingsParsed);
      })
      .catch(_ => setError(true));
  }, []);

  return {
    trainings,
    setTrainings,
    error,
    loading,
  };
}
