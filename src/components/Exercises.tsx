"use client";

import "@/css/Exercises.css";

import { UserExercise } from "../index.d";
import Exercise from "./Exercise";
import { useExercises } from "@/hooks/useExercises";
import { useCallback } from "react";

export default function Exercises() {
  const {
    exercises,
    setExercises,
    searchExercises,
    handleDelete,
    error,
    loading,
  } = useExercises();

  const exercisesHTML = useCallback(
    () =>
      exercises?.map((exercise: UserExercise) => {
        return (
          <Exercise
            key={exercise._id}
            exercise={exercise}
            handleDelete={handleDelete}
          />
        );
      }),
    [exercises, setExercises, handleDelete]
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
      <header className="exercises-container-header">
        <h1 className="header-title">Exercises</h1>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search Exercise..."
          className="search-input"
          onChange={(event) => searchExercises(event.currentTarget.value)}
        />
      </header>
      {exercises?.length === 0 ? (
        <h2>User doesn&apos;t have any exercises</h2>
      ) : (
        exercisesHTML()
      )}
    </main>
  );
}
