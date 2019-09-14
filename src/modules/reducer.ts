import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { toastReducer } from "./toast/toastReducer";

const rootReducer = combineReducers({
  toast: toastReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
