import React from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
    container: {
      margin: 100,
      width: "auto"
    }
  }),
);

const AboutPage = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.container} >
      {/* <div style={{ display: "block" }}> */}
      <p> Test</p>
      {/* </div> */}
    </Grid >
  );

};

export default AboutPage;
