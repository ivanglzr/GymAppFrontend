import { ROUTES } from "./constants";

import { UserExercise } from "../index.d";

export async function getUserExercises() {
  const petition = await fetch(ROUTES.URI + ROUTES.GET_USER_EXERCISES, {
    method: "GET",
    credentials: "include",
  });
  const res = await petition.json();

  return res;
}

export async function postExercise(exercise: UserExercise) {
  const petition = await fetch(ROUTES.URI + ROUTES.POST_EXERCISE, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exercise),
  });
  const res = await petition.json();

  return res;
}

export async function putExercise(exerciseId: string, exercise: UserExercise) {
  const petition = await fetch(ROUTES.URI + ROUTES.PUT_EXERCISE(exerciseId), {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exercise),
  });
  const res = await petition.json();

  return res;
}

export async function deleteExercise(exerciseId: string) {
  const petition = await fetch(
    ROUTES.URI + ROUTES.DELETE_EXERCISE(exerciseId),
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  const res = await petition.json();

  return res;
}

//TODO: Finish all methods
