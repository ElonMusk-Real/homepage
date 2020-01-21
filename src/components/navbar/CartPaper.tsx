import React, { useEffect, useState } from "react";
import { IconButton, makeStyles, Paper, ClickAwayListener, Button, Grid, Badge } from "@material-ui/core";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { connect } from "react-redux";
import { red, grey } from "@material-ui/core/colors";

import CartItem from "./CartItem";
import { CartSnack, fetchCart, getCartStatus, CartStatuses } from "../../modules/api/cartAPI";
import { resetCart } from "../../modules/cart/cartAPI";
import { getCart } from "../../modules/cart/cartSelectors";
import { CartState } from "../../modules/cart/cartActions";
import { AppState } from "../../modules/store";
import { createTransaction } from "../../modules/api/transactionAPI";
import { isMobile } from "react-device-detect";

const useStyles = makeStyles({
  root: {
    display: "flex"
  },
  paper: {
    marginRight: 20
  },
  menuButton: {
    color: "white"
  },
  cartPanel: {
    padding: 10,
    width: 320,
    height: 400
  },
  cartItemList: {
    height: 310,
    overflowY: "scroll",
    borderColor: grey[300],
    borderWidth: 1,
    borderStyle: "solid"
  },
  mobileCartPanel: {
    padding: 10,
    width: "calc(100vw - 40px)",
    height: "calc(100vh - 150px)"
  },
  mobileCartItemList: {
    height: "calc(100vh - 290px)",
    overflowY: "scroll",
    borderColor: grey[300],
    borderWidth: 1,
    borderStyle: "solid"
  },
  toPaymentButton: {
    backgroundColor: red[400],
    "&:hover": {
      backgroundColor: red[500]
    },
    color: "white",
    width: "100%",
    fontWeight: "bold"
  },
  closeButton: {
    borderColor: red[400],
    color: "red",
    width: "100%",
    fontWeight: "bold",
    marginTop: 10
  },
  total: {
    fontWeight: "bold",
    marginLeft: 5,
    marginRight: 5
  },
  subTotalSection: {
    marginBottom: 6,
    marginTop: 6
  },
  emptyCartPanel: {
    height: "100%"
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  emptyCartDesc: {
    marginTop: 8,
    textAlign: "center",
    color: grey[700]
  },
  mobilePaper: {
    position: "fixed"
  }
});

interface CartPaperProps {
  onFetchCart: () => Promise<CartSnack[]>;
  onResetCart: () => void;
  onCreateTransaction: () => Promise<void>;
  onGetCartStatus: () => Promise<CartStatuses>;
  cart: CartState;
  open: boolean;
  setOpen: (open: boolean) => void;
  anchorRef: any;
}

const CartPaper = (props: CartPaperProps) => {
  const classes = useStyles();
  const { open, setOpen, anchorRef } = props;
  const inTransaction = props.cart.status === CartStatuses.Process;
  const cartData = props.cart.data;

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef && anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const prevOpen = React.useRef(open);

  useEffect(() => {
    props.onResetCart();
  }, []);

  useEffect(() => {
    if (anchorRef) {
      if (prevOpen.current === true && open === false) {
        anchorRef.current!.focus();
      }
      prevOpen.current = open;
    }
  }, [open]);

  const totalBox = Object.keys(cartData).reduce((prev, id) => prev + cartData[id].quantity, 0);
  const totalPrice = Object.keys(cartData).reduce((prev, id) => prev + cartData[id].price * cartData[id].quantity, 0);

  const handleToPayment = () => {
    props.onCreateTransaction().then(() => {
      setOpen(false);
      props.onResetCart();
    });
  };

  const renderCartList = () => (
    <>
      <Grid className={isMobile ? classes.mobileCartItemList : classes.cartItemList}>
        {Object.keys(cartData).map((id) => (
          <CartItem {...cartData[id]} />
        ))}
      </Grid>
      <Grid justify="flex-end" container className={classes.subTotalSection}>
        Total Price: <span className={classes.total}>Rp. {totalPrice.toLocaleString()}</span>
      </Grid>
      <Grid>
        <Button onClick={handleToPayment} className={classes.toPaymentButton}>
          Continue to payment
          <KeyboardArrowRightIcon />
        </Button>
        {isMobile && (
          <Button onClick={handleClose} className={classes.closeButton} variant="outlined">
            Close
          </Button>
        )}
      </Grid>
    </>
  );

  const renderEmptyCart = () => (
    <Grid className={classes.emptyCartPanel} container direction="column" justify="center" alignItems="center">
      <Grid className={classes.emptyCartText}>{inTransaction ? "Can't access your cart" : "Your Cart is Empty"}</Grid>
      <Grid className={classes.emptyCartDesc}>
        {inTransaction ? (
          "You need to finish your transaction first"
        ) : (
          <>
            Looks like you haven't added
            <br />
            anything to your cart yet
          </>
        )}
      </Grid>
      {isMobile && (
        <Button onClick={handleClose} className={classes.closeButton} variant="outlined">
          Close
        </Button>
      )}
    </Grid>
  );

  if (isMobile)
    return open ? (
      <Paper elevation={3} className={classes.mobilePaper}>
        <ClickAwayListener onClickAway={handleClose}>
          <Grid direction="column" container className={classes.mobileCartPanel}>
            {totalBox > 0 ? renderCartList() : renderEmptyCart()}
          </Grid>
        </ClickAwayListener>
      </Paper>
    ) : (
      <></>
    );

  return (
    <Paper elevation={3}>
      <ClickAwayListener onClickAway={handleClose}>
        <Grid direction="column" container className={classes.cartPanel}>
          {totalBox > 0 ? renderCartList() : renderEmptyCart()}
        </Grid>
      </ClickAwayListener>
    </Paper>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    cart: getCart(state)
  };
};

const mapDispatchToProps = {
  onFetchCart: fetchCart,
  onResetCart: resetCart,
  onCreateTransaction: createTransaction,
  onGetCartStatus: getCartStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPaper);
