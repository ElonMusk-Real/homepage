import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Typography, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";

import TransactionForm from "../components/TransactionForm";
import TransactionSummary from "../components/TransactionSummary";
import {
  getTransactionStatus,
  TransactionStatuses,
  getTransactionDetail,
  TransactionWithCartSnackList,
  Transaction
} from "../modules/api/transactionAPI";
import { AppState } from "../modules/store";
import { getCart } from "../modules/cart/cartSelectors";
import { CartState } from "../modules/cart/cartActions";
import { CartSnack } from "../modules/api/cartAPI";

const useStyle = makeStyles({
  container: {
    margin: 24
  },
  info: {
    marginTop: 200
  }
});

interface TransactionPageProps {
  cart: CartState;
  onGetTransactionStatus: () => Promise<TransactionStatuses>;
  onGetTransactionDetail: () => Promise<TransactionWithCartSnackList>;
}

const TransactionPage = (props: TransactionPageProps) => {
  const classes = useStyle();
  const [status, setStatus] = useState<TransactionStatuses | null>(null);
  const [snackList, setSnackList] = useState<CartSnack[]>([]);
  const [transaction, setTransaction] = useState<Transaction>();

  const handleUpdateStatus = () => props.onGetTransactionStatus().then(setStatus);

  useEffect(() => {
    setStatus(null);
    handleUpdateStatus();
  }, [props.cart.status]);

  useEffect(() => {
    if (status === TransactionStatuses.Process) {
      props.onGetTransactionDetail().then(({ transaction, cartSnackList }) => {
        setSnackList(cartSnackList.filter((cartSnack) => cartSnack.quantity > 0));
        setTransaction(transaction);
      });
    }
  }, [status]);

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

  return (
    <>
      <Grid container className={classes.container} justify="center">
        {status === null && renderLoading()}
        {status === TransactionStatuses.NotFound && renderNotFound()}
        {status === TransactionStatuses.Process && (
          <>
            <Grid item xs={12} sm={6}>
              <TransactionSummary snackList={snackList} />
            </Grid>
            <Grid item>
              <TransactionForm transaction={transaction} />
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
  onGetTransactionDetail: getTransactionDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);
