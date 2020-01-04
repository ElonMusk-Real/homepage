import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Avatar, Button } from "@material-ui/core";
import { connect } from "react-redux";

import { getMyProfile, Profile } from "../modules/api/user/myProfileAPI";
import { logout } from "../modules/session/sessionAPI";

const useStyles = makeStyles({
  container: {
    backgroundColor: "#F8EAEA",
    minHeight: "100vh",
    paddingTop: 64
  },
  debug: {
    border: "1px solid black"
  },
  text: {
    padding: 48
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  avatarContainer: {
    padding: 20
  },
  paddingv: {
    paddingTop: 6,
    paddingBottom: 6
  },
  marginv: {
    marginTop: 6,
    marginBottom: 6
  }
});

interface ProfilePageProps {
  getMyProfile: () => Promise<Profile>;
  logout: () => void;
}

const ProfilePage = (props: ProfilePageProps) => {
  const classes = useStyles();
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    props.getMyProfile().then(setProfile);
  }, []);

  return (
    <div className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={11} md={6}>
          <Grid container justify="center">
            <div className={classes.avatarContainer}>
              <Avatar className={classes.avatar}>DH</Avatar>
            </div>
            {profile && profile.name}
            <Button onClick={props.logout}>Logout</Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapDispatchToProps = { getMyProfile, logout };

export default connect(undefined, mapDispatchToProps)(ProfilePage);
