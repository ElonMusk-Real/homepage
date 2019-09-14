import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/NavBar";

import { Home, About, Register, Login, Profile, ProductList } from "./pages";
import Toast from "./components/Toast";

interface PageRouterProps {}

const PageRouter: React.FC<PageRouterProps> = () => {
  return (
    <>
      <Router>
        <Navbar title="NATA Danus" />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/productlist" component={ProductList} />
        </Switch>
        <Toast />
      </Router>
    </>
  );
};

export default PageRouter;
