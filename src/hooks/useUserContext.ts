import { UserContext } from "@/context/user";
import { useContext } from "react";

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) throw new Error("Element isn't in provider");

  return context;
}
