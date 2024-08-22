import { BackendResponse, Training, User, UserExercise } from "..";

export type UserResponse = Omit<
  User,
  "_id" | "email" | "password" | "trainings"
>;

export interface GetUserResponse extends BackendResponse {
  user: UserResponse;
}

export interface GetTrainingResponse extends BackendResponse {
  training: Training;
}

export interface GetTrainingsResponse extends BackendResponse {
  trainings: Array<Training>;
}

export interface GetUserExercisesResponse extends BackendResponse {
  exercises: Array<UserExercise>;
}

export interface GetExerciseByIdResponse extends BackendResponse {
  exercise: UserExercise;
}

export interface PostExerciseResponse extends BackendResponse {
  id: string;
}
