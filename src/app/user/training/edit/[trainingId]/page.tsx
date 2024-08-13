"use client";

import TrainingForm from "@/components/TrainingForm";

import { useTraining } from "@/hooks/useTraining";

export default function EditTrainingPage({
  params: { trainingId },
}: {
  params: { trainingId: string };
}) {
  const { training, error, loading } = useTraining(trainingId);

  if (loading) return <h2>Loading...</h2>;

  if (error) {
    return <h2>Couldn&apos;t get training</h2>;
  }

  if (!training) {
    return <h2>Loading...</h2>;
  }

  const parsedTraining = {
    ...training,
    date: new Date(training.date),
  };

  return (
    <TrainingForm
      isEditTraining={true}
      trainingId={trainingId}
      training={parsedTraining}
    />
  );
}
