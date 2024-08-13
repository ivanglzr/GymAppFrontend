import { ROUTES } from "./constants";

import { BackendResponse, UserExercise } from "../index.d";
import {
  GetUserExercisesResponse,
  GetExerciseByIdResponse,
} from "@/interfaces/BackendResponses";

export async function getUserExercises(): Promise<GetUserExercisesResponse> {
  const petition = await fetch(ROUTES.URI + ROUTES.GET_USER_EXERCISES, {
    method: "GET",
    credentials: "include",
  });
  const res = await petition.json();

  return res;
}

export async function getExerciseById(
  exerciseId: string
): Promise<GetExerciseByIdResponse> {
  const petition = await fetch(
    ROUTES.URI + ROUTES.GET_EXERCISE_BY_ID(exerciseId),
    {
      method: "GET",
      credentials: "include",
    }
  );
  const res = await petition.json();

  return res;
}

export async function postExercise(
  exercise: UserExercise
): Promise<BackendResponse> {
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

export async function putExercise(
  exerciseId: string,
  exercise: UserExercise
): Promise<BackendResponse> {
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

export async function uploadImage(
  exerciseId: string,
  imageFormData: FormData
): Promise<BackendResponse> {
  const petition = await fetch(ROUTES.URI + ROUTES.UPLOAD_IMAGE(exerciseId), {
    method: "PUT",
    credentials: "include",
    body: imageFormData,
  });
  const res = await petition.json();

  return res;
}

export async function deleteExercise(
  exerciseId: string
): Promise<BackendResponse> {
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
