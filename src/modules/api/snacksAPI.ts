import { push } from "connected-react-router";

import { BASE_API, get, Message, post, postMultipart } from "./http";
import { selectToken } from "../session/sessionSelectors";
import { showToast } from "../toast/toastActions";

export interface InsertSnackForm {
  sellerId: number;
  name: string;
  price: number;
  quantity: number;
  sellingPrice: number;
  // image: null;
}

export interface Snack {
  id: number;
  seller: string;
  name: string;
  price: number;
  quantity: number;
  sellingPrice: number;
  image: string;
}

export const fetchSnacks = () => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/snacks/`;
  const snacks: Snack[] = await get(url, token);

  return snacks;
};

export const addSnack = (insertSnackForm: InsertSnackForm) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/snacks/`;
  const body: Message = await postMultipart(url, token, insertSnackForm);
  dispatch(showToast(body.message));
  dispatch(push("/snacks"));
};
