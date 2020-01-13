import React from "react";
import { Typography, Grid, makeStyles, Button } from "@material-ui/core";

import InputText from "../components/forms/InputText";
import { loginUser } from "../modules/api/usersAPI";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

const useStyles = makeStyles({
  text: {
    padding: 48
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
      <Grid container justify="center">
        <Typography variant="body1" className={classes.text} display="block">
          Log In to Your Account
        </Typography>
        <form onSubmit={handleSubmit(handleLogin)}>
          <InputText className={classes.paddingv} fullWidth name="email" label="email" form={form} />
          <InputText className={classes.paddingv} fullWidth name="password" password label="password" form={form} />
          <Button type="submit" className={classes.marginv} fullWidth variant="contained" color="inherit">
            Login
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = { loginUser };

export default connect(undefined, mapDispatchToProps)(LoginPage);
