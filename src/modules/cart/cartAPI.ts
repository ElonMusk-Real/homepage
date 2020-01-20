import { CartSnack, upsertCart, CartStatuses, fetchCart, getCartStatus } from "../api/cartAPI";
import { updateCartAction, resetCartAction } from "./cartActions";

export const updateCart = (data: CartSnack) => (dispatch) => {
  const { snackId, quantity } = data;
  dispatch(upsertCart({ snackId, quantity })).then(() => {
    dispatch(updateCartAction(data));
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
