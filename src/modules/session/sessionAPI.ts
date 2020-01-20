import { push } from "connected-react-router";

import { removeSession } from "./sessionActions";
import { resetCartAction } from "../cart/cartActions";
import { CartStatuses } from "../api/cartAPI";

export const logout = () => (dispatch) => {
  dispatch(resetCartAction([], CartStatuses.Open));
  dispatch(removeSession());
  dispatch(push("/"));
};
