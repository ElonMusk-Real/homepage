import React from "react";
import { AppBar, Toolbar, IconButton, Icon, makeStyles, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import Drawer, { Menu } from "./Drawer";

import logogram from "./../assets/logogram.png";
import logotype from "./../assets/logotype-white.png";

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
  }
});

interface NavBarProps {
  menus: Menu[];
}

const Navbar = (props: NavBarProps) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <AppBar color="inherit" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" onClick={toggle}>
            <Icon className={classes.menuButton}>menu</Icon>
          </IconButton>
          <Link to="/">
            <img src={logogram} height="32" />
            <img src={logotype} height="26" className={classes.logotype} />
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer open={open} toggle={toggle} menus={props.menus} />
    </div>
  );
};

export default Navbar;
