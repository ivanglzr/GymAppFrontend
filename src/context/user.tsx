"use client";

import {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

import { GetUserResponse, UserResponse } from "@/interfaces/BackendResponses";
import { getUser } from "@/services/user";

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

  return (
    <UserContext.Provider value={{ user, setUser, error, loading }}>
      {children}
    </UserContext.Provider>
  );
}
