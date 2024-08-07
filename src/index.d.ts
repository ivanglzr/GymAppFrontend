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

//? Create Exercise Types

type ExerciseEquipments =
  | "None"
  | "Barbell"
  | "Dumbell"
  | "Kettlebell"
  | "Machine"
  | "Plate"
  | "Resistance Band"
  | "Suspension"
  | "Other";

type MuscularGroups =
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

export interface CreateExercise {
  name: string;
  description?: string;
  equipment: ExerciseEquipments;
  muscles: MuscularGroups;
}

//? Training Reducer

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
