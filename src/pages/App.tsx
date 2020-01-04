import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Navbar from "../components/NavBar";

import Toast from "../components/Toast";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import Register from "./RegisterPage";
import Login from "./LoginPage";
import ProfilePage from "./ProfilePage";
import ProductList from "./ProductList";

const menus = [
  { icon: "home", text: "Home", url: "/", component: HomePage, needLogin: false, adminOnly: false, exact: true },
  {
    icon: "view_module",
    text: "Product List",
    url: "/productlist",
    component: ProductList,
    needLogin: false,
    adminOnly: false
  },
  { icon: "person", text: "Profile", url: "/profile", component: ProfilePage, needLogin: true, adminOnly: false },
  { icon: "double_arrow", text: "Login", url: "/login", component: Login, needLogin: false, adminOnly: false },
  { icon: "add_circle", text: "Register", url: "/register", component: Register, needLogin: false, adminOnly: false },
  { icon: "info", text: "About", url: "/about", component: AboutPage, needLogin: false, adminOnly: false }
];

const App = () => {
  return (
    <>
      <Navbar title="NATA Danus" menus={menus} />
      <Switch>
        {menus.map((menu) => (
          <Route path={menu.url} exact={!!menu.exact} component={menu.component} />
        ))}
      </Switch>
      <Toast />
    </>
  );
};

export default withRouter(App);
