import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    paddingTop: 64
  }
});

interface Props {}

const Home: React.FC<Props> = () => {
  const classes = useStyles();
  return <div className={classes.container}>Home Page</div>;
};

export default Home;
