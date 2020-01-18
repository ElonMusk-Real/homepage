import { push } from "connected-react-router";

import { removeSession } from "./sessionActions";
import { resetCart } from "../cart/cartAPI";

export const logout = () => (dispatch) => {
  dispatch(resetCart([]));
  dispatch(removeSession());
  dispatch(push("/"));
};
