import ld from "lodash";

import { CartState, UPDATE_CART, RESET_CART, CartActionTypes } from "./cartActions";
import { CartStatuses, CartSnack } from "../api/cartAPI";

const initialState: CartState = {
  data: {},
  status: CartStatuses.Open
};

const filterEmptyCart = (cart: { [snackId: number]: CartSnack }) => {
  return Object.keys(cart)
    .filter((id) => cart[id].quantity > 0)
    .reduce((obj, key) => {
      obj[key] = cart[key];
      return obj;
    }, {});
};

export const cartReducer = (state = initialState, action: CartActionTypes): CartState => {
  if (action.type === UPDATE_CART) {
    return {
      data: filterEmptyCart({ ...state.data, [action.data.snackId]: action.data }),
      status: state.status
    };
  } else if (action.type === RESET_CART) {
    return {
      data: filterEmptyCart(ld.keyBy(action.data, "snackId")),
      status: action.status
    };
  } else {
    return state;
  }
};
