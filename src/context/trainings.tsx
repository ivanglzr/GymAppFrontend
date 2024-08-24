"use client";

import {
  createContext,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Training } from "../index.d";
import { getTrainings } from "@/services/training";

type TrainingsContextType = {
  trainings: Array<Training> | undefined;
  setTrainings: (value: SetStateAction<Training[] | undefined>) => void;
  error: boolean;
  loading: boolean;
  refetchTrainings: () => void;
};

export const TrainingsContext = createContext<TrainingsContextType>({
  trainings: undefined,
  setTrainings: () => {},
  error: false,
  loading: true,
  refetchTrainings: () => {},
});

export function TrainingsProvider({ children }: { children: ReactNode }) {
  const [trainings, setTrainings] = useState<Training[]>();
  const [error, setError] = useState<boolean>(false);
  const [updateTrainings, setUpdateTrainings] = useState<boolean>(false);
  const loading = !trainings && !error;

  useEffect(() => {
    getTrainings()
      .then((res) => setTrainings(res.trainings))
      .catch((_) => setError(true));
  }, [updateTrainings]);

  const refetchTrainings = () => setUpdateTrainings(!updateTrainings);

  return (
    <TrainingsContext.Provider
      value={{ trainings, setTrainings, error, loading, refetchTrainings }}
    >
      {children}
    </TrainingsContext.Provider>
  );
}
