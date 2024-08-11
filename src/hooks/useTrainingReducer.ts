import { useReducer } from "react";
import { TrainingReducer } from "@/reducers/training";
import { Training, TrainingReducerActions } from "@/index.d";

export function useTrainingReducer(trainingInitialState: Training) {
  const [state, dispatch] = useReducer(TrainingReducer, trainingInitialState);

  const setDuration = (duration: number) => {
    dispatch({ type: TrainingReducerActions.SET_DURATION, payload: duration });
  };

  const setDate = (date: Date) => {
    dispatch({ type: TrainingReducerActions.SET_DATE, payload: date });
  };

  const setExerciseName = (exerciseIndex: number, name: string) => {
    dispatch({
      type: TrainingReducerActions.SET_EXERCISE_NAME,
      payload: { exerciseIndex, name },
    });
  };

  const setSetWeight = (
    exerciseIndex: number,
    setIndex: number,
    weight: number
  ) => {
    dispatch({
      type: TrainingReducerActions.SET_SET_WEIGHT,
      payload: { exerciseIndex, setIndex, weight },
    });
  };

  const setSetReps = (
    exerciseIndex: number,
    setIndex: number,
    reps: number
  ) => {
    dispatch({
      type: TrainingReducerActions.SET_SET_REPS,
      payload: { exerciseIndex, setIndex, reps },
    });
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
    setDuration,
    setDate,
    setExerciseName,
    setSetWeight,
    setSetReps,
    addExercise,
    addSet,
    deleteExercise,
    deleteSet,
  };
}
