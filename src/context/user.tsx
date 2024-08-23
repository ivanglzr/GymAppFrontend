"use client";

import { createContext, ReactNode, Dispatch, SetStateAction } from "react";

import { UserResponse } from "@/interfaces/BackendResponses";
import { useUser } from "@/hooks/useUser";

type UserContextType = {
  user: UserResponse | undefined;
  setUser: Dispatch<SetStateAction<UserResponse | undefined>> | undefined;
  error: boolean;
  loading: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: undefined,
  error: false,
  loading: true,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const { user, setUser, error, loading } = useUser();

  return (
    <UserContext.Provider value={{ user, setUser, error, loading }}>
      {children}
    </UserContext.Provider>
  );
}
