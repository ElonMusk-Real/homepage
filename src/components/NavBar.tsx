import React from "react";
import { AppBar, Toolbar, IconButton, Icon, makeStyles, Button, MenuItem, Menu } from "@material-ui/core";
import { Link } from "react-router-dom";
import { red } from "@material-ui/core/colors";
import { AccountCircle } from "@material-ui/icons";
import { isBrowser, isMobile } from "react-device-detect";

import Drawer from "./Drawer";
import logogram from "./../assets/logogram.png";
import logotype from "./../assets/logotype-white.png";
import { NavMenu, MenuGroup } from "../pages/App";
import { isAdmin, isLoggedIn } from "../modules/session/sessionSelectors";
import { logout } from "../modules/session/sessionAPI";
import { connect } from "react-redux";

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
  }
});

interface NavBarProps {
  menus: NavMenu[];
  isLoggedIn: boolean;
  isAdmin: boolean;
  logout: () => void;
}

const Navbar = (props: NavBarProps) => {
  const { menus, isLoggedIn, isAdmin, logout } = props;
  const classes = useStyles();

  const visibleMenus = menus
    .filter((menu) => !(menu.userOnly && !isLoggedIn))
    .filter((menu) => !(menu.guestOnly && isLoggedIn))
    .filter((menu) => !(menu.adminOnly && !isAdmin))
    .filter((menu) => !menu.hideFromMenu);

  const [open, setOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const profileOpen = Boolean(anchorEl);

  const [anchorElAdmin, setAnchorElAdmin] = React.useState<null | HTMLElement>(null);
  const adminOpen = Boolean(anchorElAdmin);

  const toggle = () => {
    setOpen(!open);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdminMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAdmin(event.currentTarget);
  };

  const handleAdminClose = () => {
    setAnchorElAdmin(null);
  };

  const renderUngroupedMenu = () =>
    visibleMenus
      .filter((menu) => menu.group === undefined)
      .map((menu) => (
        <Link className={classes.linkButton} to={menu.url}>
          <Button className={classes.button}>{menu.text}</Button>
        </Link>
      ));

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
          <Link className={classes.link} to="/">
            <img src={logogram} height="32" />
            <img src={logotype} height="26" className={classes.logotype} />
          </Link>
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
                <div>
                  <IconButton
                    className={classes.menuButton}
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={profileOpen}
                    onClose={handleClose}
                  >
                    {visibleMenus
                      .filter((menu) => menu.group === MenuGroup.PROFILE)
                      .map((menu) => (
                        <Link className={classes.linkSubButton} to={menu.url}>
                          <MenuItem onClick={handleClose}>{menu.text}</MenuItem>
                        </Link>
                      ))}
                    <MenuItem
                      onClick={() => {
                        logout();
                        handleClose();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
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

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
