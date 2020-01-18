import React from "react";
import { IconButton, makeStyles, MenuItem, Menu } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AccountCircle } from "@material-ui/icons";
import { connect } from "react-redux";

import { NavMenu, MenuGroup } from "../../pages/App";
import { logout } from "../../modules/session/sessionAPI";

const useStyles = makeStyles({
  menuButton: {
    color: "white"
  },
  linkSubButton: {
    textDecorationLine: "none",
    color: "black"
  }
});

interface ProfileMenuProps {
  menus: NavMenu[];
  logout: () => void;
}

const ProfileMenu = (props: ProfileMenuProps) => {
  const { menus, logout } = props;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const profileOpen = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
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
        {menus
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
  );
};

const mapDispatchToProps = { logout };

export default connect(undefined, mapDispatchToProps)(ProfileMenu);
