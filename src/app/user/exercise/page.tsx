"use client";

import { useRef } from "react";

import { useExercises } from "@/hooks/useExercises";

const generateRandomKey = () => crypto.randomUUID();

export default function UserExercisesPage() {
  const { exercises, error, loading } = useExercises();

  const exercisesKeys = useRef<Array<string>>([]);

  const getExerciseKey = (exerciseIndex: number) => {
    if (!exercisesKeys.current[exerciseIndex]) {
      exercisesKeys.current[exerciseIndex] = generateRandomKey();
    }
    return exercisesKeys.current[exerciseIndex];
  };

  if (error) {
    return <h2>An error occurred</h2>;
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  //TODO: Exercises UI, create Exercises component and Exercise component
  return (
    <>
      {exercises?.map((e, index) => (
        <div key={getExerciseKey(index)}>
          <h2>{e.name}</h2>
          <p>{e.description}</p>
          <span>{e.muscle}</span> <br />
          <span>{e.equipment}</span>
        </div>
      ))}
    </>
  );
}
