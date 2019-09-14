import React from "react";
import { connect } from "react-redux";
import { Typography, Grid, makeStyles, Button } from "@material-ui/core";

import Input from "../components/Input";
import { registerUser, UserRegistrationForm } from "../modules/api/user/registerAPI";

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

interface Props {
  registerUser: (userRegistrationForm: UserRegistrationForm) => Promise<void>;
}

const RegisterPage: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    university: "Universitas Indonesia",
    faculty: ""
  });

  const handleChange = (name: string) => (event: any) => {
    const { value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleRegister = () => {
    const { email, name, password, university, faculty } = state;
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
              label="confirm password"
              value={state.confirmPassword}
              onChange={handleChange("confirmPassword")}
            />
            <Input
              className={classes.paddingv}
              fullWidth
              label="universitas"
              value={state.university}
              onChange={handleChange("university")}
            />
            <Input
              className={classes.paddingv}
              fullWidth
              label="fakultas"
              value={state.faculty}
              onChange={handleChange("faculty")}
            />
            <Button onClick={handleRegister} className={classes.marginv} fullWidth variant="contained" color="inherit">
              Register
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapDispatchToProps = { registerUser };

const Register = connect(
  undefined,
  mapDispatchToProps
)(RegisterPage);

export default Register;
