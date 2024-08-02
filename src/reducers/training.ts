import { Training } from "..";

enum TrainingReducerActions {
  ADD_EXERCISE = "ADD_EXERCISE",
  DELETE_EXERCISE = "DELETE_EXERCISE",
  ADD_SET = "ADD_SET",
  DELETE_SET = "DELETE_SET",
}

type ActionTypes =
  | { type: TrainingReducerActions.ADD_EXERCISE }
  | { type: TrainingReducerActions.DELETE_EXERCISE; payload: number }
  | { type: TrainingReducerActions.ADD_SET }
  | {
      type: TrainingReducerActions.DELETE_SET;
      payload: { exerciseIndex: number; setIndex: number };
    };

export function TrainingReducer(state: Training, action: ActionTypes) {}
