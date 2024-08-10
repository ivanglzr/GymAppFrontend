import { useReducer } from "react";
import { TrainingReducer } from "@/reducers/training";
import { Training, TrainingReducerActions } from "@/index.d";

export function useTrainingReducer(trainingInitialState: Training) {
  const [state, dispatch] = useReducer(TrainingReducer, trainingInitialState);

  const setTraining = (training: Training) => {
    dispatch({ type: TrainingReducerActions.SET_TRAINING, payload: training });
  };

  const addExercise = () =>
    dispatch({ type: TrainingReducerActions.ADD_EXERCISE });

  const addSet = (exerciseIndex: number) => {
    dispatch({
      type: TrainingReducerActions.ADD_SET,
      payload: exerciseIndex,
    });
  };

  const deleteExercise = (exerciseIndex: number) => {
    dispatch({
      type: TrainingReducerActions.DELETE_EXERCISE,
      payload: exerciseIndex,
    });
  };

  const deleteSet = (exerciseIndex: number, setIndex: number) => {
    dispatch({
      type: TrainingReducerActions.DELETE_SET,
      payload: { exerciseIndex, setIndex },
    });
  };

  return {
    training: state,
    setTraining,
    addExercise,
    addSet,
    deleteExercise,
    deleteSet,
  };
}
