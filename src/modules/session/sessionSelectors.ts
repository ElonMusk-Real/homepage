import { AppState } from "../store";
import { UnauthorizedError } from "../api/error";

export const isLoggedIn = (state: AppState) => {
  return state.session.token !== null;
};

export const selectToken = (state: AppState) => {
  const token = state.session.token;
  if (!token) {
    throw new UnauthorizedError({ message: "Login Required" });
  }

  return token;
};
