import React from "react";
import { Grid, makeStyles, Button, ButtonGroup, Avatar } from "@material-ui/core";
import Input from "../components/Input";

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

interface Props {}

const Profile: React.FC<Props> = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (name: string) => (event: any) => {
    const { value } = event.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={11} md={6}>
          <Grid container justify="center">
            <div className={classes.avatarContainer}>
              <Avatar className={classes.avatar}>DH</Avatar>
            </div>
            <Input
              className={classes.paddingv}
              fullWidth
              label="email"
              value={state.email}
              onChange={handleChange("email")}
            />
            <Input
              className={classes.paddingv}
              fullWidth
              label="name"
              value={state.name}
              onChange={handleChange("name")}
            />
            <Input
              className={classes.paddingv}
              fullWidth
              label="password"
              value={state.password}
              onChange={handleChange("password")}
            />
            <Input
              className={classes.paddingv}
              fullWidth
              label="new password"
              value={state.confirmPassword}
              onChange={handleChange("confirmPassword")}
            />
            <Input
              className={classes.paddingv}
              fullWidth
              label="confirm new password"
              value={state.confirmPassword}
              onChange={handleChange("confirmPassword")}
            />
            <ButtonGroup className={classes.marginv} fullWidth variant="contained">
              <Button onClick={() => window.history.back()}>Cancel</Button>
              <Button color="primary">Save</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
