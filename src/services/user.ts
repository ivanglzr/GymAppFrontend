import { User } from "../index";

const ROUTES = {
  URI: "http://localhost:3900",
  LOGIN: "/login/",
  GET_USER_BY_TOKEN: "/user/",
  GET_USER_BY_ID: (id: string) => {
    return `/user/${id}/`;
  },
  POST_USER: "/user/",
};

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

export async function getUserByToken() {
  const petition = await fetch(ROUTES.URI + ROUTES.GET_USER_BY_TOKEN, {
    method: "GET",
    cache: "no-store",
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
    body: JSON.stringify({ user: user }),
  });

  const res = await petition.json();

  return res;
}
