import React from "react";
import { makeStyles, Grid, Button, ButtonGroup } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Icon from "@material-ui/core/Icon";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import { red } from "@material-ui/core/colors";
import cartImg from "./../assets/cart.jpg";
import card from "./../assets/card.jpg";
import fastfood from "./../assets/fastfood.jpg";
import pinpoint from "./../assets/pinpoint.jpg";
import burger from "./../assets/burger.png";
import store from "./../assets/store.png";
import schedule from "./../assets/schedule.png";
import tag from "./../assets/tag.png";
import wallet from "./../assets/wallet.png";
import tab from "./../assets/tab.png";

const bgImgUrl1 =
  "https://sifu.unileversolutions.com/image/id-ID/recipe-topvisual/2/1260-709/donat-kentang-50321491.jpg";

const bgImgUrl2 = "https://www.biggerbolderbaking.com/wp-content/uploads/2018/05/NO-yeast-Homemade-donuts-FINAL.jpg";

const useStyles = makeStyles({
  marginv: {
    marginTop: 6,
    marginBottom: 6
  },
  hero: {
    height: 400
  },
  bgImage1: {
    backgroundImage: "url(" + bgImgUrl1 + ")",
    backgroundSize: "cover",
    overflow: "hidden",
    paddingTop: 50,
    paddingBottom: 50,
    width: "100%",
    minHeight: "35vh",
    filter: "brightness(50%)",
    position: "absolute"
  },
  box: {
    overflow: "hidden",
    paddingTop: 30,
    paddingBottom: 50,
    width: "100%",
    minHeight: "35vh",
    filter: "brightness(100%)"
  },
  bgImage2: {
    backgroundImage: "url(" + bgImgUrl2 + ")",
    backgroundSize: "cover",
    overflow: "hidden",
    filter: "brightness(75%)"
  },
  marginh: {
    marginRight: 3,
    marginLeft: 3
  },
  title: {
    fontFamily: "Rounded Mplus 1c Bold",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: isMobile ? "24px" : "48px",
    color: "#FFFFFF"
  },
  desc: {
    marginTop: 8,
    textAlign: "center",
    fontFamily: "Rounded Mplus 1c Bold",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: isMobile ? "12px" : "18px",
    color: "#FFFFFF"
  },
  loginButton: {
    borderColor: red[400],
    backgroundColor: "white",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: red[500],
      color: "white"
    }
  },
  registerButton: {
    marginRight: 20,
    backgroundColor: red[500],
    color: "white",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: red[600]
    }
  },
  howTo: {
    maxWidth: 900,
    padding: 25
  },
  howToItem: {
    marginBottom: 20,
    textAlign: "center"
  },
  link: {
    textDecorationLine: "none"
  },
  bold: {
    fontWeight: "bold"
  }
});

const HomePage = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.bgImage1}></div>
      <Grid container direction="column" justify="center" alignItems="center" className={classes.box}>
        <Grid className={classes.title}>Pesan box danus sekarang!</Grid>
        <Grid className={classes.desc}>
          NATADANUS, platform danusan yang menghubungkan para penjual box danus dengan mahasiswa sebagai distributor
          yang lebih murah dan variatif!
        </Grid>
        <Grid style={{ marginTop: 20 }}>
          <Link to="/register" className={classes.link}>
            <Button variant="outlined" className={classes.registerButton}>
              Register
            </Button>
          </Link>
          <Link to="/login" className={classes.link}>
            <Button variant="contained" className={classes.loginButton}>
              Log In
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <h2>How to Order</h2>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center" className={classes.howTo}>
          <Grid sm={6} className={classes.howToItem} container direction="column" justify="center" alignItems="center">
            <img src={fastfood} height={64} alt="" />
            <Grid className={classes.bold}>Pilih jenis makanan</Grid>
            <Grid>Pilih box danusanmu sesuai dengan kesukaanmu!</Grid>
          </Grid>
          <Grid sm={6} className={classes.howToItem} container direction="column" justify="center" alignItems="center">
            <img src={cartImg} height={64} alt="" />
            <Grid className={classes.bold}>Pilih jumlah box dan lokasi</Grid>
            <Grid>Tentukan jumlah dan lokasi penjemputan danusmu</Grid>
          </Grid>
          <Grid sm={6} className={classes.howToItem} container direction="column" justify="center" alignItems="center">
            <img src={card} height={64} alt="" />
            <Grid className={classes.bold}>Pilih cara pembayaran</Grid>
            <Grid>Gunakan OVO, Gopay, Dana m-banking, dan transfer atm</Grid>
          </Grid>
          <Grid sm={6} className={classes.howToItem} container direction="column" justify="center" alignItems="center">
            <img src={pinpoint} height={64} alt="" />
            <Grid className={classes.bold}> Ambil barang</Grid>
            <Grid>Ambil barang sesuai lokasi dan jam yang sudah ditentukan</Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container justify="center" className={classes.bgImage2} style={{ color: "#FFFFff" }}>
        <Grid item>
          <h2>Best Features</h2>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={4}>
            <img src={burger} height={64} alt="" />
            <h5>Various Snack</h5>
          </Grid>
          <Grid item xs={4}>
            <img src={store} height={64} alt="" />
            <h5>Star Seller</h5>
          </Grid>
          <Grid item xs={4}>
            <img src={schedule} height={64} alt="" />
            <h5>Real Time Order</h5>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <img src={tag} height={64} alt="" />
            <h5>Discounts and Points</h5>
          </Grid>
          <Grid item xs={4}>
            <img src={tab} height={64} alt="" />
            <h5>Big Data-base</h5>
          </Grid>
          <Grid item xs={4}>
            <img src={wallet} height={64} alt="" />
            <h5>Easy to Pay</h5>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
