import React, { useEffect, useState } from "react";
import { IconButton, makeStyles, Popper, Grow, Paper, ClickAwayListener, Button, Grid, Badge } from "@material-ui/core";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { connect } from "react-redux";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { red, grey } from "@material-ui/core/colors";

import CartItem from "./CartItem";
import { CartSnack, fetchCart, getCartStatus, CartStatuses } from "../../modules/api/cartAPI";
import { resetCart } from "../../modules/cart/cartAPI";
import { getCart } from "../../modules/cart/cartSelectors";
import { CartState } from "../../modules/cart/cartActions";
import { AppState } from "../../modules/store";
import { createTransaction } from "../../modules/api/transactionAPI";

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
  toPaymentButton: {
    backgroundColor: red[400],
    "&:hover": {
      backgroundColor: red[500]
    },
    color: "white",
    width: "100%",
    fontWeight: "bold"
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
  }
});

interface CartMenuProps {
  onFetchCart: () => Promise<CartSnack[]>;
  onResetCart: () => void;
  onCreateTransaction: () => Promise<void>;
  onGetCartStatus: () => Promise<CartStatuses>;
  cart: CartState;
}

const CartMenu = (props: CartMenuProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const inTransaction = props.cart.status === CartStatuses.Process;
  const cartData = props.cart.data;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const prevOpen = React.useRef(open);

  useEffect(() => {
    props.onResetCart();
  }, []);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
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
      <Grid className={classes.cartItemList}>
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
    </Grid>
  );

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleToggle}
        ref={anchorRef}
      >
        <Badge badgeContent={totalBox} color="secondary">
          <ShoppingBasketIcon className={classes.menuButton} />
        </Badge>
      </IconButton>

      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
          >
            <Paper elevation={3}>
              <ClickAwayListener onClickAway={handleClose}>
                <Grid direction="column" container className={classes.cartPanel}>
                  {totalBox > 0 ? renderCartList() : renderEmptyCart()}
                </Grid>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartMenu);
