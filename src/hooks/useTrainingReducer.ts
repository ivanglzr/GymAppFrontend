import { useCallback, useReducer } from "react";
import { TrainingReducer } from "@/reducers/training";
import { Training, TrainingReducerActions } from "@/index.d";

export function useTrainingReducer(trainingInitialState: Training) {
  const [state, dispatch] = useReducer(TrainingReducer, trainingInitialState);

  const addExercise = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      dispatch({ type: TrainingReducerActions.ADD_EXERCISE });
    },
    [dispatch]
  );

  const addSet = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      exerciseIndex: number
    ) => {
      event.preventDefault();
      dispatch({
        type: TrainingReducerActions.ADD_SET,
        payload: exerciseIndex,
      });
    },
    [dispatch]
  );

  const deleteExercise = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      exerciseIndex: number
    ) => {
      event.preventDefault();
      dispatch({
        type: TrainingReducerActions.DELETE_EXERCISE,
        payload: exerciseIndex,
      });
    },
    [dispatch]
  );

  const deleteSet = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      exerciseIndex: number,
      setIndex: number
    ) => {
      event.preventDefault();
      dispatch({
        type: TrainingReducerActions.DELETE_SET,
        payload: { exerciseIndex, setIndex },
      });
    },
    [dispatch]
  );

  return {
    training: state,
    addExercise,
    addSet,
    deleteExercise,
    deleteSet,
  };
}
