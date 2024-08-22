import { ROUTES } from "./constants";

import { BackendResponse, User } from "../index.d";
import { GetUserResponse } from "@/interfaces/BackendResponses";

import { HttpStatusError } from "@/errors/HttpStatusError";
import { validatePetition } from "./httpUtils";
import { ForbiddenError } from "@/errors/ForbiddenError";

export async function login(
  email: string,
  password: string
): Promise<BackendResponse> {
  try {
    const petition = await fetch(ROUTES.URI + ROUTES.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    validatePetition(petition);

    const res: BackendResponse = await petition.json();

    if (res.status === "error") throw new HttpStatusError(res.message);

    return res;
  } catch (error) {
    throw error;
  }
}

export async function logout(): Promise<BackendResponse> {
  try {
    const petition = await fetch(ROUTES.URI + ROUTES.LOGOUT, {
      method: "POST",
      credentials: "include",
    });

    validatePetition(petition);

    const res = await petition.json();

    if (res.status === "error") throw new HttpStatusError(res.message);

    return res;
  } catch (error) {
    throw error;
  }
}

export async function getUser(): Promise<GetUserResponse> {
  try {
    const petition = await fetch(ROUTES.URI + ROUTES.GET_USER, {
      method: "GET",
      credentials: "include",
    });

    validatePetition(petition);

    const res = await petition.json();

    if (res.status === "error") throw new HttpStatusError(res.message);

    return res;
  } catch (error) {
    throw error;
  }
}

export async function postUser(user: User): Promise<BackendResponse> {
  try {
    const petition = await fetch(ROUTES.URI + ROUTES.POST_USER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    validatePetition(petition);

    const res = await petition.json();

    if (res.status === "error") throw new HttpStatusError(res.message);

    return res;
  } catch (error) {
    throw error;
  }
}

//TODO: finish all methods
