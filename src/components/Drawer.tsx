import React from "react";
import { Drawer as DrawerMUI, List, ListItem, ListItemIcon, ListItemText, Icon, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

interface DrawerProps {
  open: boolean;
  toggle: () => void;
}

const menus = [
  { icon: "home", text: "Home", url: "/" },
  { icon: "view_module", text: "Product List", url: "/productlist" },
  { icon: "library_books", text: "Order", url: "/" },
  { icon: "person", text: "Profile", url: "/profile" },
  { icon: "double_arrow", text: "Login", url: "/login" },
  { icon: "add_circle", text: "Register", url: "/register" },
  { icon: "info", text: "About", url: "/" }
];

const useStyles = makeStyles({
  list: {
    width: 250
  }
});

const Drawer: React.FC<DrawerProps> = (props) => {
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

  return (
    <div>
      <DrawerMUI anchor="left" open={props.open} onClose={props.toggle}>
        {menus.map((menu, index) => {
          return <ListMenu key={index} icon={menu.icon} text={menu.text} url={menu.url} onClose={props.toggle} />;
        })}
      </DrawerMUI>
    </div>
  );
};

export default Drawer;
