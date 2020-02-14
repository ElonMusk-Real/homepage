import { push } from "connected-react-router";

import { BASE_API, get, Message, post, put } from "./http";
import { selectToken } from "../session/sessionSelectors";
import { Pagination } from "./pagination";
import { showToast } from "../toast/toastActions";

export interface VoucherInsertForm {
  voucherCode: string;
  discountRate: number;
  maxDiscount: number;
  minBox: number;
}

export interface VoucherUpdateForm {
  voucherCode: string;
  discountRate: number;
  maxDiscount: number;
  minBox: number;
}

export interface Voucher {
  id: number;
  voucherCode: string;
  discountRate: number;
  maxDiscount: number;
  minBox: number;
}

export const fetchVouchers = (rowsPerPage: number = 10, page: number = 0) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/vouchers/?skip=${rowsPerPage * page}&take=${rowsPerPage}`;
  const vouchers: Pagination<Voucher> = await get(url, token);

  return vouchers;
};

export const addVoucher = (voucherInsertForm: VoucherInsertForm) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/vouchers/`;
  const body: Message = await post(url, token, voucherInsertForm);

  dispatch(showToast(body.message));
  dispatch(push("/admin/vouchers"));
};

export const getVoucher = (id: number) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/vouchers/${id}`;
  const vouchers: Voucher = await get(url, token);

  return vouchers;
};

export const updateVoucher = (id: number, voucherUpdateForm: VoucherUpdateForm) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/vouchers/${id}`;
  const body: Message = await put(url, token, voucherUpdateForm);

  dispatch(showToast(body.message));
  dispatch(push("/admin/vouchers"));
};
