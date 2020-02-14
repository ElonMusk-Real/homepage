import { push } from "connected-react-router";

import { BASE_API, get, Message, post, put } from "./http";
import { selectToken } from "../session/sessionSelectors";
import { Pagination } from "./pagination";
import { showToast } from "../toast/toastActions";

export interface SellerInsertForm {
  name: string;
  phoneNumber: string;
  address: string;
}

export interface SellerUpdateForm {
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

export interface IdToName {
  id: number;
  name: string;
}

export const fetchSellers = (rowsPerPage: number = 10, page: number = 0) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/sellers/?skip=${rowsPerPage * page}&take=${rowsPerPage}`;
  const sellers: Pagination<Seller> = await get(url, token);

  return sellers;
};

export const addSeller = (sellerUpdateForm: SellerUpdateForm) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/sellers/`;
  const body: Message = await post(url, token, sellerUpdateForm);

  dispatch(showToast(body.message));
  dispatch(push("/admin/sellers"));
};

export const getSeller = (id: number) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/sellers/${id}`;
  const seller: Seller = await get(url, token);

  return seller;
};

export const fetchAllSellers = () => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/sellers/all`;
  const sellers: IdToName[] = await get(url, token);

  return sellers;
};

export const updateSeller = (id: number, sellerUpdateForm: SellerUpdateForm) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/sellers/${id}`;
  const body: Message = await put(url, token, sellerUpdateForm);

  dispatch(showToast(body.message));
  dispatch(push("/admin/sellers"));
};
