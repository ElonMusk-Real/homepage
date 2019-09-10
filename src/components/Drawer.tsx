import React from "react";
import {
  Drawer as DrawerMUI,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

interface DrawerProps {
  open: boolean;
  toggle: () => void;
}

const menus = [
  { icon: "home", text: "Home", url: "/" },
  { icon: "home", text: "Order", url: "/" },
  { icon: "home", text: "Filter Snack", url: "/" },
  { icon: "home", text: "Merchant", url: "/" },
  { icon: "home", text: "About", url: "/" },
  { icon: "home", text: "Register", url: "/register" },
  { icon: "arrow_right_alt", text: "Login", url: "/login" },
  { icon: "person", text: "profile", url: "/profile" }
];

const useStyles = makeStyles({
  list: {
    width: 250
  }
});

const Drawer: React.FC<DrawerProps> = props => {
  const classes = useStyles();

  const ListMenu = (props: any) => {
    return (
      <Link to={props.url} style={{ textDecoration: "none", color: 'inherit' }}>
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

  return (
    <div>
      <DrawerMUI anchor="left" open={props.open} onClose={props.toggle}>
        {menus.map((menu, index) => {
          return <ListMenu key={index} icon={menu.icon} text={menu.text} url={menu.url} onClose={props.toggle}/>;
        })}
      </DrawerMUI>
    </div>
  );
};

export default Drawer;
