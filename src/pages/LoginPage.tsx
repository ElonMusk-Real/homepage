import React from "react";
import { Typography, Grid, makeStyles, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { red } from "@material-ui/core/colors";
import { Link } from "react-router-dom";

import InputText from "../components/forms/InputText";
import { loginUser } from "../modules/api/usersAPI";

const useStyles = makeStyles({
  text: {
    padding: 48,
    fontWeight: "bold"
  },
  link: {
    color: red[500],
    textDecorationLine: "none"
  },
  needAccount: {
    marginTop: 20
  },
  button: {
    backgroundColor: red[400],
    "&:hover": {
      backgroundColor: red[500]
    },
    color: "white",
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 6
  }
});

interface LoginPageProps {
  loginUser: (email: string, password: string) => Promise<void>;
}

const LoginPage = (props: LoginPageProps) => {
  const classes = useStyles();
  const { handleSubmit, ...form } = useForm();

  const handleLogin = (data) => {
    const { email, password } = data;
    props.loginUser(email, password);
  };

  return (
    <Grid item xs={11} md={6}>
      <Grid container justify="center" direction="column">
        <Grid container justify="center">
          <Typography variant="body1" className={classes.text} display="block">
            Log in to your account
          </Typography>
        </Grid>
        <Grid>
          <form onSubmit={handleSubmit(handleLogin)}>
            <InputText fullWidth name="email" label="email" form={form} />
            <InputText fullWidth name="password" password label="password" form={form} />
            <Button type="submit" className={classes.button} fullWidth variant="contained">
              Login
            </Button>
          </form>
        </Grid>
        <Grid container justify="center">
          <Typography className={classes.needAccount}>
            Need an account?{" "}
            <Link className={classes.link} to="/register">
              Click here
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = { loginUser };

export default connect(undefined, mapDispatchToProps)(LoginPage);
