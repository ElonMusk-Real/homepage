import React, { useState, useEffect } from "react";
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
  Transaction
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
  const [editMode, setEditMode] = useState(false);

  form.watch();

  const handleSave = (data) => {
    const { date, time, location, image } = data;
    const updateTransactionForm: UpdateTransactionForm = image[0]
      ? { date, time, location, transferImage: image[0] }
      : { date, time, location };

    props.onUpdateTransaction(updateTransactionForm);
    setEditMode(false);
  };

  useEffect(() => {
    if (transaction) {
      transaction.location && form.setValue("location", transaction.location);
      transaction.date && form.setValue("date", transaction.date);
      transaction.time && form.setValue("time", transaction.time);

      if (transaction.location === null) {
        setEditMode(true);
      }
    }
  }, [transaction]);

  return (
    <>
      <Paper className={classes.summary} elevation={3}>
        <Grid direction="column" container>
          <form onSubmit={handleSubmit(handleSave)}>
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
              readOnly={!editMode}
            />
            <Dropdown
              name="time"
              listMenu={{
                "7 am - 9 am": "7 am - 9 am",
                "4 pm - 6 pm": "4 pm - 6 pm"
              }}
              label="Time"
              form={form}
              readOnly={!editMode}
            />
            <Dropdown name="location" listMenu={facultyList} label="Location" form={form} readOnly={!editMode} />
            <InputFile name="image" fullWidth label="Receipt of transfer" form={form} required={false} />
            {editMode && (
              <>
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
              </>
            )}
          </form>
          {!editMode && (
            <Button onClick={() => setEditMode(true)} color="primary" variant="contained">
              Edit Transaction
            </Button>
          )}
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
