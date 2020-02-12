import { push } from "connected-react-router";

import { post, BASE_API, get, Message, put } from "./http";
import { setSession } from "../session/sessionActions";
import { showToast } from "../toast/toastActions";
import { selectToken } from "../session/sessionSelectors";
import { Pagination } from "./pagination";

export interface LoginForm {
  email: string;
  password: string;
}

export interface Credential {
  token: string;
  isAdmin: boolean;
}

export interface Profile {
  id: number;
  email: string;
  name: string;
  phoneNumber: string | null;
  lineId: string | null;
  university: string;
  faculty: string;
}

export interface UserRegistrationForm {
  email: string;
  password: string;
  name: string;
  lineId: string;
  phoneNumber: string;
  university: string;
  faculty: string;
}

export interface UserUpdateForm {
  email: string;
  name: string;
  university: string;
  faculty: string;
  lineId: string;
  phoneNumber: string;
}

export const loginUser = (email: string, password: string) => async (dispatch) => {
  const url = `${BASE_API}/users/login`;
  const loginForm: LoginForm = { email, password };
  const credential: Credential = await post(url, undefined, loginForm);
  const { token, isAdmin } = credential;
  dispatch(setSession(token, isAdmin));
  dispatch(push("/snacks"));
  dispatch(showToast("Login Success"));
};

export const getMyProfile = () => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/users/me`;
  const profile: Profile = await get(url, token);

  return profile;
};

export const registerUser = (userRegistrationForm: UserRegistrationForm) => async (dispatch) => {
  const url = `${BASE_API}/users/register`;
  const response: Message = await post(url, undefined, userRegistrationForm);
  dispatch(showToast(response.message));
  dispatch(push("/login"));
};

export const updateProfile = (userUpdateForm: UserUpdateForm) => async (dispatch, getState) => {
  const url = `${BASE_API}/users/me`;
  const token = selectToken(getState());
  const response: Message = await put(url, token, userUpdateForm);
  dispatch(showToast(response.message));
};

export const fetchAllProfile = (rows: number = 10, page: number = 0) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/users/?skip=${rows * page}&take=${rows}`;
  const profiles: Pagination<Profile> = await get(url, token);

  return profiles;
};
