import { ROUTES } from "./constants";

import { Training } from "..";

export async function getTraining(trainingId: string) {
  const petition = await fetch(ROUTES.URI + ROUTES.GET_TRAINING(trainingId), {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });
  const res = await petition.json();

  return res;
}

export async function postTraining(training: Training) {
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

export async function putTraining(trainingId: string, training: Training) {
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

export async function deleteTraining(trainingId: string) {
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
