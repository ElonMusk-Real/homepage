import React from "react";
import { connect } from "react-redux";
import { Typography, Grid, makeStyles, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";

import InputText from "../components/forms/InputText";
import { registerUser, UserRegistrationForm } from "../modules/api/user/registerAPI";
import { minLength, maxLength, isEmail } from "../modules/validation";

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
  paddingv: {
    paddingTop: 6,
    paddingBottom: 6
  },
  marginv: {
    marginTop: 6,
    marginBottom: 6
  }
});

interface RegisterPageProps {
  registerUser: (userRegistrationForm: UserRegistrationForm) => Promise<void>;
}

const RegisterPage = (props: RegisterPageProps) => {
  const { handleSubmit, ...form } = useForm();

  const classes = useStyles();

  const handleRegister = (data) => {
    const { email, name, password, university, faculty } = data;
    const userRegistrationForm: UserRegistrationForm = { email, name, password, university, faculty };
    props.registerUser(userRegistrationForm);
  };

  return (
    <div className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={11} md={6}>
          <Grid container justify="center">
            <Typography variant="body1" className={classes.text} display="block">
              Register your email here to get our best offer
            </Typography>
            <InputText
              name="email"
              className={classes.paddingv}
              fullWidth
              label="email"
              form={form}
              validators={[minLength(3), maxLength(10), isEmail]}
            />
            <InputText
              name="name"
              className={classes.paddingv}
              fullWidth
              label="name"
              form={form}
              validators={[minLength(3), maxLength(10)]}
            />
            <InputText
              name="password"
              className={classes.paddingv}
              fullWidth
              label="password"
              password
              form={form}
              validators={[minLength(3), maxLength(10)]}
            />
            <Button
              onClick={handleSubmit(handleRegister)}
              className={classes.marginv}
              fullWidth
              variant="contained"
              color="inherit"
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapDispatchToProps = { registerUser };

export default connect(undefined, mapDispatchToProps)(RegisterPage);
