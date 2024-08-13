"use client";

import TrainingForm from "@/components/TrainingForm";

import { useTraining } from "@/hooks/useTraining";

import { useMemo } from "react";

export default function EditTrainingPage({
  params: { trainingId },
}: {
  params: { trainingId: string };
}) {
  const { training, error, loading } = useTraining(trainingId);

  const parsedTraining = useMemo(() => {
    return {
      ...training,
      date: new Date(`${training?.date}`),
      duration: training?.duration ?? 0, // Asignar 0 si `duration` es `undefined`
      exercises: training?.exercises ?? [], // Asignar un array vacío si `exercises` es `undefined`
    };
  }, [training]);

  if (loading) return <h2>Loading...</h2>;

  if (error) {
    return <h2>Couldn&apos;t get training</h2>;
  }

  return (
    <>
      {training && (
        <TrainingForm
          isEditTraining={true}
          trainingId={trainingId}
          training={parsedTraining}
        />
      )}
    </>
  );
}
