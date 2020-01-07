import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Toast from "../components/Toast";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import Register from "./RegisterPage";
import Login from "./LoginPage";
import ProfilePage from "./ProfilePage";
import ProductList from "./ProductList";
import Navbar from "../components/NavBar";
import SellerListPage from "./SellerListPage";
import withTitle from "../modules/withTitle";
import AddSellerPage from "./AddSellerPage";

const menus = [
  { icon: "home", text: "Home", url: "/", component: HomePage, exact: true },
  {
    icon: "view_module",
    text: "Product List",
    url: "/productlist",
    component: ProductList
  },
  { icon: "person", text: "Seller List", url: "/sellers", component: SellerListPage, adminOnly: true, exact: true },
  { icon: "person", text: "Add new Seller", url: "/sellers/add", component: AddSellerPage, hideFromMenu: true },
  { icon: "person", text: "Profile", url: "/profile", component: ProfilePage, userOnly: true },
  { icon: "double_arrow", text: "Login", url: "/login", component: Login, guestOnly: true },
  { icon: "add_circle", text: "Register", url: "/register", component: Register, guestOnly: true },
  { icon: "info", text: "About", url: "/about", component: AboutPage }
];

const App = () => {
  return (
    <>
      <Navbar title="NATA Danus" menus={menus} />
      <Switch>
        {menus.map((menu) => (
          <Route
            path={menu.url}
            exact={!!menu.exact}
            component={withTitle({ component: menu.component, title: menu.text })}
          />
        ))}
      </Switch>
      <Toast />
    </>
  );
};

export default withRouter(App);
