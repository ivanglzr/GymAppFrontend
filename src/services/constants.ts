export const ROUTES = {
  URI: "http://localhost:3900",
  LOGIN: "/login/",
  LOGOUT: "/logout/",
  GET_USER: "/user/",
  GET_TRAINING: (trainingId: string) => `/user/training/${trainingId}`,
  GET_TRAININGS: "/user/training/",
  GET_EXERCISE_BY_ID: (exerciseId: string) => `/exercise/${exerciseId}`,
  GET_USER_EXERCISES: "/exercise/",
  POST_USER: "/user/",
  POST_TRAINING: "/user/training/",
  POST_EXERCISE: "/exercise/",
  PUT_TRAINING: (trainingId: string) => `/user/training/${trainingId}`,
  PUT_EXERCISE: (exerciseId: string) => `/exercise/${exerciseId}`,
  DELETE_TRAINING: (trainingId: string) => `/user/training/${trainingId}`,
  DELETE_EXERCISE: (exerciseId: string) => `/exercise/${exerciseId}`,
};
