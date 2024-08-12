"use client";

import { Training } from "@/index";

import TrainingForm from "@/components/TrainingForm";

import { useState, useEffect } from "react";

import { getTraining } from "@/services/training";

export default function EditTrainingPage({
  params: { trainingId },
}: {
  params: { trainingId: string };
}) {
  const [training, setTraining] = useState<Training | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getTraining(trainingId)
      .then(res => {
        if (!res.training) {
          setError(true);
          alert(res.message);
          return;
        }

        const parsedTraining = {
          ...res.training,
          date: new Date(res.training.date),
        };

        if (res.status === "error") {
          setError(true);
          alert(res.message);
          return;
        }

        setTraining(parsedTraining);
      })
      .catch(_ => {
        setError(true);
      });
  }, [trainingId]);

  return (
    <>
      {!error && training && (
        <TrainingForm
          isEditTraining={true}
          trainingId={trainingId}
          training={training}
        />
      )}
      {error && <h2>Couldn&apos;t get training</h2>}
    </>
  );
}
