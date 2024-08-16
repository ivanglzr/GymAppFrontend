"use client";

import { Training } from "../index.d";

import { GetTrainingResponse } from "@/interfaces/BackendResponses";

import { getTraining } from "@/services/training";

import { useEffect, useState } from "react";

export function useTraining(trainingId: string) {
  const [training, setTraining] = useState<Training>();
  const [error, setError] = useState<boolean>(false);
  const loading = !training && !error;

  useEffect(() => {
    getTraining(trainingId)
      .then((res: GetTrainingResponse) => {
        setTraining(res.training);
      })
      .catch((_) => setError(true));
  }, [trainingId]);

  return {
    training,
    setTraining,
    error,
    loading,
  };
}
