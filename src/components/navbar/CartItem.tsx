import React from "react";
import { Grid, Divider, makeStyles, Button } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { connect } from "react-redux";

import { updateCart } from "../../modules/cart/cartAPI";
import { CartSnack } from "../../modules/api/cartAPI";

const useStyle = makeStyles({
  container: {
    margin: 8
  },
  snackTitle: {
    fontWeight: "bold",
    fontSize: 18
  },
  plusMinusButton: {
    borderColor: grey[300],
    backgroundColor: "white",
    padding: 0,
    minWidth: 22,
    minHeight: 22
  },
  pricingSection: {
    marginTop: 10
  },
  total: {
    fontWeight: "bold"
  }
});

interface CartItemProps {
  snackId: number;
  name: string;
  price: number;
  quantity: number;
  onUpdateCart: (cartSnack: CartSnack) => void;
}

const CartItem = (props: CartItemProps) => {
  const { snackId, name, price, quantity, onUpdateCart } = props;
  const total = price * quantity;
  const classes = useStyle();

  const handleIncrease = () => {
    onUpdateCart({ snackId, name, price, quantity: quantity + 1 });
  };

  const handleDecrease = () => {
    onUpdateCart({ snackId, name, price, quantity: quantity - 1 });
  };

  return (
    <>
      <Grid className={classes.container}>
        <Grid className={classes.snackTitle}>{name}</Grid>
        <Grid>Rp. {price.toLocaleString()} / box</Grid>
        <Grid direction="row" container justify="space-between" className={classes.pricingSection}>
          <Grid>
            Qty:{" "}
            <Button onClick={handleDecrease} variant="outlined" size="small" className={classes.plusMinusButton}>
              -
            </Button>{" "}
            {quantity}{" "}
            <Button onClick={handleIncrease} variant="outlined" size="small" className={classes.plusMinusButton}>
              +
            </Button>
          </Grid>
          <Grid>
            <Grid>
              Total: <span className={classes.total}>Rp. {total.toLocaleString()} </span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

const mapDispatchToProps = {
  onUpdateCart: updateCart
};

export default connect(undefined, mapDispatchToProps)(CartItem);
