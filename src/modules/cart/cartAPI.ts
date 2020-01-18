import { CartSnack, upsertCart } from "../api/cartAPI";
import { updateCartAction, resetCartAction } from "./cartActions";

export const updateCart = (data: CartSnack) => (dispatch) => {
  const { snackId, quantity } = data;
  dispatch(upsertCart({ snackId, quantity })).then(() => {
    dispatch(updateCartAction(data));
  });
};

export const resetCart = (data: CartSnack[]) => (dispatch) => {
  dispatch(resetCartAction(data));
};
