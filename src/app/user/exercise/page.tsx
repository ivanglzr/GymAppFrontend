"use client";

import { useEffect, useState } from "react";

import { getUserExercises } from "@/services/exercise";

import { UserExercise } from "@/index";

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

  //TODO: Exercises UI, create Exercises component and Exercise component
  return (
    <>
      {exercises &&
        exercises.map(e => (
          <div key={`${e.userId}-${crypto.randomUUID()}`}>
            <h2>{e.name}</h2>
            <p>{e.description}</p>
            <span>{e.muscles}</span> <br />
            <span>{e.equipment}</span>
          </div>
        ))}
    </>
  );
}
