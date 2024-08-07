import { ROUTES } from "./constants";

import { CreateExercise } from "../index.d";

export async function getUserExercises() {
  const petition = await fetch(ROUTES.URI + ROUTES.GET_USER_EXERCISES, {
    method: "GET",
    credentials: "include",
  });
  const res = await petition.json();

  return res;
}

export async function postExercise(exercise: CreateExercise) {}
