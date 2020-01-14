import { push } from "connected-react-router";

import { BASE_API, get, Message, postMultipart, putMultipart } from "./http";
import { selectToken } from "../session/sessionSelectors";
import { showToast } from "../toast/toastActions";
import { Pagination } from "./pagination";

export interface InsertSnackForm {
  sellerId: number;
  name: string;
  price: number;
  quantity: number;
  sellingPrice: number;
  image?: any;
}

export interface UpdateSnackForm {
  sellerId: number;
  name: string;
  price: number;
  quantity: number;
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
  sellingPrice: number;
  image: string;
}

export interface RawSnack {
  id: number;
  sellerId: number;
  name: string;
  price: number;
  quantity: number;
  sellingPrice: number;
  image: string;
}

export const fetchSnacks = (rowsPerPage: number = 10, page: number = 0) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/snacks/?skip=${rowsPerPage * page}&take=${rowsPerPage}`;
  const snacks: Pagination<Snack> = await get(url, token);

  return snacks;
};

export const addSnack = (insertSnackForm: InsertSnackForm) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/snacks/`;
  const body: Message = await postMultipart(url, token, insertSnackForm);

  dispatch(showToast(body.message));
  dispatch(push("/admin/snacks"));
};

export const getSnack = (id: number) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/snacks/${id}`;
  const snack: RawSnack = await get(url, token);

  return snack;
};

export const updateSnack = (id: number, updateSnackForm: UpdateSnackForm) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/snacks/${id}`;
  const body: Message = await putMultipart(url, token, updateSnackForm);

  dispatch(showToast(body.message));
  dispatch(push("/admin/snacks"));
};
