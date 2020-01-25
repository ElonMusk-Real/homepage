import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import boxcrate from "./../assets/boxcrate.png";
import phone from "./../assets/phone.png";
import motorcycle from "./../assets/motorcycle.png";
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
    topbox: {
      paddingTop: 50,
      width: "100%",
      minHeight: "35vh",
      background: "linear-gradient(90deg, #E73361 0%, #9A1675 100%)"
    },
    aboutus: {
      marginBottom: 20,
      textAlign: "center",
      fontFamily: "Rounded Mplus 1c Bold",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "48px",
      lineHeight: "36px",
      color: "#FFFFFF"
    },
    description: {
      textAlign: "center",
      marginTop: "1vh",
      marginLeft: "10vw",
      marginRight: "10vw",
      fontFamily: "Rounded Mplus 1c Bold",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: isMobile ? "14px" : "18px",
      color: "#FFFFFF"
    },
    boxcrate: {
      marginTop: "10vh",
      marginLeft: 100,
      marginRight: 100,
      height: 100
    },
    boxcratetxt: {
      marginLeft: 20,
      marginRight: 20,
      textAlign: "center",
      fontFamily: "Rounded Mplus 1c Bold",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "18px",
      color: "#000000"
    },
    phone: {
      marginTop: "10vh",
      marginLeft: 100,
      marginRight: 100,
      height: 100
    },
    phonetxt: {
      marginLeft: 20,
      marginRight: 20,
      textAlign: "center",
      fontFamily: "Rounded Mplus 1c Bold",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "18px",
      color: "#000000"
    },
    motorcycle: {
      marginTop: "10vh",
      marginLeft: 100,
      marginRight: 100,
      height: 100
    },
    motorcycletxt: {
      marginLeft: 20,
      marginRight: 20,
      textAlign: "center",
      fontFamily: "Rounded Mplus 1c Bold",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "18px",
      color: "#000000"
    },
    foot: {
      textAlign: "center",
      marginTop: 50
    }
  })
);

const AboutPage = () => {
  const classes = useStyles();

  return (
    <>
      <Grid className={classes.topbox}>
        <Grid className={classes.aboutus} direction="row" justify="center" alignItems="center">
          ABOUT US
        </Grid>

        <Grid className={classes.description}>
          NATA DANUS adalah platform untuk danusanmu yang lebih murah, variatif, dan enak.
        </Grid>
      </Grid>
      <Grid className={classes.container} container direction="row" justify="center" alignItems="center">
        <Grid sm={4} container direction="row" justify="center" alignItems="center">
          <img src={boxcrate} className={classes.boxcrate} alt="" />
          <p className={classes.boxcratetxt}>
            NATA DANUS, menyediakan berbagai varian anti-mainstream jajanan danusmu. Lebih dari 100 jenis jajanan kami
            sediakan. Dengan data base yang besar dan merchant pilihan.
          </p>
        </Grid>
        <Grid sm={4} container direction="row" justify="center" alignItems="center">
          <img src={phone} className={classes.phone} alt="" />
          <p className={classes.phonetxt}>
            NATA DANUS, menawarkan pembayaran melalui Go-Pay, OVO, M-Banking, dan Transfer ATM. Pembeli boks danusan
            tidak perlu lagi repot dan tinggal menggunakan gawai kamu.
          </p>
        </Grid>

        <Grid sm={4} container direction="row" justify="center" alignItems="center">
          <img src={motorcycle} className={classes.motorcycle} alt="" />
          <p className={classes.motorcycletxt}>
            Kami akan mengantarkan boks danusmu tepat di tempat yang sudah kamu tentukan, kami memberikan pelayanan
            gratis untuk pengantaran boks danus jumlah berapapun.
          </p>
        </Grid>
      </Grid>
    </>
  );
};

export default AboutPage;
