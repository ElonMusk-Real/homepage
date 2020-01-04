import { hideToastAction } from "./toastActions";

export const hideToast = () => async (dispatch) => {
  dispatch(hideToastAction());
};
