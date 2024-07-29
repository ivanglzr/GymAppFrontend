import { User } from "../index";

const ROUTES = {
  URI: "http://localhost:3900",
  POST_USER: "/user",
};

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
