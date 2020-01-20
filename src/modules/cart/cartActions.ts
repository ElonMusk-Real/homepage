import { CartSnack, CartStatuses } from "../api/cartAPI";

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
  status: CartStatuses;
}

export interface CartState {
  data: {
    [snackId: number]: CartSnack;
  };
  status: CartStatuses;
}

export type CartActionTypes = UpdateCartAction | ResetCartAction;

export const updateCartAction = (data: CartSnack): UpdateCartAction => {
  return { type: UPDATE_CART, data };
};

export const resetCartAction = (data: CartSnack[], status: CartStatuses): ResetCartAction => {
  return { type: RESET_CART, data, status };
};
