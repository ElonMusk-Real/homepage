import React from "react";
import { Drawer as DrawerMUI, List, ListItem, ListItemIcon, ListItemText, Icon, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { isLoggedIn, isAdmin } from "../modules/session/sessionSelectors";
import { logout } from "../modules/session/sessionAPI";

const useStyles = makeStyles({
  list: {
    width: 250
  }
});

export interface Menu {
  icon: string;
  text: string;
  url: string;
  userOnly?: boolean;
  guestOnly?: boolean;
  adminOnly?: boolean;
}

export interface DrawerProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  logout: () => void;
  open: boolean;
  toggle: () => void;
  menus: Menu[];
}

const Drawer = (props: DrawerProps) => {
  const classes = useStyles();

  const ListMenu = (props: any) => {
    return (
      <Link to={props.url} onClick={props.onClick} style={{ textDecoration: "none", color: "inherit" }}>
        <div className={classes.list}>
          <List>
            <ListItem button onClick={props.onClose}>
              <ListItemIcon>
                <Icon>{props.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={props.text} />
            </ListItem>
          </List>
        </div>
      </Link>
    );
  };

  const renderMenu = () => {
    return props.menus
      .filter((menu) => !(menu.userOnly && !props.isLoggedIn))
      .filter((menu) => !(menu.guestOnly && props.isLoggedIn))
      .filter((menu) => !(menu.adminOnly && !props.isAdmin))
      .map((menu, index) => (
        <ListMenu key={index} icon={menu.icon} text={menu.text} url={menu.url} onClose={props.toggle} />
      ));
  };

  return (
    <div>
      <DrawerMUI anchor="left" open={props.open} onClose={props.toggle}>
        {renderMenu()}
        {props.isLoggedIn && (
          <ListMenu icon={"exit_to_app"} text="Log out" onClick={props.logout} onClose={props.toggle} />
        )}
      </DrawerMUI>
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

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
