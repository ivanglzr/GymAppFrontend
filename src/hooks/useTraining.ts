"use client";

import { Training, BackendReponse } from "../index.d";

import { getTraining } from "@/services/training";

import { useEffect, useState } from "react";

interface GetTrainingReponse extends BackendReponse {
  training: Training;
}

export function useTraining(trainingId: string) {
  const [training, setTraining] = useState<Training>();
  const [error, setError] = useState<boolean>(false);
  const loading = !training && !error;

  useEffect(() => {
    getTraining(trainingId)
      .then((res: GetTrainingReponse) => {
        if (res.status === "error") {
          setError(true);
          return;
        }

        setTraining(res.training);
      })
      .catch(_ => setError(true));
  }, [trainingId]);

  return {
    training,
    setTraining,
    error,
    loading,
  };
}
