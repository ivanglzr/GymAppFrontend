import { ROUTES } from "./constants";

import { BackendResponse, UserExercise } from "../index.d";
import {
  GetUserExercisesResponse,
  GetExerciseByIdResponse,
  PostExerciseResponse,
} from "@/interfaces/BackendResponses";

import { HttpError } from "@/errors/HttpError";
import { HttpStatusError } from "@/errors/HttpStatusError";

export async function getUserExercises(): Promise<GetUserExercisesResponse> {
  try {
    const petition = await fetch(ROUTES.URI + ROUTES.GET_USER_EXERCISES, {
      method: "GET",
      credentials: "include",
    });

    if (!petition.ok) throw new HttpError(`status: ${petition.status}`);

    const res: GetUserExercisesResponse = await petition.json();

    if (res.status === "error") throw new HttpStatusError(res.message);

    return res;
  } catch (error) {
    throw error;
  }
}

export async function getExerciseById(
  exerciseId: string
): Promise<GetExerciseByIdResponse> {
  try {
    const petition = await fetch(
      ROUTES.URI + ROUTES.GET_EXERCISE_BY_ID(exerciseId),
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!petition.ok) throw new HttpError(`status: ${petition.status}`);

    const res: GetExerciseByIdResponse = await petition.json();

    if (res.status === "error") throw new HttpStatusError(res.message);

    return res;
  } catch (error) {
    throw error;
  }
}

export async function postExercise(
  exercise: UserExercise
): Promise<PostExerciseResponse> {
  try {
    const petition = await fetch(ROUTES.URI + ROUTES.POST_EXERCISE, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exercise),
    });

    if (!petition.ok) throw new HttpError(`status: ${petition.status}`);

    const res: PostExerciseResponse = await petition.json();

    if (res.status === "error") throw new HttpStatusError(res.message);

    return res;
  } catch (error) {
    throw error;
  }
}

export async function putExercise(
  exerciseId: string,
  exercise: UserExercise
): Promise<BackendResponse> {
  try {
    const petition = await fetch(ROUTES.URI + ROUTES.PUT_EXERCISE(exerciseId), {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exercise),
    });

    if (!petition.ok) throw new HttpError(`status: ${petition.status}`);

    const res: BackendResponse = await petition.json();

    if (res.status === "error") throw new HttpStatusError(res.message);

    return res;
  } catch (error) {
    throw error;
  }
}

export async function uploadImage(
  exerciseId: string,
  imageFormData: FormData
): Promise<BackendResponse> {
  try {
    const petition = await fetch(ROUTES.URI + ROUTES.UPLOAD_IMAGE(exerciseId), {
      method: "PUT",
      credentials: "include",
      body: imageFormData,
    });

    if (!petition.ok) throw new HttpError(`status: ${petition.status}`);

    const res: BackendResponse = await petition.json();

    if (res.status === "error") throw new HttpStatusError(res.message);

    return res;
  } catch (error) {
    throw error;
  }
}

export async function deleteExercise(
  exerciseId: string
): Promise<BackendResponse> {
  try {
    const petition = await fetch(
      ROUTES.URI + ROUTES.DELETE_EXERCISE(exerciseId),
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!petition.ok) throw new HttpError(`status: ${petition.status}`);

    const res: BackendResponse = await petition.json();

    if (res.status === "error") throw new HttpStatusError(res.message);

    return res;
  } catch (error) {
    throw error;
  }
}
