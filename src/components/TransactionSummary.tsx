import React from "react";
import { Paper, Grid, makeStyles, Typography, Divider } from "@material-ui/core";
import { CartSnack } from "../modules/api/cartAPI";

const useStyle = makeStyles({
  summary: {
    maxWidth: 500,
    padding: 20,
    marginBottom: 30
  },
  divider: {
    marginTop: 20,
    marginBottom: 20
  },
  item: {
    marginBottom: 10
  },
  snackName: {
    fontWeight: "bold",
    fontSize: 16
  },
  subTotal: {
    fontWeight: "bold",
    fontSize: 20
  }
});

interface TransactionSummaryProps {
  snackList: CartSnack[];
}

const TransactionSummary = (props: TransactionSummaryProps) => {
  const classes = useStyle();

  const renderItems = () =>
    props.snackList.map((snack) => (
      <Grid>
        <Grid container justify="space-between" className={classes.item}>
          <Grid>
            <Grid className={classes.snackName}>{snack.name}</Grid>
            <Grid>Price: Rp. {snack.price.toLocaleString()}</Grid>
            <Grid>Qty: {snack.quantity}</Grid>
          </Grid>
          <Grid>Rp. {(snack.price * snack.quantity).toLocaleString()}</Grid>
        </Grid>
      </Grid>
    ));

  const getSubTotal = () => props.snackList.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);

  return (
    <>
      <Paper className={classes.summary} elevation={3}>
        <Grid direction="column" container>
          <Grid container justify="center">
            <Typography variant="h4">Transaction Summary</Typography>
          </Grid>
          <Divider className={classes.divider} />
          {renderItems()}
          <Divider className={classes.divider} />
          <Grid container justify="flex-end">
            <Grid className={classes.subTotal}>Subtotal: Rp. {getSubTotal().toLocaleString()}</Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default TransactionSummary;
