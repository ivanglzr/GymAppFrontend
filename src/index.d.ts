export interface SignInInterface {
  name: string;
  email: string;
  password: string;
  age: number;
  weight: number;
  height: number;
}

export interface LogInInterface {
  email: string;
  password: string;
}

export interface Exercise {
  _id?: string;
  name: string;
  sets: Array<{
    _id?: string;
    weight: number;
    reps: number;
  }>;
}

export interface Training {
  _id?: string;
  duration: number;
  date: Date;
  exercises: Array<Exercise>;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  age: number;
  weight: number;
  height: number;
  trainings: Array<Training>;
}

export enum TrainingReducerActions {
  ADD_EXERCISE = "ADD_EXERCISE",
  DELETE_EXERCISE = "DELETE_EXERCISE",
  ADD_SET = "ADD_SET",
  DELETE_SET = "DELETE_SET",
}

export type TrainingReducerActionTypes =
  | { type: TrainingReducerActions.ADD_EXERCISE }
  | { type: TrainingReducerActions.ADD_SET; payload: number }
  | { type: TrainingReducerActions.DELETE_EXERCISE; payload: number }
  | {
      type: TrainingReducerActions.DELETE_SET;
      payload: { exerciseIndex: number; setIndex: number };
    };
