export interface SignInInterface {
  name: string;
  email: string;
  password: string;
  age: number;
  weight: number;
  height: number;
}

export interface Exercise {
  name: string;
  sets: Array<{
    weight: number;
    reps: number;
  }>;
}

export interface Training {
  duration: number;
  exercises: Array<Exercise>;
}

export interface User {
  name: string;
  email: string;
  password: string;
  age: number;
  weight: number;
  height: number;
  trainings: Array<Training>;
}
