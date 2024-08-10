"use client";

import { useEffect, useRef, useState } from "react";

import { getUserExercises } from "@/services/exercise";

import { UserExercise } from "@/index";

const generateRandomKey = () => crypto.randomUUID();

export default function UserExercisesPage() {
  const [exercises, setExercises] = useState<UserExercise[] | undefined>(
    undefined
  );

  useEffect(() => {
    getUserExercises().then(res => {
      if (res.status === "error") {
        throw new Error("Couldn't get exercises");
      }

      setExercises(res.exercises);
    });
  }, []);

  const exercisesKeys = useRef<Map<number, string>>(new Map());

  const getExerciseKey = (exerciseIndex: number) => {
    if (!exercisesKeys.current.has(exerciseIndex)) {
      exercisesKeys.current.set(exerciseIndex, generateRandomKey());
    }
    return exercisesKeys.current.get(exerciseIndex);
  };

  //TODO: Exercises UI, create Exercises component and Exercise component
  return (
    <>
      {exercises &&
        exercises.map((e, index) => (
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
