import { push } from "connected-react-router";

import { BASE_API, get, Message, postMultipart, putMultipart } from "./http";
import { selectToken } from "../session/sessionSelectors";
import { showToast } from "../toast/toastActions";
import { Pagination } from "./pagination";

export interface SnackInsertForm {
  sellerId: number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  sellingPrice: number;
  image?: any;
}

export interface SnackUpdateForm {
  sellerId: number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  sellingPrice: number;
  image?: any;
}

export interface Snack {
  id: number;
  seller: string;
  address: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  sellingPrice: number;
  estimatedProfit: number;
  image: string;
}

export interface RawSnack {
  id: number;
  sellerId: number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  sellingPrice: number;
  estimatedProfit: number;
  image: string;
}

export const fetchSnacks = (rows: number = 10, page: number = 0, q: string = "") => async (dispatch, getState) => {
  const url = `${BASE_API}/snacks/?skip=${rows * page}&take=${rows}&q=${q}`;
  const snacks: Pagination<Snack> = await get(url);

  return snacks;
};

export const addSnack = (snackInsertForm: SnackInsertForm) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/snacks/`;
  const body: Message = await postMultipart(url, token, snackInsertForm);

  dispatch(showToast(body.message));
  dispatch(push("/admin/snacks"));
};

export const getSnack = (id: number) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/snacks/${id}`;
  const snack: RawSnack = await get(url, token);

  return snack;
};

export const updateSnack = (id: number, snackUpdateForm: SnackUpdateForm) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/snacks/${id}`;
  const body: Message = await putMultipart(url, token, snackUpdateForm);

  dispatch(showToast(body.message));
  dispatch(push("/admin/snacks"));
};
