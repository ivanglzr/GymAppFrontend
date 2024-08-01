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
