import React from "react";
import { Drawer as DrawerMUI, List, ListItem, ListItemIcon, ListItemText, Icon, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { isLoggedIn } from "../modules/session/sessionSelectors";

const useStyles = makeStyles({
  list: {
    width: 250
  }
});

export interface Menu {
  icon: string;
  text: string;
  url: string;
  needLogin: boolean;
  adminOnly: boolean;
}

export interface DrawerProps {
  open: boolean;
  toggle: () => void;
  isLoggedIn: boolean;
  menus: Menu[];
}

const Drawer = (props: DrawerProps) => {
  const classes = useStyles();

  const ListMenu = (props: any) => {
    return (
      <Link to={props.url} style={{ textDecoration: "none", color: "inherit" }}>
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
      .filter((menu) => !menu.needLogin || props.isLoggedIn)
      .map((menu, index) => (
        <ListMenu key={index} icon={menu.icon} text={menu.text} url={menu.url} onClose={props.toggle} />
      ));
  };

  return (
    <div>
      <DrawerMUI anchor="left" open={props.open} onClose={props.toggle}>
        {renderMenu()}
      </DrawerMUI>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: isLoggedIn(state)
  };
};

export default connect(mapStateToProps)(Drawer);
