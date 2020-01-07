import { errorToast } from "./toastActions";
import { ForbiddenError, UnauthorizedError } from "../api/error";
import { push } from "connected-react-router";

export const toastMiddleware = (store) => (next) => async (action) => {
  try {
    return await next(action);
  } catch (err) {
    if (err instanceof ForbiddenError) {
      next(push("/"));
      next(errorToast("Forbidden Access!"));
    } else if (err instanceof UnauthorizedError) {
      next(push("/login"));
      next(errorToast(err.message));
    } else {
      next(errorToast(err.message));
    }

    throw err;
  }
};
