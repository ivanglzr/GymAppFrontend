export const ROUTES = {
  URI: "http://localhost:3900",
  LOGIN: "/login/",
  LOGOUT: "/logout/",
  GET_USER: "/user/",
  GET_TRAINING: (trainingId: string) => `/user/training/${trainingId}`,
  POST_USER: "/user/",
  PUT_TRAINING: (trainingId: string) => `/user/training/${trainingId}`,
  DELETE_TRAINING: (trainingId: string) => `/user/training/${trainingId}`,
};
