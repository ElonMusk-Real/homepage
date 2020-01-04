import { errorToast } from "./toastActions";

export const toastMiddleware = store => next => async action => {
  try {
    return await next(action);
  } catch (err) {
    return next(errorToast(err.message));
  }
};
