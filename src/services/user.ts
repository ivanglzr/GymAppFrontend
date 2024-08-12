import { User } from "../index.d";

import { ROUTES } from "./constants";

export async function login(email: string, password: string) {
  const petition = await fetch(ROUTES.URI + ROUTES.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  const res = await petition.json();

  return res;
}

export async function logout() {
  const petition = await fetch(ROUTES.URI + ROUTES.LOGOUT, {
    method: "POST",
    credentials: "include",
  });
  const res = await petition.json();

  return res;
}

export async function getUser() {
  const petition = await fetch(ROUTES.URI + ROUTES.GET_USER, {
    method: "GET",
    credentials: "include",
  });
  const res = await petition.json();

  return res;
}

export async function postUser(user: User) {
  const petition = await fetch(ROUTES.URI + ROUTES.POST_USER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const res = await petition.json();

  return res;
}
