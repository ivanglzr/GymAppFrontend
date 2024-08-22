import { UserContext } from "@/context/user";
import { useContext } from "react";

export function useUserReducer() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("This component isn't in the provider");
  }

  return { user: context.user, error: context.error, loading: context.loading };
}
