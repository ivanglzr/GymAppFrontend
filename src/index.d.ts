//? User Forms Interfaces

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

//? User Interfaces

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

//? User Exercise Types

export type ExerciseEquipments =
  | "None"
  | "Barbell"
  | "Dumbell"
  | "Kettlebell"
  | "Machine"
  | "Plate"
  | "Resistance Band"
  | "Suspension"
  | "Other";

export const exerciseEquipments: ExerciseEquipments[] = [
  "None",
  "Barbell",
  "Dumbell",
  "Kettlebell",
  "Machine",
  "Plate",
  "Resistance Band",
  "Suspension",
  "Other",
];

export type MuscularGroups =
  | "Chest"
  | "Back"
  | "Shoulders"
  | "Biceps"
  | "Triceps"
  | "Forearms"
  | "Abs"
  | "Obliques"
  | "Quadriceps"
  | "Hamstrings"
  | "Glutes"
  | "Calves"
  | "Trapezius"
  | "Lats"
  | "Lower Back"
  | "Hip Flexors"
  | "Adductors"
  | "Abductors";

export const muscularGroups: MuscularGroups[] = [
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Forearms",
  "Abs",
  "Obliques",
  "Quadriceps",
  "Hamstrings",
  "Glutes",
  "Calves",
  "Trapezius",
  "Lats",
  "Lower Back",
  "Hip Flexors",
  "Adductors",
  "Abductors",
];

export interface UserExercise {
  name: string;
  description?: string;
  equipment: ExerciseEquipments;
  muscle: MuscularGroups;
  userId?: string;
}

//? Training Reducer

export enum TrainingReducerActions {
  SET_TRAINING = "SET_TRAINING",
  ADD_EXERCISE = "ADD_EXERCISE",
  DELETE_EXERCISE = "DELETE_EXERCISE",
  ADD_SET = "ADD_SET",
  DELETE_SET = "DELETE_SET",
}

export type TrainingReducerActionTypes =
  | { type: TrainingReducerActions.SET_TRAINING; payload: Training }
  | { type: TrainingReducerActions.ADD_EXERCISE }
  | { type: TrainingReducerActions.ADD_SET; payload: number }
  | { type: TrainingReducerActions.DELETE_EXERCISE; payload: number }
  | {
      type: TrainingReducerActions.DELETE_SET;
      payload: { exerciseIndex: number; setIndex: number };
    };
