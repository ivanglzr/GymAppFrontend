import { ROUTES } from "./constants";

import { BackendResponse, Training } from "../index.d";
import {
  GetTrainingResponse,
  GetTrainingsResponse,
} from "@/interfaces/BackendResponses";

import { HttpStatusError } from "@/errors/HttpStatusError";
import { validatePetition } from "./httpUtils";

export async function getTraining(
  trainingId: string
): Promise<GetTrainingResponse> {
  try {
    const petition = await fetch(ROUTES.URI + ROUTES.GET_TRAINING(trainingId), {
      method: "GET",
      credentials: "include",
    });

    validatePetition(petition);

    const res: GetTrainingResponse = await petition.json();

    if (res.status === "error") throw new HttpStatusError(res.message);

    return res;
  } catch (error) {
    throw error;
  }
}

export async function getTrainings(): Promise<GetTrainingsResponse> {
  try {
    const petition = await fetch(ROUTES.URI + ROUTES.GET_TRAININGS, {
      method: "GET",
      credentials: "include",
    });

    validatePetition(petition);

    const res: GetTrainingsResponse = await petition.json();

    if (res.status === "error") throw new HttpStatusError(res.message);

    return res;
  } catch (error) {
    throw error;
  }
}

export async function postTraining(
  training: Training
): Promise<BackendResponse> {
  try {
    const petition = await fetch(ROUTES.URI + ROUTES.POST_TRAINING, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(training),
    });

    validatePetition(petition);

    const res: BackendResponse = await petition.json();

    if (res.status === "error") throw new HttpStatusError(res.message);

    return res;
  } catch (error) {
    throw error;
  }
}

export async function putTraining(
  trainingId: string,
  training: Training
): Promise<BackendResponse> {
  try {
    const petition = await fetch(ROUTES.URI + ROUTES.PUT_TRAINING(trainingId), {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(training),
    });

    validatePetition(petition);

    const res: BackendResponse = await petition.json();

    if (res.status === "error") throw new HttpStatusError(res.message);

    return res;
  } catch (error) {
    throw error;
  }
}

export async function deleteTraining(
  trainingId: string
): Promise<BackendResponse> {
  try {
    const petition = await fetch(
      ROUTES.URI + ROUTES.DELETE_TRAINING(trainingId),
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    validatePetition(petition);

    const res: BackendResponse = await petition.json();

    if (res.status === "error") throw new HttpStatusError(res.message);

    return res;
  } catch (error) {
    throw error;
  }
}
