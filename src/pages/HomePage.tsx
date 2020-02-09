import React from "react";
import { makeStyles, Grid, Button, ButtonGroup } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Icon from "@material-ui/core/Icon";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import { red } from "@material-ui/core/colors";
import cartImg from "./../assets/shopping-cart.svg";
import card from "./../assets/money.svg";
import fastfood from "./../assets/food.svg";
import pinpoint from "./../assets/pin.svg";
import produk1 from "./../assets/produk1.png";
import produk2 from "./../assets/produk2.png";
import produk3 from "./../assets/produk3.png";
import produk4 from "./../assets/produk4.png";
import produk5 from "./../assets/produk5.png";
import produk6 from "./../assets/produk6.png";
import produk7 from "./../assets/produk7.png";
import produk8 from "./../assets/produk8.png";
import like from "./../assets/like.svg";
import database from "./../assets/database.svg";
import sale from "./../assets/sale.svg";
import watch from "./../assets/watch.svg";
import star from "./../assets/star.svg";

// const bgImgUrl1 =
//   "https://sifu.unileversolutions.com/image/id-ID/recipe-topvisual/2/1260-709/donat-kentang-50321491.jpg";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const bgImgUrl1 = "https://images.unsplash.com/photo-1503485838016-53579610c389?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80";

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
    height: "100vh",
    filter: "brightness(100%)",
    backgroundImage: "url(" + bgImgUrl1 + ")",
    backgroundSize: "cover",
    "&::before": {
      content: `''`,
      position: "absolute",
      width: "100%",
      top: 0,
      height: "100%",
      background: "linear-gradient(#0000008a, #0e101f6b)"
    }
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
    fontFamily: "Roboto",
    // fontFamily: "Rounded Mplus 1c Bold",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: isMobile ? "2.2rem" : "48px",
    textAlign: "center",
    lineHeight: "normal",
    color: "#FFFFFF",
    position: "relative"
  },
  desc: {
    marginTop: 8,
    textAlign: "center",
    // fontFamily: "Rounded Mplus 1c Bold",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: isMobile ? "14px" : "18px",
    color: "#fffffff2",
    position: "relative",
    margin: "0 2.75rem"
  },
  loginButton: {
    borderColor: "#e73261",
    backgroundColor: "white",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#e73261",
      color: "white"
    }
  },
  registerButton: {
    marginRight: 20,
    backgroundColor: "#e73261",
    color: "white",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#e73261"
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
  titleHow: {
    fontWeight: 800,
    color: "black",
    textAlign: "center",
    // "&::after": {
    //   content: `''`,
    //   position: "absolute",
    //   backgroundColor: "#e73261",
    //   height: "2px",
    //   width: "15%",
    //   top: "116%",
    //   left: "42%"
    // }
  },
  titleProcedure: {
    fontWeight: "bold",
    marginTop: ".25rem"
  },
  subtitleProcedure: {
    margin: "0 .75rem"
  },
  orderFood: {
    height: "50vh",
    background: "linear-gradient(90deg, #E73361 0%, #9A1675 100%)"
  },
  titleOrder: {
    fontWeight: 800,
    color: "white",
    // "&::after": {
    //   content: `''`,
    //   position: "absolute",
    //   backgroundColor: "white",
    //   height: "2px",
    //   width: "15%",
    //   top: "207.5%",
    //   left: "42%"
    // }
  },
  wrapperFoods: {
    margin: "0 .75rem",
    textAlign: "center"
  },
  iconFoods: {
    borderRadius: "100px"
  },
  buttonMore: {
    backgroundColor: "#ffffff47",
    color: "#ffffff",
    fontWeight: 400,
    border: "1px solid #fafafa",
    margin: "1rem 0 2rem"
  },
  bestFeatures: {
    backgroundColor: "white"
  },
  info: {
    color: "black",
    margin: "0 2rem"
  },
  wrapperFeatures: {
    margin: "1rem 2rem"
  },
  iconTitle: {
    margin: 0,
    padding: 0,
    textAlign: "center"
  },
  iconFeatures: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "1rem auto"
  }
});

const HomePage = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container direction="column" justify="center" alignItems="center" className={classes.box}>
        <Grid className={classes.title}>Pesan snack box sekarang!</Grid>
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
          <h2 className={classes.titleHow}>How to Order</h2>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center" className={classes.howTo}>
          <Grid sm={6} className={classes.howToItem} container direction="column" justify="center" alignItems="center">
            <img src={fastfood} height={40} alt="" />
            <Grid className={classes.titleProcedure}>Pilih Jenis Makanan</Grid>
            <Grid className={classes.subtitleProcedure}>Pilih box danusanmu sesuai dengan kesukaanmu!</Grid>
          </Grid>
          <Grid sm={6} className={classes.howToItem} container direction="column" justify="center" alignItems="center">
            <img src={cartImg} height={40} alt="" />
            <Grid className={classes.titleProcedure}>Pilih Jumlah Box dan Lokasi</Grid>
            <Grid className={classes.subtitleProcedure}>Tentukan jumlah dan lokasi penjemputan danusmu</Grid>
          </Grid>
          <Grid sm={6} className={classes.howToItem} container direction="column" justify="center" alignItems="center">
            <img src={card} height={40} alt="" />
            <Grid className={classes.titleProcedure}>Pilih Cara Pembayaran</Grid>
            <Grid className={classes.subtitleProcedure}>Gunakan OVO, Gopay, Dana m-banking, dan transfer atm</Grid>
          </Grid>
          <Grid sm={6} className={classes.howToItem} container direction="column" justify="center" alignItems="center">
            <img src={pinpoint} height={40} alt="" />
            <Grid className={classes.titleProcedure}> Ambil Barang</Grid>
            <Grid className={classes.subtitleProcedure}>Ambil barang sesuai lokasi dan jam yang sudah ditentukan</Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container justify="center" className={classes.orderFood}>
        <Grid item>
          <h2 className={classes.titleOrder}>Order Your Food!</h2>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center" className={classes.wrapperFoods}>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={3}>
              <img className={classes.iconFoods} src={produk1} height={64} alt="" />
            </Grid>
            <Grid item xs={3}>
            <img className={classes.iconFoods} src={produk2} height={64} alt="" />
            </Grid>
            <Grid item xs={3}>
            <img className={classes.iconFoods} src={produk3} height={64} alt="" />
            </Grid>
            <Grid item xs={3}>
            <img className={classes.iconFoods} src={produk4} height={64} alt="" />
            </Grid>          
          </Grid>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={3}>
            <img className={classes.iconFoods} src={produk5} height={64} alt="" />
            </Grid>
            <Grid item xs={3}>
            <img className={classes.iconFoods} src={produk6} height={64} alt="" />
            </Grid>
            <Grid item xs={3}>
            <img className={classes.iconFoods} src={produk7} height={64} alt="" />
            </Grid>
            <Grid item xs={3}>
            <img className={classes.iconFoods} src={produk8} height={64} alt="" />              
            </Grid>          
          </Grid>
          <Button variant="outlined" className={classes.buttonMore}>More</Button>
        </Grid>
      </Grid>


      <Grid container justify="center" alignItems="center" className={classes.bestFeatures}>
        <Grid item>
          <h2 className={classes.titleHow}>Empowering students through entrepreneurship!</h2>
          <p className={classes.info}>We’re trying to solve a student business fund (dana usaha) problems based on market validation that we found at Universitas Indonesia. We tackle those problems through providing best features on our platform and hope it could empower student and seller in doing the business.</p>
        </Grid>
        
        <Grid container justify="center" className={classes.wrapperFeatures}>
          <Grid item xs={4}>
            <img className={classes.iconFeatures} src={fastfood} height={45} alt="" />
            <h5 className={classes.iconTitle}>Various Snack</h5>
          </Grid>
          <Grid item xs={4}>
            <img className={classes.iconFeatures} src={star} height={40} alt="" />
            <h5 className={classes.iconTitle}>Star Seller</h5>
          </Grid>
          <Grid item xs={4}>
            <img className={classes.iconFeatures} src={watch} height={40} alt="" />
            <h5 className={classes.iconTitle}>Real Time Order</h5>
          </Grid>
        </Grid>
        <Grid container justify="center"  className={classes.wrapperFeatures}>
          <Grid item xs={4}>
            <img className={classes.iconFeatures} src={sale} height={40} alt="" />
            <h5 className={classes.iconTitle}>Discounts and Points</h5>
          </Grid>
          <Grid item xs={4}>
            <img className={classes.iconFeatures} src={database} height={40} alt="" />
            <h5 className={classes.iconTitle}>Big Data-base</h5>
          </Grid>
          <Grid item xs={4}>
            <img className={classes.iconFeatures} src={like} height={40} alt="" />
            <h5 className={classes.iconTitle}>Easy to Pay</h5>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
