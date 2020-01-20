import React, { useEffect } from "react";
import { Paper, Grid, makeStyles, Button } from "@material-ui/core";
import { red, green } from "@material-ui/core/colors";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import Dropdown from "../components/forms/Dropdown";
import InputFile from "../components/forms/InputFile";
import facultyList from "../assets/facultyList";
import {
  cancelTransaction,
  updateTransaction,
  UpdateTransactionForm,
  Transaction,
  PaymentMethods
} from "../modules/api/transactionAPI";

const useStyle = makeStyles({
  summary: {
    maxWidth: 500,
    padding: 20,
    marginBottom: 30
  },
  saveButton: {
    backgroundColor: green[600],
    "&:hover": {
      backgroundColor: green[700]
    },
    color: "white",
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 6
  },
  cancelButton: {
    borderColor: red[400],
    "&:hover": {
      backgroundColor: red[500],
      color: "white"
    },
    color: red[500],
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 6
  }
});

interface TransactionFormProps {
  onCancelTransaction: () => Promise<void>;
  onUpdateTransaction: (updateTransactionForm: UpdateTransactionForm) => Promise<void>;
  transaction?: Transaction;
}

const TransactionForm = (props: TransactionFormProps) => {
  const classes = useStyle();
  const { transaction } = props;
  const { handleSubmit, ...form } = useForm();

  const handleSave = (data) => {
    const { date, paymentMethod, time, location, image } = data;
    const updateTransactionForm: UpdateTransactionForm = image[0]
      ? { date, time, paymentMethod, location, transferImage: image[0] }
      : { date, time, paymentMethod, location };

    props.onUpdateTransaction(updateTransactionForm);
  };

  useEffect(() => {
    if (transaction) {
      transaction.location && form.setValue("location", transaction.location);
      transaction.date && form.setValue("date", transaction.date);
      transaction.time && form.setValue("time", transaction.time);
    }
  }, [transaction]);

  return (
    <>
      <Paper className={classes.summary} elevation={3}>
        <Grid direction="column" container>
          <form onSubmit={handleSubmit(handleSave)}>
            <Dropdown
              name="paymentMethod"
              listMenu={{
                gopay: "Gopay 082215151500",
                ovo: "Ovo 082215151500",
                "bank bca": "0496518845 BNI a.n. Muhammad Dzulkarnaen",
                "bank bni": "BCA 8691493547 A.n. Muhammad Dzulkarnaen Abdul Aziz"
              }}
              label="Transfer VIA"
              form={form}
            ></Dropdown>
            <Dropdown
              name="date"
              listMenu={{
                "20 Januari": "20 Januari",
                "21 Januari": "21 Januari",
                "22 Januari": "22 Januari",
                "23 Januari": "23 Januari"
              }}
              label="Date"
              form={form}
            />
            <Dropdown
              name="time"
              listMenu={{
                "7 am - 9 am": "7 am - 9 am",
                "4 pm - 6 pm": "4 pm - 6 pm"
              }}
              label="Time"
              form={form}
            />
            <Dropdown name="location" listMenu={facultyList} label="Location" form={form} />
            <InputFile name="image" fullWidth label="Receipt of transfer" form={form} required={false} />
            <Button type="submit" className={classes.saveButton} fullWidth variant="contained" color="inherit">
              Save
            </Button>
            <Button
              onClick={props.onCancelTransaction}
              className={classes.cancelButton}
              fullWidth
              variant="outlined"
              color="inherit"
            >
              Cancel Transaction
            </Button>
          </form>
        </Grid>
      </Paper>
    </>
  );
};

const dispatchToProps = {
  onCancelTransaction: cancelTransaction,
  onUpdateTransaction: updateTransaction
};

export default connect(undefined, dispatchToProps)(TransactionForm);
