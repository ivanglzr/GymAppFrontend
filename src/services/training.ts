import { BackendResponse, Training } from "../index.d";

import {
  GetTrainingResponse,
  GetTrainingsResponse,
} from "@/interfaces/BackendResponses";

import { ROUTES } from "./constants";

export async function getTraining(
  trainingId: string
): Promise<GetTrainingResponse> {
  try {
    const petition = await fetch(ROUTES.URI + ROUTES.GET_TRAINING(trainingId), {
      method: "GET",
      credentials: "include",
    });

    if (!petition.ok) throw new Error(`HTTP Error! Status: ${petition.status}`);

    const res: GetTrainingResponse = await petition.json();

    if (res.status === "error") throw new Error(res.message);

    return res;
  } catch (error) {
    throw new Error(`Failed to get training: ${error}`);
  }
}

export async function getTrainings(): Promise<GetTrainingsResponse> {
  try {
    const petition = await fetch(ROUTES.URI + ROUTES.GET_TRAININGS, {
      method: "GET",
      credentials: "include",
    });

    if (!petition.ok) throw new Error(`HTTP Error! Status: ${petition.status}`);

    const res: GetTrainingsResponse = await petition.json();

    if (res.status === "error") throw new Error(res.message);

    return res;
  } catch (error) {
    throw new Error(`Failed to get trainings: ${error}`);
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

    if (!petition.ok) throw new Error(`HTTP Error! Status: ${petition.status}`);

    const res: BackendResponse = await petition.json();

    if (res.status === "error") throw new Error(res.message);

    return res;
  } catch (error) {
    throw new Error(`Failed to post training: ${error}`);
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

    if (!petition.ok) throw new Error(`HTTP Error! Status: ${petition.status}`);

    const res: BackendResponse = await petition.json();

    if (res.status === "error") throw new Error(res.message);

    return res;
  } catch (error) {
    throw new Error(`Failed to post training: ${error}`);
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

    if (!petition.ok) throw new Error(`HTTP Error! Status: ${petition.status}`);

    const res: BackendResponse = await petition.json();

    if (res.status === "error") throw new Error(res.message);

    return res;
  } catch (error) {
    throw new Error(`Failed to delete training: ${error}`);
  }
}
