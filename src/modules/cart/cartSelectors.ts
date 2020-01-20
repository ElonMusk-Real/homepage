import { AppState } from "../store";

export const getCart = (state: AppState) => {
  return state.cart;
};

export const getCartQuantity = (state: AppState, snackId: number) => {
  return state.cart.data[snackId] ? state.cart.data[snackId].quantity : 0;
};
