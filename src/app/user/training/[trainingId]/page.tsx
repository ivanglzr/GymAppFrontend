"use client";

import { useTraining } from "@/hooks/useTraining";

export default function TrainingPage({
  params: { trainingId },
}: {
  params: { trainingId: string };
}) {
  const { training, error, loading } = useTraining(trainingId);

  const numberOfSets = training?.exercises.reduce((numberOfSets, exercise) => {
    return numberOfSets + exercise.sets.length;
  }, 0);

  if (error) return <h2>Error ocurred while getting the training</h2>;
  if (loading) return <h2>Cargando...</h2>;

  return (
    <>
      <h1>Training</h1>
      <span>Duration {training?.duration}</span>
      <span>Sets {numberOfSets}</span>
    </>
  );
}
