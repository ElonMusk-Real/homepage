import React from "react";
import { Route, Switch } from "react-router-dom";
import { makeStyles, Grid } from "@material-ui/core";

import Toast from "../components/Toast";
import HomePage from "./HomePage";
import Register from "./RegisterPage";
import Login from "./LoginPage";
import ProfilePage from "./ProfilePage";
import SnackListPage from "./admin/SnackListPage";
import Navbar from "../components/navbar/NavBar";
import SellerListPage from "./admin/SellerListPage";
import withTitle from "../modules/withTitle";
import AddSellerPage from "./admin/AddSellerPage";
import AddSnackPage from "./admin/AddSnackPage";
import SnacksPage from "./SnacksPage";
import ProfileListPage from "./admin/ProfileListPage";
import EditSellerPage from "./admin/EditSellerPage";
import Footer from "../components/Footer";
import EditSnackPage from "./admin/EditSnackPage";
import ScrollToTop from "../components/ScrollToTop";
import TransactionPage from "./TransactionPage";
import AboutPage from "./AboutPage";
import TransactionListPage from "./admin/TransactionListPage";
import ContactPage from "./ContactPage";
import { isMobile } from "react-device-detect";

export enum MenuGroup {
  ADMIN,
  PROFILE
}

export interface NavMenu {
  icon?: string;
  text: string;
  url: string;
  userOnly?: boolean;
  guestOnly?: boolean;
  adminOnly?: boolean;
  hideFromMenu?: boolean;
  group?: MenuGroup;
}

const menus = [
  { icon: "home", text: "Home", url: "/", component: HomePage, exact: true },
  { icon: "view_module", text: "Snacks", url: "/snacks", component: SnacksPage },
  {
    icon: "person",
    text: "My Profile",
    url: "/profile",
    component: ProfilePage,
    userOnly: true,
    group: MenuGroup.PROFILE
  },
  { icon: "double_arrow", text: "Login", url: "/login", component: Login, guestOnly: true },
  { icon: "add_circle", text: "Register", url: "/register", component: Register, guestOnly: true },
  {
    icon: "view_module",
    text: "Manage Snacks",
    url: "/admin/snacks",
    component: SnackListPage,
    adminOnly: true,
    exact: true,
    group: MenuGroup.ADMIN
  },
  {
    icon: "person",
    text: "Manage Sellers",
    url: "/admin/sellers",
    component: SellerListPage,
    adminOnly: true,
    exact: true,
    group: MenuGroup.ADMIN
  },
  {
    icon: "person",
    text: "User List",
    url: "/admin/users",
    component: ProfileListPage,
    adminOnly: true,
    group: MenuGroup.ADMIN
  },
  {
    icon: "person",
    text: "Transaction List",
    url: "/admin/transaction",
    component: TransactionListPage,
    adminOnly: true,
    group: MenuGroup.ADMIN
  },
  { text: "Add new Snack", url: "/admin/snacks/add", component: AddSnackPage, hideFromMenu: true },
  { text: "Edit Seller", url: "/admin/sellers/edit/:id", component: EditSellerPage, hideFromMenu: true },
  { text: "Edit Snack", url: "/admin/snacks/edit/:id", component: EditSnackPage, hideFromMenu: true },
  { text: "Add new Seller", url: "/admin/sellers/add", component: AddSellerPage, hideFromMenu: true },
  {
    icon: "account_balance_wallet",
    text: "Transaction",
    url: "/transaction",
    component: TransactionPage,
    exact: true,
    userOnly: true
  },
  { text: "About Us", url: "/about", component: AboutPage, hideFromMenu: true },
  { text: "Contact Us", url: "/contacts", component: ContactPage, hideFromMenu: true }
];

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    paddingTop: isMobile ? 55 : 64
  }
});

const App = () => {
  const classes = useStyles();

  return (
    <>
      <Navbar menus={menus} />
      <div className={classes.container}>
        <Grid container justify="center">
          <Switch>
            {menus.map((menu) => (
              <Route
                path={menu.url}
                exact={!!menu.exact}
                component={withTitle({ component: menu.component, title: menu.text })}
              />
            ))}
          </Switch>
        </Grid>
      </div>
      <Footer />
      <Toast />
      <ScrollToTop />
    </>
  );
};

export default App;
