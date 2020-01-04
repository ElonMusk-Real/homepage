import { showToast } from "../../toast/toastActions";
import { BASE_API, Message, put } from "../http";
import { selectToken } from "../../session/sessionSelectors";

export interface UserUpdateForm {
  email: string;
  name: string;
  university: string;
  faculty: string;
  lineId: string;
  phoneNumber: string;
}

export const updateProfile = (userUpdateForm: UserUpdateForm) => async (dispatch, getState) => {
  const url = `${BASE_API}/users/me`;
  const token = selectToken(getState());
  const response: Message = await put(url, token, userUpdateForm);
  dispatch(showToast(response.message));
};
