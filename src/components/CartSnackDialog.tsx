import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Divider, Button, Grid } from "@material-ui/core";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { CartSnack } from "../modules/api/cartAPI";

interface CartSnackDialogProps {
  cartSnack: CartSnack[];
  open: boolean;
  onClose: () => void;
}

const CartSnackDialog = (props: CartSnackDialogProps) => {
  const { cartSnack, open, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Cart Items</DialogTitle>
      <DialogContent>
        {cartSnack.map((snack) => (
          <>
            <Grid>
              <Grid container justify="space-between">
                <Grid>
                  <Grid>{snack.name}</Grid>
                  <Grid>Price: Rp. {snack.price.toLocaleString()}</Grid>
                  <Grid>Quantity: {snack.quantity}</Grid>
                </Grid>
                <Grid>Rp. {(snack.price * snack.quantity).toLocaleString()}</Grid>
              </Grid>
            </Grid>
            <Divider />
          </>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CartSnackDialog;
