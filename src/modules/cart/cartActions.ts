import { CartSnack } from "../api/cartAPI";

export const UPDATE_CART = "UPDATE_CART";
export const RESET_CART = "RESET_CART";

export enum CartType {
  UPDATE_CART,
  RESET_CART
}

interface UpdateCartAction {
  type: typeof UPDATE_CART;
  data: CartSnack;
}

interface ResetCartAction {
  type: typeof RESET_CART;
  data: CartSnack[];
}

export interface CartState {
  [snackId: number]: CartSnack;
}

export type CartActionTypes = UpdateCartAction | ResetCartAction;

export const updateCartAction = (data: CartSnack): UpdateCartAction => {
  return { type: UPDATE_CART, data };
};

export const resetCartAction = (data: CartSnack[]): ResetCartAction => {
  return { type: RESET_CART, data };
};
