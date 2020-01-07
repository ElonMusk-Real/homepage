import { push } from "connected-react-router";

import { BASE_API, get, Message, post } from "./http";
import { selectToken } from "../session/sessionSelectors";
import { Pagination } from "./pagination";
import { showToast } from "../toast/toastActions";

export interface InsertSellerForm {
  name: string;
  phoneNumber: string;
  address: string;
}

export interface Seller {
  id: number;
  name: string;
  phoneNumber: string;
  address: string;
}

export const fetchSellers = () => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/sellers/`;
  const sellers: Pagination<Seller> = await get(url, token);

  return sellers;
};

export const addSeller = (insertSellerForm: InsertSellerForm) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/sellers/`;
  const body: Message = await post(url, token, insertSellerForm);
  dispatch(showToast(body.message));
  dispatch(push("/sellers"));
};
