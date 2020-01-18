import ld from "lodash";

import { CartState, UPDATE_CART, RESET_CART, CartActionTypes } from "./cartActions";

const initialState: CartState = {};

const filterEmptyCart = (cart: CartState) => {
  return Object.keys(cart)
    .filter((id) => cart[id].quantity > 0)
    .reduce((obj, key) => {
      obj[key] = cart[key];
      return obj;
    }, {});
};

export const cartReducer = (state = initialState, action: CartActionTypes): CartState => {
  switch (action.type) {
    case UPDATE_CART:
      return filterEmptyCart({ ...state, [action.data.snackId]: action.data });
    case RESET_CART:
      return filterEmptyCart(ld.keyBy(action.data, "snackId"));
    default:
      return state;
  }
};
