import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

import { toastReducer } from "./toast/toastReducer";
import { toastMiddleware } from "./toast/toastMiddleware";
import { sessionReducer } from "./session/sessionReducer";
import { cartReducer } from "./cart/cartReducer";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  session: persistReducer({ key: "session", storage }, sessionReducer),
  toast: toastReducer,
  cart: cartReducer,
  router: connectRouter(history)
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(toastMiddleware, thunk, routerMiddleware(history)));

export const persistor = persistStore(store);
