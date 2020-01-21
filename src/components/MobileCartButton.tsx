import React, { useState } from "react";
import { Button, makeStyles, Grid } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { connect } from "react-redux";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

import CartPaper from "./navbar/CartPaper";
import { CartState } from "../modules/cart/cartActions";
import { AppState } from "../modules/store";
import { getCart } from "../modules/cart/cartSelectors";

const useStyle = makeStyles({
  button: {
    backgroundColor: green[700],
    "&:hover": {
      backgroundColor: green[900]
    },
    color: "white",
    position: "fixed",
    bottom: 20,
    width: "calc(100vw - 80px)",
    zIndex: 999
  },
  menuButton: {
    color: "white"
  }
});

interface MobileCartButtonProps {
  cart: CartState;
}

const MobileCartButton = (props: MobileCartButtonProps) => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const cartData = props.cart.data;
  const totalBox = Object.keys(cartData).reduce((prev, id) => prev + cartData[id].quantity, 0);
  const totalPrice = Object.keys(cartData).reduce((prev, id) => prev + cartData[id].price * cartData[id].quantity, 0);

  return (
    <>
      {!open && totalBox > 0 && (
        <Button variant="contained" onClick={() => setOpen(true)} className={classes.button}>
          <Grid container alignContent="center" justify="space-between">
            <Grid>
              {totalBox} box | Rp. {totalPrice.toLocaleString()}
            </Grid>
            <Grid>
              <ShoppingBasketIcon className={classes.menuButton} />
            </Grid>
          </Grid>
        </Button>
      )}
      <CartPaper anchorRef={null} open={open} setOpen={setOpen} />
    </>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    cart: getCart(state)
  };
};

export default connect(mapStateToProps)(MobileCartButton);
