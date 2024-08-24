"use client";

import { UserExercise } from "../index.d";
import { GetUserExercisesResponse } from "@/interfaces/BackendResponses";

import { useEffect, useRef, useState } from "react";

import { deleteExercise, getUserExercises } from "@/services/exercise";

import debounce from "just-debounce-it";

const filters = (exercise: UserExercise, search: string) =>
  exercise.name.toString().toLowerCase().includes(search.toLowerCase()) ||
  exercise.description
    ?.toString()
    .toLowerCase()
    .includes(search.toLowerCase()) ||
  exercise.muscle.toString().toLowerCase().includes(search.toLowerCase()) ||
  exercise.equipment.toString().toLowerCase().includes(search.toLowerCase());

export function useExercises() {
  const originalExercises = useRef<Array<UserExercise>>();
  const [exercises, setExercises] = useState<Array<UserExercise>>();
  const [error, setError] = useState<boolean>(false);
  const loading = !exercises && !error;

  useEffect(() => {
    getUserExercises()
      .then((res: GetUserExercisesResponse) => {
        originalExercises.current = res.exercises;
        setExercises(originalExercises.current);
      })
      .catch((_) => setError(true));
  }, []);

  const searchExercises = debounce(async (search: string) => {
    if (!search || search.length === 0) {
      setExercises(originalExercises.current);
      return;
    }

    const newExercises = originalExercises.current?.filter((exercise) =>
      filters(exercise, search)
    );

    setExercises(newExercises);
  }, 300);

  const handleDelete = async (id: string) => {
    if (!exercises) return;

    try {
      const { message } = await deleteExercise(id);

      setExercises((prevState) => {
        if (!prevState) return [];

        const newExercises = prevState.filter(
          (exercise) => exercise._id?.toString() !== id
        );

        return newExercises;
      });

      alert(message);
    } catch (error) {
      alert(error);
    }
  };

  return {
    exercises,
    setExercises,
    searchExercises,
    handleDelete,
    error,
    loading,
  };
}
