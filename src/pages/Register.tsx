import React from "react";
import { Typography, Grid, makeStyles, Button } from "@material-ui/core";
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

const Register: React.FC<Props> = () => {
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
            <Typography
              variant="body1"
              className={classes.text}
              display="block"
            >
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
            <Button
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

export default Register;
