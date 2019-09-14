import axios from "axios";
import { Dispatch } from "react";

import { showToast, errorToast } from "../../toast/toastActions";
import { handleError, Response, BASE_API } from "../../http";

export interface UserRegistrationForm {
  email: string;
  password: string;
  name: string;
  university: string;
  faculty: string;
}

export const registerUser = (userRegistrationForm: UserRegistrationForm) => async (dispatch: Dispatch<{}>) => {
  try {
    const url = `${BASE_API}/users/register`;
    const response: Response = await axios.post(url, userRegistrationForm);
    dispatch(showToast(response.data.message));
  } catch (error) {
    handleError(dispatch, error);
  }
};
