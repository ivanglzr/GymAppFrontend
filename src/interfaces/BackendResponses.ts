import { BackendResponse, Training, User, UserExercise } from "..";

export interface GetUserResponse extends BackendResponse {
  user: User;
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
