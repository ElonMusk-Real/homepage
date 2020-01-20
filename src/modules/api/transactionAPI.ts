import { push } from "connected-react-router";

import { BASE_API, post, Message, delete_, get, putMultipart } from "./http";
import { selectToken } from "../session/sessionSelectors";
import { showToast } from "../toast/toastActions";
import { resetCart } from "../cart/cartAPI";
import { CartSnack } from "./cartAPI";

export enum TransactionStatuses {
  NotFound = "not found",
  Process = "process",
  Confirmed = "confirmed",
  InDelivery = "in delivery",
  WaitToPickUp = "wait to pick up",
  Done = "done"
}

export interface Transaction {
  id: number;
  userId: number;
  cartId: number;
  price: number;
  date: string | null;
  time: string | null;
  location: string | null;
  startedDateTime: string | null;
  transferImage: string | null;
  uploadedDateTime: string | null;
  status: string;
}

export interface UpdateTransactionForm {
  date: string;
  time: string;
  location: string;
  image?: any;
}

export interface TransactionWithCartSnackList {
  transaction: Transaction;
  cartSnackList: CartSnack[];
}

export interface TransactionStatusResponse {
  status: TransactionStatuses | null;
}

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
