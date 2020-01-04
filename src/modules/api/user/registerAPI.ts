import { showToast } from "../../toast/toastActions";
import { BASE_API, Message, post } from "../http";

export interface UserRegistrationForm {
  email: string;
  password: string;
  name: string;
  university: string;
  faculty: string;
}

export const registerUser = (userRegistrationForm: UserRegistrationForm) => async (dispatch) => {
  const url = `${BASE_API}/users/register`;
  const response: Message = await post(url, undefined, userRegistrationForm);
  dispatch(showToast(response.message));
};
