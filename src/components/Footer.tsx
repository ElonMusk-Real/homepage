import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { SocialIcon } from "react-social-icons";

const useStyle = makeStyles({
  container: {
    marginTop: 20,
    backgroundColor: "black",
    color: "white",
    width: "100%",
    padding: 12
  },
  socialIcon: {
    height: 12
  }
});

const Footer = () => {
  const classes = useStyle();

  const mediaStyle = { height: "26px", width: "26px", marginLeft: "10px" };

  return (
    <div className={classes.container}>
      <Grid container direction="row" justify="space-between">
        <Grid>About | Contact Us | Become A Merchant | FaQ | Terms & Conditions</Grid>
        <Grid>
          <SocialIcon style={mediaStyle} url="https://twitter.com/natadanus/" />
          <SocialIcon style={mediaStyle} url="https://facebook.com/natadanus/" />
          <SocialIcon style={mediaStyle} url="https://instagram.com/natadanus/" />
          <SocialIcon style={mediaStyle} url="https://www.linkedin.com/showcase/natadanus/about/" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
