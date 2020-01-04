import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/es/integration/react";

import App from "./pages/App";
import theme from "./theme";
import { store, history, persistor } from "./modules/store";

import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,

  document.getElementById("root") as HTMLElement
);
