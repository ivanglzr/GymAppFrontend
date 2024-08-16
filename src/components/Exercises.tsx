"use client";

import "@/css/Exercises.css";

import { UserExercise } from "../index.d";
import Exercise from "./Exercise";
import { useExercises } from "@/hooks/useExercises";
import { useCallback } from "react";

export default function Exercises() {
  const { exercises, error, loading } = useExercises();

  const exercisesHTML = useCallback(
    () =>
      exercises?.map((exercise: UserExercise) => (
        <Exercise key={exercise._id} exercise={exercise} />
      )),
    [exercises]
  );

  if (error) {
    return (
      <main className="exercises-container">
        <h2>An error occurred</h2>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="exercises-container">
        <h2>Loading...</h2>
      </main>
    );
  }

  return (
    <main className="exercises-container">
      <h1>Exercises</h1>
      {exercises?.length === 0 ? (
        <h2>User doesn&apos;t have any exercises</h2>
      ) : (
        exercisesHTML()
      )}
    </main>
  );
}
