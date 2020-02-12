import React, { useState, useEffect, Component } from "react";
import { Grid, makeStyles, Typography, CircularProgress, Button, Divider, Paper } from "@material-ui/core";
import { connect } from "react-redux";

import TransactionForm from "../components/TransactionForm";
import TransactionSummary from "../components/TransactionSummary";
import {
  getTransactionStatus,
  TransactionStatuses,
  getTransactionDetail,
  TransactionWithCartSnackList,
  Transaction,
  confirmPickUp
} from "../modules/api/transactionAPI";
import { AppState } from "../modules/store";
import { getCart } from "../modules/cart/cartSelectors";
import { CartState } from "../modules/cart/cartActions";
import { CartSnack } from "../modules/api/cartAPI";
import { green } from "@material-ui/core/colors";
import ConfirmationDialog from "../components/ConfirmationDialog";
import HorizontalLabelPositionBelowStepper from "../components/HorizontalLabelPositionBelowStepper";

const useStyle = makeStyles({
  status: {
    margin: 20,
    textAlign: "center"
  },
  divider: {
    marginTop: 20,
    marginBottom: 20
  },
  container: {
    margin: 24
  },
  info: {
    marginTop: 200,
    textAlign: "center"
  },
  greenText: {
    fontWeight: "bold",
    color: green[600]
  },
  item: {
    marginBottom: 10
  },
  snackName: {
    fontWeight: "bold",
    fontSize: 16
  },
  snackDetails: {
    margin: 10,
    fontSize: 14
  },
  paperInfo: {
    marginTop: 50,
    padding: 20,
    maxWidth: 700
  },
  confirmPickUp: {
    backgroundColor: green[700],
    "&:hover": {
      backgroundColor: green[900]
    },
    color: "white",
    fontWeight: "bold",
    maxWidth: 200
  }
});

interface TransactionPageProps {
  cart: CartState;
  onGetTransactionStatus: () => Promise<TransactionStatuses>;
  onGetTransactionDetail: () => Promise<TransactionWithCartSnackList>;
  confirmPickUp: () => Promise<void>;
}

const TransactionPage = (props: TransactionPageProps) => {
  const classes = useStyle();
  const pickupTitle = "Confirm Pickup";
  const pickupText = "Confirm that you have picked up your snack box?";
  const [status, setStatus] = useState<TransactionStatuses | null>(null);
  const [snackList, setSnackList] = useState<CartSnack[]>([]);
  const [transaction, setTransaction] = useState<Transaction>();
  const [updatedData, setUpdatedData] = useState(0);
  const [pickupOpen, setPickupOpen] = useState(false);
  const [handlePickup, setHandlePickup] = useState<() => void>();

  const handleUpdateStatus = () => props.onGetTransactionStatus().then(setStatus);

  const handleDialogOpen = () => {
    setPickupOpen(true);
    setHandlePickup(() => () => {
      props.confirmPickUp().then(handleUpdateStatus);
    });
  };

  const handleClose = () => {
    setPickupOpen(false);
  };

  useEffect(() => {
    setStatus(null);
    handleUpdateStatus();
  }, [props.cart.status]);

  useEffect(() => {
    setSnackList([]);
    setTransaction(undefined);
    if (status && status !== TransactionStatuses.Done && status !== TransactionStatuses.NotFound) {
      props.onGetTransactionDetail().then(({ transaction, cartSnackList }) => {
        setStatus(transaction.status);
        setSnackList(cartSnackList.filter((cartSnack) => cartSnack.quantity > 0));
        setTransaction(transaction);
      });
    }
  }, [status, updatedData]);

  const renderCard = (statusComponent: JSX.Element) => {
    return (
      <>
        <Paper elevation={3} className={classes.paperInfo}>
          <Grid direction="column" container>
            <Grid container justify="center">
              {statusComponent}
            </Grid>
            <Divider className={classes.divider} />

            {snackList.map((snack) => (
              <>
                <Grid>
                  <Grid container justify="space-between" className={classes.item}>
                    <Grid>
                      <Grid className={classes.snackName}>{snack.name}</Grid>
                      <Grid className={classes.snackDetails}>Price: Rp. {snack.price.toLocaleString()}</Grid>
                      <Grid className={classes.snackDetails}>Quantity: {snack.quantity}</Grid>
                    </Grid>
                    <Grid className={classes.snackDetails}>Rp. {(snack.price * snack.quantity).toLocaleString()}</Grid>
                  </Grid>
                </Grid>
              </>
            ))}
          </Grid>
        </Paper>
      </>
    );
  };

  const renderLoading = () => (
    <Grid container direction="column" justify="center" alignItems="center" className={classes.info}>
      <Grid>
        <CircularProgress />
      </Grid>
      <Grid>
        <Typography variant="h6">Loading</Typography>
      </Grid>
    </Grid>
  );

  const renderNotFound = () => (
    <Typography className={classes.info} variant="h6">
      You don't have any transactions
    </Typography>
  );

  const renderPaid = () =>
    renderCard(
      <Typography className={classes.status} variant="h5">
        <div>Thank you for your purchase 😊</div>
        <HorizontalLabelPositionBelowStepper stepToActivate={0} />
      </Typography>
    );

  const renderConfirmed = () =>
    renderCard(
      <Typography className={classes.status} variant="h5">
        <HorizontalLabelPositionBelowStepper stepToActivate={1} />
      </Typography>
    );

  const renderInDelivery = () =>
    renderCard(
      <Typography className={classes.status} variant="h5">
        <HorizontalLabelPositionBelowStepper stepToActivate={2} />
      </Typography>
    );

  const renderWaitToPickUp = () =>
    renderCard(
      <>
        <Typography className={classes.status} variant="h6">
          <HorizontalLabelPositionBelowStepper stepToActivate={3} />
        </Typography>
        <Button
          onClick={handleDialogOpen}
          className={classes.confirmPickUp}
          type="submit"
          fullWidth
          variant="contained"
          color="inherit"
        >
          Confirm Pick Up
        </Button>
        <ConfirmationDialog
          title={pickupTitle}
          text={pickupText}
          onConfirm={handlePickup}
          open={pickupOpen}
          onClose={handleClose}
        />
      </>
    );

  const renderDone = () => (
    <Typography className={classes.info} variant="h6">
      Your last transaction has <span className={classes.greenText}>done</span>
    </Typography>
  );

  return (
    <>
      <Grid container className={classes.container} justify="center">
        {status === null && renderLoading()}
        {status === TransactionStatuses.NotFound && renderNotFound()}
        {status === TransactionStatuses.Paid && renderPaid()}
        {status === TransactionStatuses.Confirmed && renderConfirmed()}
        {status === TransactionStatuses.InDelivery && renderInDelivery()}
        {status === TransactionStatuses.WaitToPickUp && renderWaitToPickUp()}
        {status === TransactionStatuses.Done && renderDone()}
        {status === TransactionStatuses.Process && (
          <>
            <Grid item xs={12} sm={6}>
              <TransactionSummary snackList={snackList} />
            </Grid>
            <Grid item>
              <TransactionForm transaction={transaction} onUpdated={() => setUpdatedData((i) => i + 1)} />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    cart: getCart(state)
  };
};

const mapDispatchToProps = {
  onGetTransactionStatus: getTransactionStatus,
  onGetTransactionDetail: getTransactionDetail,
  confirmPickUp
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);
