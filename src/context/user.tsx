import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { getUser } from "@/services/user";

import { UserResponse } from "@/interfaces/BackendResponses";

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
  const [user, setUser] = useState<UserResponse | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);
  const loading = !user && !error;

  useEffect(() => {
    getUser()
      .then((res) => setUser(res.user))
      .catch(() => setError(true));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, error, loading }}>
      {children}
    </UserContext.Provider>
  );
}
