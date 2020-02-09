import React from "react";
import { makeStyles, Grid, Link } from "@material-ui/core";
import linkedin from "./../assets/linkedin.svg";
import line from "./../assets/line.svg";
import instagram from "./../assets/instagram.svg";

const useStyle = makeStyles({
  container: {
    backgroundColor: "#24303E",
    color: "white",
    width: "100%",
    padding: 12,
    textAlign: "center"
  },
  linkMenu: {
    fontSize: "1rem",
    color: "white"
  },
  wrapperMedsoc: {
    margin: "1rem auto"
  },
  icon: {
    width: "1.25rem",
    margin: ".75rem"
  }
});

const Footer = () => {
  const classes = useStyle();

  const mediaStyle = { height: "26px", width: "26px", marginLeft: "10px" };

  return (
    <div className={classes.container}>
      <Grid container direction="row" justify="space-between">
        <Grid item lg={6} xs={12}>
          <Link className={classes.linkMenu}href="/about">About</Link>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Link className={classes.linkMenu}href="/contacts">Contact Us</Link>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Link className={classes.linkMenu}href="#">Become A Merchant</Link>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Link className={classes.linkMenu}href="#">FAQ</Link>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Link className={classes.linkMenu}href="#">Terms & Conditions</Link>
        </Grid>
      </Grid>  
      <Grid container direction="row" justify="center" className={classes.wrapperMedsoc}>
        <a href="">
          <img className={classes.icon} src={line} alt="Line" />
        </a>        
        <a href="https://instagram.com/natadanus/">
          <img className={classes.icon} src={instagram} alt="Instagram" />
        </a> 
        <a href="https://www.linkedin.com/showcase/natadanus/about/">
          <img className={classes.icon} src={linkedin} alt="Linkedin" />
        </a>          
        {/* <SocialIcon style={mediaStyle} url="https://twitter.com/natadanus/" />
        <SocialIcon style={mediaStyle} url="https://facebook.com/natadanus/" />
        <SocialIcon style={mediaStyle} url="https://instagram.com/natadanus/" />
        <SocialIcon style={mediaStyle} url="https://www.linkedin.com/showcase/natadanus/about/" /> */}
      </Grid>
    </div>
  );
};

export default Footer;
