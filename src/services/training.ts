import { BackendResponse, Training } from "../index.d";

import {
  GetTrainingResponse,
  GetTrainingsResponse,
} from "@/interfaces/BackendResponses";

import { ROUTES } from "./constants";

export async function getTraining(
  trainingId: string
): Promise<GetTrainingResponse> {
  const petition = await fetch(ROUTES.URI + ROUTES.GET_TRAINING(trainingId), {
    method: "GET",
    credentials: "include",
  });
  const res = await petition.json();

  return res;
}

export async function getTrainings(): Promise<GetTrainingsResponse> {
  const petition = await fetch(ROUTES.URI + ROUTES.GET_TRAININGS, {
    method: "GET",
    credentials: "include",
  });
  const res = await petition.json();

  return res;
}

export async function postTraining(
  training: Training
): Promise<BackendResponse> {
  const petition = await fetch(ROUTES.URI + ROUTES.POST_TRAINING, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(training),
  });
  const res = await petition.json();

  return res;
}

export async function putTraining(
  trainingId: string,
  training: Training
): Promise<BackendResponse> {
  const petition = await fetch(ROUTES.URI + ROUTES.PUT_TRAINING(trainingId), {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(training),
  });
  const res = await petition.json();

  return res;
}

export async function deleteTraining(
  trainingId: string
): Promise<BackendResponse> {
  const petition = await fetch(
    ROUTES.URI + ROUTES.DELETE_TRAINING(trainingId),
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  const res = await petition.json();

  return res;
}
