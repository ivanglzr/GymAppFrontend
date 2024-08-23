import { createContext, ReactNode, SetStateAction } from "react";
import { Training } from "../index.d";
import { useTrainings } from "@/hooks/useTrainings";

type TrainingsContextType = {
  trainings: Array<Training> | undefined;
  setTrainings: (value: SetStateAction<Training[] | undefined>) => void;
  error: boolean;
  loading: boolean;
};

export const TrainingsContext = createContext<TrainingsContextType>({
  trainings: undefined,
  setTrainings: () => {},
  error: false,
  loading: true,
});

export function TrainingsProvider({ children }: { children: ReactNode }) {
  const { trainings, setTrainings, error, loading } = useTrainings();

  return (
    <TrainingsContext.Provider
      value={{ trainings, setTrainings, error, loading }}
    >
      {children}
    </TrainingsContext.Provider>
  );
}
