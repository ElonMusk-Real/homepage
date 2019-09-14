import { Dispatch } from "react";

import { hideToastAction } from "./toastActions";

export const hideToast = () => async (dispatch: Dispatch<{}>) => {
  dispatch(hideToastAction());
};
