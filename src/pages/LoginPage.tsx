import React from "react";
import { Typography, Grid, makeStyles, Button } from "@material-ui/core";

import InputText from "../components/forms/InputText";
import { loginUser } from "../modules/api/user/loginAPI";
import { connect } from "react-redux";

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

interface LoginPageProps {
  loginUser: (email: string, password: string) => Promise<void>;
}

const LoginPage = (props: LoginPageProps) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });

  const handleChange = (name: string) => (event: any) => {
    const { value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleLogin = () => {
    const { email, password } = state;
    props.loginUser(email, password);
  };

  return (
    <div className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={11} md={6}>
          <Grid container justify="center">
            <Typography variant="body1" className={classes.text} display="block">
              Log In to Your Account
            </Typography>
            <form>
              {/* <InputText
                className={classes.paddingv}
                fullWidth
                label="email"
                value={state.email}
                onChange={handleChange("email")}
              />
              <InputText
                className={classes.paddingv}
                fullWidth
                label="password"
                value={state.password}
                onChange={handleChange("password")}
              /> */}
              <Button className={classes.marginv} fullWidth variant="contained" color="inherit" onClick={handleLogin}>
                Login
              </Button>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapDispatchToProps = { loginUser };

export default connect(undefined, mapDispatchToProps)(LoginPage);
