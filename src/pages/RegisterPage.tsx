import React from "react";
import { connect } from "react-redux";
import { Typography, Grid, makeStyles, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { red } from "@material-ui/core/colors";

import InputText from "../components/forms/InputText";
import { registerUser, UserRegistrationForm } from "../modules/api/usersAPI";
import { minLength, maxLength, isEmail } from "../modules/validation";
import Dropdown from "../components/forms/Dropdown";
import facultyList from "../assets/facultyList";

const useStyles = makeStyles({
  text: {
    padding: 30,
    fontWeight: "bold"
  },
  button: {
    backgroundColor: red[400],
    "&:hover": {
      backgroundColor: red[500]
    },
    color: "white",
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 6
  },
  loginLink: {
    color: red[500],
    textDecorationLine: "none"
  },
  haveAccount: {
    marginTop: 20
  }
});

interface RegisterPageProps {
  registerUser: (userRegistrationForm: UserRegistrationForm) => Promise<void>;
}

const RegisterPage = (props: RegisterPageProps) => {
  const { handleSubmit, ...form } = useForm();

  const classes = useStyles();

  const handleRegister = (data) => {
    const { email, name, password, university, faculty, lineId, phoneNumber } = data;
    const userRegistrationForm: UserRegistrationForm = {
      email,
      name,
      password,
      university,
      faculty,
      lineId,
      phoneNumber
    };
    props.registerUser(userRegistrationForm);
  };

  return (
    <Grid item xs={11} md={6}>
      <Grid container justify="center">
        <Typography variant="body1" className={classes.text} display="block">
          Register your email here to get our best offer
        </Typography>
        <form onSubmit={handleSubmit(handleRegister)}>
          <InputText
            name="email"
            fullWidth
            label="Email"
            form={form}
            validators={[minLength(5), maxLength(50), isEmail]}
          />
          <InputText name="name" fullWidth label="Name" form={form} validators={[minLength(3), maxLength(30)]} />
          <InputText
            name="password"
            fullWidth
            label="Password"
            password
            form={form}
            validators={[minLength(8), maxLength(16)]}
          />
          <InputText name="lineId" fullWidth label="Line ID" form={form} validators={[minLength(0), maxLength(20)]} />
          <InputText
            name="phoneNumber"
            fullWidth
            label="Phone Number"
            form={form}
            validators={[minLength(0), maxLength(20)]}
          />
          <Dropdown
            name="university"
            listMenu={{ "Universitas Indonesia": "Universitas Indonesia" }}
            label="University"
            form={form}
          />
          <Dropdown name="faculty" listMenu={facultyList} label="Faculty" form={form} />
          <Button type="submit" className={classes.button} fullWidth variant="contained" color="inherit">
            Register
          </Button>
        </form>
        <Typography className={classes.haveAccount}>
          Already have an account?{" "}
          <Link className={classes.loginLink} to="/login">
            Click here
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = { registerUser };

export default connect(undefined, mapDispatchToProps)(RegisterPage);
