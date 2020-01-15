import { push } from "connected-react-router";

import { BASE_API, get, Message, postMultipart, putMultipart, delete_, post } from "./http";
import { selectToken } from "../session/sessionSelectors";
import { showToast } from "../toast/toastActions";

export interface CartSnack {
  snackId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface UpsertCartForm {
  snackId: number;
  quantity: number;
}

export const fetchCart = () => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/carts/`;
  const cart: CartSnack[] = await get(url, token);

  return cart;
};

export const upsertCart = (upsertCartForm: UpsertCartForm) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/carts/`;
  await post(url, token, upsertCartForm);
};

export const removeFromCart = (snackId: number) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/carts/${snackId}`;
  const response: Message = await delete_(url, token);

  dispatch(showToast(response.message));
};
