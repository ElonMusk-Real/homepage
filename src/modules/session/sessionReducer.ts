import { SessionState, SET_SESSION, REMOVE_SESSION, SessionActionTypes } from "./sessionActions";

const initialState: SessionState = {
  token: null,
  isAdmin: false
};

export function sessionReducer(state = initialState, action: SessionActionTypes): SessionState {
  switch (action.type) {
    case SET_SESSION:
      return { token: action.token, isAdmin: action.isAdmin };
    case REMOVE_SESSION:
      return { token: null, isAdmin: false };
    default:
      return state;
  }
}
