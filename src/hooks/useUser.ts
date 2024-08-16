"use client";

import { useEffect, useState } from "react";

import { getUser } from "@/services/user";

import { User } from "../index.d";
import { GetUserResponse } from "@/interfaces/BackendResponses";

type UserResponse = Omit<User, "_id" | "email" | "password" | "trainings">;

export function useUser() {
  const [user, setUser] = useState<UserResponse>();
  const [error, setError] = useState<boolean>(false);
  const loading = !error && !user;

  useEffect(() => {
    getUser()
      .then((res: GetUserResponse) => {
        setUser(res.user);
      })
      .catch((_) => setError(true));
  }, []);

  return {
    user,
    setUser,
    error,
    loading,
  };
}
