import React from "react";
import { Typography, Grid, makeStyles, Button, ButtonGroup, Avatar } from "@material-ui/core";
import Input from "../components/Input";
import { Link } from "react-router-dom";

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
            <Input fullWidth label="email" value={state.email} onChange={handleChange("email")} />
            <Input fullWidth label="name" value={state.name} onChange={handleChange("name")} />
            <Input fullWidth label="password" value={state.password} onChange={handleChange("password")} />
            <Input
              fullWidth
              label="new password"
              value={state.confirmPassword}
              onChange={handleChange("confirmPassword")}
            />
            <Input
              fullWidth
              label="confirm new password"
              value={state.confirmPassword}
              onChange={handleChange("confirmPassword")}
            />
            <ButtonGroup fullWidth variant="contained">
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
