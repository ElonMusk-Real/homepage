import React from "react";
import { Icon } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useForm } from "react-hook-form";
import { isMobile } from "react-device-detect";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      height: 140,
      width: 100
    },
    control: {
      padding: theme.spacing(2)
    },
    container: {
      margin: 20,
      width: "auto"
    },
    paddingv: {
      paddingTop: 6,
      paddingBottom: 6
    },
    marginv: {
      marginTop: 6,
      marginBottom: 6
    },
    paddingh: {
      paddingLeft: 20,
      paddingRight: 20
    },
    pinkbox: {
      paddingTop: 50,
      paddingBottom: 50,
      width: "100%",
      minHeight: "35vh",
      background: "linear-gradient(90deg, #E73361 0%, #9A1675 100%)"
    },
    contactus: {
      marginBottom: 20,
      fontFamily: "Rounded Mplus 1c Bold",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "48px",
      color: "#FFFFFF"
    },
    address: {
      textAlign: "center",
      marginTop: "1vh",
      marginLeft: "10vw",
      marginRight: "10vw",
      marginBottom: 20,
      fontFamily: "Rounded Mplus 1c Bold",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "18px",
      color: "#FFFFFF"
    },
    pesan: {
      marginTop: 25,
      marginBottom: 15,
      fontFamily: "Rounded Mplus 1c Bold",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "32px",
      textAlign: "center"
    },
    email: {
      marginLeft: 15,
      marginTop: 12,
      marginBottom: 12,
      fontFamily: "Rounded Mplus 1c Bold",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: isMobile ? "16px" : "26px",
      textAlign: "center",
      color: "#000000"
    }
  })
);

const ContactPage = () => {
  const { handleSubmit, ...form } = useForm();
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.pinkbox}>
        <Grid container direction="row" justify="center" alignItems="center" className={classes.contactus}>
          Contact Us
        </Grid>
        <Grid className={classes.address}>
          Jl. Masjid Al - Farouq No 45, Kukusan, Kecamatan Beji, Kota Depok, Jawa Barat 16425
        </Grid>
      </Grid>

      <Grid>
        <Grid>
          <Grid className={classes.pesan}>Tinggalkan Pesan</Grid>

          <Grid container direction="row" justify="center" alignItems="center">
            <Icon>email</Icon>
            <Grid className={classes.email}>
              <a href="mailto:cs@natadanus.com" style={{ color: "#000000" }}>
                cs@natadanus.com
              </a>
            </Grid>
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" height={25} alt="" />
            <Grid className={classes.email}>
              <a href="https://api.whatsapp.com/send?phone=+628561793835" style={{ color: "#000000" }}>
                08561793835
              </a>
            </Grid>
          </Grid>

          <Grid container direction="row" justify="center" alignItems="center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/1200px-LINE_logo.svg.png"
              height={25}
              alt=""
            />
            <Grid className={classes.email}>
              <a href="line://ti/p/@natadanus" style={{ color: "#000000" }}>
                @natadanus
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ContactPage;
