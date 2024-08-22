import { createContext, useEffect, useState, ReactNode } from "react";
import { User } from "../index.d";
import { getUser } from "@/services/user";

type UserResponse = Omit<User, "_id" | "email" | "password" | "trainings">;

type UserContextType = {
  user: UserResponse | undefined;
  error: boolean;
  loading: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  error: false,
  loading: true,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponse | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);
  const loading = !user && !error;

  useEffect(() => {
    getUser()
      .then((res) => setUser(res.user))
      .catch(() => setError(true));
  }, []);

  return (
    <UserContext.Provider value={{ user, error, loading }}>
      {children}
    </UserContext.Provider>
  );
}
