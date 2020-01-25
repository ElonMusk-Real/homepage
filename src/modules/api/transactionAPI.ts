import { push } from "connected-react-router";

import { BASE_API, post, Message, delete_, get, putMultipart, patch } from "./http";
import { selectToken } from "../session/sessionSelectors";
import { showToast } from "../toast/toastActions";
import { resetCart } from "../cart/cartAPI";
import { CartSnack } from "./cartAPI";
import { Pagination } from "./pagination";

export enum TransactionStatuses {
  NotFound = "not found",
  Paid = "paid",
  Process = "process",
  Confirmed = "confirmed",
  InDelivery = "in delivery",
  WaitToPickUp = "wait to pick up",
  Done = "done"
}

export enum PaymentMethods {
  Gopay = "gopay",
  Ovo = "ovo",
  BankBca = "bank bca",
  BankBni = "bank bni"
}
export interface TransactionWithUser {
  id: number;
  email: string;
  name: string;
  phoneNumber: string | null;
  lineId: string | null;
  cartId: number;
  price: number;
  date: string | null;
  time: string | null;
  location: string | null;
  startedDateTime: string | null;
  transferImage: string | null;
  uploadedDateTime: string | null;
  status: TransactionStatuses;
}

export interface Transaction {
  id: number;
  userId: number;
  cartId: number;
  price: number;
  paymentMethod: string | null;
  date: string | null;
  time: string | null;
  location: string | null;
  startedDateTime: string;
  transferImage: string | null;
  uploadedDateTime: string | null;
  status: TransactionStatuses;
}

export interface UpdateTransactionForm {
  date: string;
  paymentMethod: string;
  time: string;
  location: string;
  transferImage?: any;
}

export interface TransactionWithCartSnackList {
  transaction: Transaction;
  cartSnackList: CartSnack[];
}

export interface TransactionStatusResponse {
  status: TransactionStatuses | null;
}

export interface TransactionStatusUpdate {
  status: TransactionStatuses;
}

export const confirmPickUp = () => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/transactions/confirm`;
  const body: Message = await post(url, token);

  dispatch(showToast(body.message));
};

export const createTransaction = () => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/transactions/`;
  const body: Message = await post(url, token);

  dispatch(showToast(body.message));
  dispatch(push("/transaction"));
};

export const cancelTransaction = () => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/transactions/`;
  const body: Message = await delete_(url, token);

  dispatch(showToast(body.message));
  dispatch(resetCart());
};

export const getTransactionStatus = () => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/transactions/status`;
  const response: TransactionStatusResponse = await get(url, token);

  return response.status || TransactionStatuses.NotFound;
};

export const getTransactionDetail = () => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/transactions/detail`;
  const response: TransactionWithCartSnackList = await get(url, token);

  return response;
};

export const updateTransaction = (updateTransactionForm: UpdateTransactionForm) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/transactions/`;
  const body: Message = await putMultipart(url, token, updateTransactionForm);

  dispatch(showToast(body.message));
};

export const fetchTransaction = (rows: number = 10, page: number = 0) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/transactions/?skip=${rows * page}&take=${rows}`;
  const transactions: Pagination<TransactionWithUser> = await get(url, token);

  return transactions;
};

export const updateTransactionStatus = (id: number, status: TransactionStatuses) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const url = `${BASE_API}/transactions/${id}`;
  const body: Message = await patch(url, token, { status } as TransactionStatusUpdate);

  dispatch(showToast(body.message));
};
