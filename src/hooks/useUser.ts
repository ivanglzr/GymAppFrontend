"use client";

import { useUserContext } from "./useUserContext";

export function useUser() {
  const { user, setUser, error, loading } = useUserContext();

  return {
    user,
    setUser,
    error,
    loading,
  };
}
