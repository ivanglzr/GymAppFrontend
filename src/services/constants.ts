export const ROUTES = {
  URI: "http://localhost:3900",
  LOGIN: "/login/",
  LOGOUT: "/logout/",
  GET_USER_BY_TOKEN: "/user/",
  POST_USER: "/user/",
  PUT_TRAINING: (trainingId: string) => `/user/training/${trainingId}`,
  DELETE_TRAINING: (trainingId: string) => `/user/training/${trainingId}`,
};
