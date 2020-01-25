import React from "react";
import { makeStyles, Grid, Button, ButtonGroup } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Icon from '@material-ui/core/Icon';

const bgImgUrl1 =
  "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80";


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
    overflow: "hidden"
  },
  marginh: {
    marginRight: 3,
    marginLeft: 3
  }
});

const HomePage = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={12}>
      <Grid container justify="center">
        <div className={classes.bgImage1}>
          <section className={classes.hero}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              style={{ height: "100%", marginLeft: "2rem", marginRight: "2rem", color: "white" }}
            >
              <h2>Pesan box danus sekarang!</h2>
              <p>
                NATADANUS, platform danusan yang menghubungkan para penjual box danus dengan mahasiswa sebagai
                distributor yang lebih murah dan enak!
              </p>
            </Box>
          </section>
        </div>

        <section>
          <Box display="flex" justifyContent="center">
            <h3>Log in to NATA Danus with:</h3>
          </Box>
          <ButtonGroup className={classes.marginv} fullWidth variant="contained">
            <Button color="primary" className={classes.marginh}>
              Register
            </Button>
            <Button color="primary" className={classes.marginh}>
              Log In
            </Button>
          </ButtonGroup>
        </section>
      </Grid>

      <Grid container justify="center">
        <section>
          <Grid item>
            <h2>How to Order</h2>
          </Grid>
          <Box>
            <Grid container>
              <Grid item xs={6}>
                <Icon>fastfood_outlined</Icon>
                <h5>Pilih jenis makanan</h5>
                <p>
                  Pilih box danusanmu sesuai dengan kesukaanmu!
                </p>
              </Grid>
              <Grid item xs={6}>
                <Icon>shopping_cart_outlined</Icon>
                <h5>Pilih jumlah box dan lokasi</h5>
                <p>
                  Tentukan jumlah dan lokasi penjemputan danusmu
                </p>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Icon>credit_card_outlined</Icon>
                <h5>Pilih cara pembayaran</h5>
                <p>
                  Gunakan OVO, Gopay, Dana m-banking, dan transfer atm
                </p>
              </Grid>
              <Grid item xs={6}>
                <Icon>pin_drop_outlined</Icon>
                <h5>Ambil barang</h5>
                <p>
                  Ambil barang sesuai lokasi dan jam yang sudah ditentukan
                </p>
              </Grid>
            </Grid>
          </Box>
        </section>
      </Grid>

      <Grid container justify="center">
        <section>
          <Grid item>
            <h2>Best Features</h2>
          </Grid>
          <Box>
            <Grid container>
              <Grid item xs={4}>
                <Icon>cake_outlined</Icon>
                <h5>Various Snack</h5>
              </Grid>
              <Grid item xs={4}>
                <Icon>store_mall_directory_outlined</Icon>
                <h5>Star Seller</h5>
              </Grid>
              <Grid item xs={4}>
                <Icon>schedule_outlined</Icon>
                <h5>Real Time Order</h5>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                <Icon>loyalty_outlined</Icon>
                <h5>Discounts and Points</h5>
              </Grid>
              <Grid item xs={4}>
                <Icon>room_outlined</Icon>
                <h5>Near Me Seller</h5>
              </Grid>
              <Grid item xs={4}>
                <Icon>account_balance_wallet_outlined</Icon>
                <h5>Easy to Pay</h5>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Icon>tab_outlined</Icon>
              <h5>Big Data-base</h5>
            </Grid>
          </Box>
        </section>
      </Grid>

      <Grid container justify="center">
        <section>
          <Grid container xs={9}>
            <p>
              "Berkat nata danus omzet saya stonk, meningkat tajim"
            </p>
            <p>Bapak Ngatemin, Penjual Basreng</p>
          </Grid>
          <Grid item xs={3}></Grid>
        </section>
      </Grid>

    </Grid>
  );
};

export default HomePage;
