import { BASE_API, get, Message, delete_, post } from "./http";
import { selectToken } from "../session/sessionSelectors";
import { showToast } from "../toast/toastActions";

export interface CartSnack {
  snackId: number;
  name: string;
  price: number;
  quantity: number;
}

export enum CartStatuses {
  Open = "open",
  Process = "process",
  Done = "done"
}

export interface CartStatusResponse {
  status: CartStatuses;
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

export const getCartStatus = () => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/carts/status`;
  const response: CartStatusResponse = await get(url, token);

  return response.status;
};
