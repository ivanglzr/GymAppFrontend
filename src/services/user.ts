import { BackendResponse, User } from "../index.d";

import { GetUserResponse } from "@/interfaces/BackendResponses";

import { ROUTES } from "./constants";

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

    if (!petition.ok) throw new Error(`HTTP Error! Status: ${petition.status}`);

    const res: BackendResponse = await petition.json();

    if (res.status === "error") throw new Error(res.message);

    return res;
  } catch (error) {
    throw new Error(`Failed to login: ${error}`);
  }
}

export async function logout(): Promise<BackendResponse> {
  try {
    const petition = await fetch(ROUTES.URI + ROUTES.LOGOUT, {
      method: "POST",
      credentials: "include",
    });

    if (!petition.ok) throw new Error(`HTTP Error! Status: ${petition.status}`);

    const res = await petition.json();

    if (res.status === "error") throw new Error(res.message);

    return res;
  } catch (error) {
    throw new Error(`Failed to logout: ${error}`);
  }
}

export async function getUser(): Promise<GetUserResponse> {
  try {
    const petition = await fetch(ROUTES.URI + ROUTES.GET_USER, {
      method: "GET",
      credentials: "include",
    });

    if (!petition.ok) throw new Error(`HTTP Error! Status: ${petition.status}`);

    const res = await petition.json();

    if (res.status === "error") throw new Error(res.message);

    return res;
  } catch (error) {
    throw new Error(`Failed to logout: ${error}`);
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

    if (!petition.ok) throw new Error(`HTTP Error! Status: ${petition.status}`);

    const res = await petition.json();

    if (res.status === "error") throw new Error(res.message);

    return res;
  } catch (error) {
    throw new Error(`Failed to logout: ${error}`);
  }
}

//TODO: finish all methods
