import React from "react";
import { Button, Grid, Icon, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";
import { connect } from "react-redux";

import { CartSnack } from "../modules/api/cartAPI";
import { updateCart } from "../modules/cart/cartAPI";
import { AppState } from "../modules/store";
import { getCartQuantity } from "../modules/cart/cartSelectors";

const useStyles = makeStyles({
  addButton: {
    backgroundColor: green[700],
    "&:hover": {
      backgroundColor: green[900]
    },
    color: "white"
  },
  quantityButton: {
    color: "#4ee44e"
  },
  quantityText: {
    color: "black"
  }
});

export interface QuantityButtonProps {
  snackId: number;
  name: string;
  price: number;
  quantity: number;
  onUpdateCart: (cartSnack: CartSnack) => void;
}

const QuantityButton = (props: QuantityButtonProps) => {
  const { snackId, name, price, quantity, onUpdateCart } = props;
  const classes = useStyles();

  const handleIncrease = () => {
    onUpdateCart({ snackId, name, price, quantity: quantity + 1 });
  };

  const handleDecrease = () => {
    onUpdateCart({ snackId, name, price, quantity: quantity - 1 });
  };

  if (quantity === 0) {
    return (
      <Button size="small" className={classes.addButton} onClick={handleIncrease}>
        <Icon>add</Icon> Add
      </Button>
    );
  } else {
    return (
      <Grid direction="row" container>
        <ButtonGroup size="small" color="primary" aria-label="outlined primary button group">
          <Button size="small" className={classes.quantityButton} onClick={handleDecrease}>
            <Icon>remove</Icon>
          </Button>
          <Button disabled>
            <span className={classes.quantityText}>{quantity}</span>
          </Button>
          <Button size="small" className={classes.quantityButton} onClick={handleIncrease}>
            <Icon>add</Icon>
          </Button>
        </ButtonGroup>
      </Grid>
    );
  }
};

const mapStateToProps = (state: AppState, ownProps) => {
  return {
    quantity: getCartQuantity(state, ownProps.snackId)
  };
};

const mapDispatchToProps = {
  onUpdateCart: updateCart
};

export default connect(mapStateToProps, mapDispatchToProps)(QuantityButton);
