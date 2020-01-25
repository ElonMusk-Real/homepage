import { CartSnack, upsertCart, CartStatuses, fetchCart, getCartStatus } from "../api/cartAPI";
import { updateCartAction, resetCartAction } from "./cartActions";

export const updateCart = (data: CartSnack) => (dispatch, getState) => {
  const { snackId, quantity } = data;
  dispatch(upsertCart({ snackId, quantity }))
    .then(() => {
      dispatch(updateCartAction(data));
    })
    .catch((e) => {
      if (e.message === "Sorry, out of stock") {
        resetCart()(dispatch, getState);
      }
    });
};

export const resetCart = () => (dispatch, getState) => {
  getCartStatus()(dispatch, getState).then((status) => {
    if (status === CartStatuses.Process) {
      dispatch(resetCartAction([], status));
    } else {
      fetchCart()(dispatch, getState).then((data) => dispatch(resetCartAction(data, status)));
    }
  });
};
