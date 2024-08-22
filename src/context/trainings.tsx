import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Training } from "../index.d";
import { getTrainings } from "@/services/training";

type TrainingsContextType = {
  trainings: Array<Training> | undefined;
  setTrainings: Dispatch<SetStateAction<Training[] | undefined>> | undefined;
  error: boolean;
  loading: boolean;
};

export const TrainingsContext = createContext<TrainingsContextType>({
  trainings: undefined,
  setTrainings: undefined,
  error: false,
  loading: true,
});

export function TrainingsProvider({ children }: { children: ReactNode }) {
  const [trainings, setTrainings] = useState<Array<Training>>();
  const [error, setError] = useState<boolean>(false);
  const loading = !trainings && !error;

  useEffect(() => {
    getTrainings()
      .then((res) => setTrainings(res.trainings))
      .catch((_) => setError(true));
  }, []);

  return (
    <TrainingsContext.Provider
      value={{ trainings, setTrainings, error, loading }}
    >
      {children}
    </TrainingsContext.Provider>
  );
}
