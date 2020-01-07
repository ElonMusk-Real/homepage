import React from "react";
import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    paddingTop: 64 + 20,
    paddingLeft: 20,
    width: "100%"
  }
});

const Container = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container justify="center">
        {props.children}
      </Grid>
    </div>
  );
};

export default Container;
