import { push } from "connected-react-router";

import { removeSession } from "./sessionActions";

export const logout = () => (dispatch) => {
  dispatch(removeSession());
  dispatch(push("/"));
};
