import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Icon,
  makeStyles,
  Button,
  MenuItem,
  Menu,
  Theme,
  createStyles,
  InputAdornment,
  InputBase
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { red } from "@material-ui/core/colors";
import { AccountCircle } from "@material-ui/icons";
import { isBrowser, isMobile } from "react-device-detect";
import { connect } from "react-redux";
import clsx from "clsx";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles";
import queryString from "query-string";

import Drawer from "./Drawer";
import logogram from "./../assets/logogram.png";
import logotype from "./../assets/logotype-white.png";
import { NavMenu, MenuGroup } from "../pages/App";
import { isAdmin, isLoggedIn } from "../modules/session/sessionSelectors";
import { logout } from "../modules/session/sessionAPI";
import { isArray } from "util";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.8),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.9)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
      }
    },
    clearSearchButton: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    inputAdornment: {
      width: 20,
      marginRight: 5
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 200
      }
    }
  })
);

interface NavBarProps extends RouteComponentProps<{}> {
  menus: NavMenu[];
  isLoggedIn: boolean;
  isAdmin: boolean;
  logout: () => void;
}

const Navbar = (props: NavBarProps) => {
  const { menus, isLoggedIn, isAdmin, logout } = props;
  const [searchText, setSearchText] = useState("");
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

  const isMatch = (menuURL: string) => props.location.pathname.split("/")[1] === menuURL.split("/")[1];

  const isQueryStringExists = !!queryString.parse(props.location.search).q;
  const isSnackPage = isMatch("/snacks");
  const isSnackSearchPage = isSnackPage && isQueryStringExists;

  useEffect(() => {
    const q = queryString.parse(props.location.search).q || "";
    setSearchText(isArray(q) ? q[0] : q);
  }, [props.location.pathname, props.location.search]);

  const toggle = () => {
    setOpen(!open);
  };

  const handleClearSearchText = () => {
    setSearchText("");
    props.history.push("/snacks");
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

  const getLinkButtonCSS = (menu: NavMenu) =>
    isMatch(menu.url) ? clsx([classes.button, classes.selectedButton]) : classes.button;

  const renderUngroupedMenu = () =>
    visibleMenus
      .filter((menu) => menu.group === undefined)
      .map((menu) => (
        <Link className={classes.linkButton} to={menu.url}>
          <Button className={getLinkButtonCSS(menu)}>{menu.text}</Button>
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      props.history.push(`/snacks?q=${searchText}`);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

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
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                onKeyDown={handleKeyDown}
                inputProps={{ "aria-label": "search" }}
                value={searchText}
                onChange={handleSearchChange}
                endAdornment={
                  isSnackSearchPage ? (
                    <InputAdornment className={classes.inputAdornment} position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleClearSearchText}>
                        <div className={classes.clearSearchButton}>
                          <ClearIcon />
                        </div>
                      </IconButton>
                    </InputAdornment>
                  ) : (
                    <InputAdornment className={classes.inputAdornment} position="end"></InputAdornment>
                  )
                }
              />
            </div>
          )}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
