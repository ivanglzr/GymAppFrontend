"use client";

import { useEffect, useState } from "react";

import { getUser } from "@/services/user";

import { User } from "../index.d";

export function useUser() {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<boolean>(false);
  const loading = !error && !user;

  useEffect(() => {
    getUser()
      .then(res => {
        if (res.status === "error") {
          setError(true);
          return;
        }

        setUser(res.user);
      })
      .catch(_ => setError(true));
  }, []);

  console.log("render");

  return {
    user,
    setUser,
    error,
    loading,
  };
}
