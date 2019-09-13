import React from "react";
import { AppBar, Toolbar, IconButton, Icon, Typography, makeStyles } from "@material-ui/core";
import Drawer from "./Drawer";

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: "transparent"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

interface NavBarProps {
  title: string;
}

const Navbar: React.FC<NavBarProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <AppBar color="inherit" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5">{props.title}</Typography>
          <IconButton onClick={toggle}>
            <Icon>menu</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={open} toggle={toggle} />
    </div>
  );
};

export default Navbar;
