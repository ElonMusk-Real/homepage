import React from "react";
import { AppBar, Toolbar, IconButton, Icon, Typography, makeStyles } from "@material-ui/core";

import Drawer, { Menu } from "./Drawer";

const useStyles = makeStyles((theme) => {
  return {
    title: {
      flexGrow: 1
    }
  };
});

interface NavBarProps {
  title: string;
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
      <AppBar color="inherit">
        <Toolbar>
          <IconButton edge="start" onClick={toggle}>
            <Icon>menu</Icon>
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={open} toggle={toggle} menus={props.menus} />
    </div>
  );
};

export default Navbar;
