import React, { useEffect, useState } from "react";
import { IconButton, makeStyles, Popper, Grow, Badge } from "@material-ui/core";
import { connect } from "react-redux";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

import { CartSnack, fetchCart, getCartStatus, CartStatuses } from "../../modules/api/cartAPI";
import { resetCart } from "../../modules/cart/cartAPI";
import { getCart } from "../../modules/cart/cartSelectors";
import { CartState } from "../../modules/cart/cartActions";
import { AppState } from "../../modules/store";
import { createTransaction } from "../../modules/api/transactionAPI";
import CartPaper from "./CartPaper";

const useStyles = makeStyles({
  root: {
    display: "flex"
  },
  paper: {
    marginRight: 20
  },
  menuButton: {
    color: "white"
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
  const cartData = props.cart.data;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
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
            <CartPaper anchorRef={anchorRef} open={open} setOpen={setOpen} />
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
