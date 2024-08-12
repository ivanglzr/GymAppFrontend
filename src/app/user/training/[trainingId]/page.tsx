"use client";

import { Exercise, Training as TrainingInterface } from "@/index";

import { getTraining } from "@/services/training";

import { useEffect, useRef, useState } from "react";

export default function TrainingPage({
  params: { trainingId },
}: {
  params: { trainingId: string };
}) {
  const [training, setTraining] = useState<TrainingInterface>();
  const [error, setError] = useState<boolean>(false);
  const numberOfSets = useRef<number>(0);

  useEffect(() => {
    getTraining(trainingId)
      .then(res => {
        if (res.status === "error") {
          setError(true);
          alert(res.message);
          return;
        }

        numberOfSets.current = res.training.exercises.reduce(
          (totalSets: number, exercise: Exercise) => {
            return totalSets + exercise.sets.length;
          },
          0
        );

        setTraining(res.training);
      })
      .catch(_ => setError(true));
  });

  return (
    <>
      {!error && training && (
        <>
          <h1>Training</h1>
          <span>Duration {training.duration}</span>
          <span>Sets {numberOfSets.current}</span>
        </>
      )}
    </>
  );
}
