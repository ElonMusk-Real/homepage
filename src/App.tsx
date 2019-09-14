import React from "react";
import { Provider } from "react-redux";

import PageRouter from "./PageRouter";
import { store } from "./modules/reducer";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PageRouter />
    </Provider>
  );
};

export default App;
