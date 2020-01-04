import { push } from "connected-react-router";

import { post, BASE_API } from "../http";
import { setSession } from "../../session/sessionActions";
import { showToast } from "../../toast/toastActions";

export interface LoginForm {
  email: string;
  password: string;
}

export interface Credential {
  token: string;
  isAdmin: boolean;
}

export const loginUser = (email: string, password: string) => async (dispatch) => {
  const url = `${BASE_API}/users/login`;
  const loginForm: LoginForm = { email, password };
  const credential: Credential = await post(url, undefined, loginForm);
  const { token } = credential;
  dispatch(setSession(token));
  dispatch(push("/profile"));
  dispatch(showToast("Login Success"));
};
