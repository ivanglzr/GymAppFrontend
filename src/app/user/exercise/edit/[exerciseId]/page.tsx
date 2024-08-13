"use client";

import ExerciseForm from "@/components/ExerciseForm";
import { useExercise } from "@/hooks/useExercise";

export default function EditExercisePage({
  params,
}: {
  params: { exerciseId: string };
}) {
  const { exercise, error, loading } = useExercise(params.exerciseId);

  if (error) return <h2>Error while getting the exercise</h2>;
  if (loading) return <h2>Loading...</h2>;

  return (
    <ExerciseForm
      exercise={exercise}
      exerciseId={exercise?._id}
      isEditExercise={true}
    />
  );
}
