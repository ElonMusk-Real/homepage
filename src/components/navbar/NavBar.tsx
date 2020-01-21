import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Icon, makeStyles, Button, MenuItem, Menu } from "@material-ui/core";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { red } from "@material-ui/core/colors";
import { isBrowser, isMobile } from "react-device-detect";
import { connect } from "react-redux";
import clsx from "clsx";
import SearchIcon from "@material-ui/icons/Search";

import Drawer from "./Drawer";
import logogram from "./../../assets/logogram.png";
import logotype from "./../../assets/logotype-white.png";
import { NavMenu, MenuGroup } from "../../pages/App";
import { isAdmin, isLoggedIn } from "../../modules/session/sessionSelectors";
import SearchBox from "./SearchBox";
import ProfileMenu from "./ProfileMenu";
import CartMenu from "./CartMenu";
import { getCartStatus, CartStatuses } from "../../modules/api/cartAPI";

const useStyles = makeStyles({
  appBar: {
    backgroundColor: "#E73361"
  },
  logotype: {
    paddingLeft: 8,
    marginBottom: 3
  },
  menuButton: {
    color: "white"
  },
  link: {
    flexGrow: 1
  },
  linkButton: {
    textDecorationLine: "none"
  },
  linkSubButton: {
    textDecorationLine: "none",
    color: "black"
  },
  button: {
    color: "white",
    fontWeight: "bold",
    marginRight: 10
  },
  selectedButton: {
    backgroundColor: red[700]
  },
  searchIcon: {
    color: "white"
  }
});

interface NavBarProps extends RouteComponentProps<{}> {
  menus: NavMenu[];
  isLoggedIn: boolean;
  isAdmin: boolean;
  onGetCartStatus: () => Promise<CartStatuses>;
}

const Navbar = (props: NavBarProps) => {
  const { menus, isLoggedIn, isAdmin } = props;
  const [onSearch, setOnSearch] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    isLoggedIn && props.onGetCartStatus();
  }, [isLoggedIn]);

  const isMatch = (menuURL: string) => props.location.pathname.split("/")[1] === menuURL.split("/")[1];

  const isSnackPage = isMatch("/snacks");

  useEffect(() => {
    !isSnackPage && isMobile && setOnSearch(false);
  }, [props.location.pathname]);

  const visibleMenus = menus
    .filter((menu) => !(menu.userOnly && !isLoggedIn))
    .filter((menu) => !(menu.guestOnly && isLoggedIn))
    .filter((menu) => !(menu.adminOnly && !isAdmin))
    .filter((menu) => !menu.hideFromMenu);

  const [open, setOpen] = React.useState(false);

  const [anchorElAdmin, setAnchorElAdmin] = React.useState<null | HTMLElement>(null);
  const adminOpen = Boolean(anchorElAdmin);

  const toggle = () => setOpen(!open);

  const handleAdminMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElAdmin(event.currentTarget);

  const handleAdminClose = () => setAnchorElAdmin(null);

  const getLinkButtonCSS = (menu: NavMenu) =>
    isMatch(menu.url) ? clsx([classes.button, classes.selectedButton]) : classes.button;

  const renderUngroupedMenu = () => (
    <>
      {visibleMenus
        .filter((menu) => menu.group === undefined)
        .map((menu) => (
          <Link className={classes.linkButton} to={menu.url}>
            <Button className={getLinkButtonCSS(menu)}>{menu.text}</Button>
          </Link>
        ))}
    </>
  );

  const renderAdminMenu = () =>
    visibleMenus
      .filter((menu) => menu.group === MenuGroup.ADMIN)
      .map((menu) => (
        <Link className={classes.linkSubButton} to={menu.url}>
          <MenuItem onClick={handleAdminClose}>{menu.text}</MenuItem>
        </Link>
      ));

  return (
    <div>
      <AppBar color="inherit" className={classes.appBar}>
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" onClick={toggle}>
              <Icon className={classes.menuButton}>menu</Icon>
            </IconButton>
          )}
          {!onSearch && (
            <Link className={classes.link} to="/">
              <img src={logogram} height="32" alt="NataDanus Logo" />
              <img src={logotype} height="26" className={classes.logotype} alt="NataDanus" />
            </Link>
          )}
          {(isBrowser || onSearch) && <SearchBox onClose={() => setOnSearch(false)} />}
          {isMobile && !onSearch && <SearchIcon className={classes.searchIcon} onClick={() => setOnSearch(true)} />}
          {isBrowser && (
            <>
              {renderUngroupedMenu()}
              {isAdmin && (
                <div>
                  <Button className={classes.button} onClick={handleAdminMenu}>
                    Admin
                  </Button>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElAdmin}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={adminOpen}
                    onClose={handleAdminClose}
                  >
                    {renderAdminMenu()}
                  </Menu>
                </div>
              )}
              {isLoggedIn && (
                <>
                  <CartMenu /> <ProfileMenu menus={visibleMenus} />
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer open={open} toggle={toggle} menus={props.menus} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: isLoggedIn(state),
    isAdmin: isAdmin(state)
  };
};

const mapDispatchToProps = {
  onGetCartStatus: getCartStatus
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
