import React, { useState, useEffect } from "react";
import { Paper, Grid, makeStyles, Button, InputLabel } from "@material-ui/core";
import { red, green } from "@material-ui/core/colors";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import ld from "lodash";

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
import { BASE_API } from "../modules/api/http";

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
  },
  label: {
    marginTop: 10,
    fontSize: 12,
    marginBottom: 8
  },
  imageLink: {
    height: 20,
    marginBottom: 30
  },
  editButton: {
    marginTop: 15
  }
});

interface TransactionFormProps {
  onCancelTransaction: () => Promise<void>;
  onUpdateTransaction: (updateTransactionForm: UpdateTransactionForm) => Promise<void>;
  transaction?: Transaction;
  onUpdated: () => void;
}

const TransactionForm = (props: TransactionFormProps) => {
  const classes = useStyle();
  const { transaction } = props;
  const { handleSubmit, ...form } = useForm();
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState("");
  const [isEditImage, setIsEditImage] = useState(false);

  form.watch();

  const handleSave = (data) => {
    const { date, paymentMethod, time, location, image } = data;
    const updateTransactionForm: UpdateTransactionForm =
      image && image[0]
        ? { date, time, paymentMethod, location, transferImage: image[0] }
        : { date, time, paymentMethod, location };

    props.onUpdateTransaction(updateTransactionForm).then(props.onUpdated);
    setEditMode(false);
    setIsEditImage(false);
  };

  useEffect(() => {
    if (transaction) {
      transaction.location && form.setValue("location", transaction.location);
      transaction.date && form.setValue("date", transaction.date);
      transaction.time && form.setValue("time", transaction.time);
      transaction.transferImage && setImage(transaction.transferImage);
      transaction.paymentMethod && form.setValue("paymentMethod", transaction.paymentMethod);

      if (transaction.location === null) {
        setEditMode(true);
      }
    }
  }, [transaction]);

  const getNext7Days = () => {
    const date = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return ld
      .range(1, 6)
      .map((i) => {
        date.setDate(date.getDate() + 1);

        return date.getDate() + " " + monthNames[date.getMonth()];
      })
      .reduce((prev, curr) => {
        prev[curr] = curr;

        return prev;
      }, {});
  };

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
              label="Transfer to"
              form={form}
              readOnly={!editMode}
            ></Dropdown>
            <Dropdown name="date" listMenu={getNext7Days()} label="Date" form={form} readOnly={!editMode} />
            <Dropdown
              name="time"
              listMenu={{
                "6 am - 8 am": "6 am - 8 am",
                "8 am - 10 am": "8 am - 10 am",
                "10 am - 12 pm": "10 am - 12 pm",
                "12 pm - 2 pm": "12 pm - 2 pm"
              }}
              label="Time"
              form={form}
              readOnly={!editMode}
            />
            <Dropdown name="location" listMenu={facultyList} label="Location" form={form} readOnly={!editMode} />
            {!image && <InputFile name="image" fullWidth label="Receipt of transfer" form={form} required={false} />}
            {isEditImage && image && (
              <Grid container justify="space-between" className={classes.imageLink}>
                <Grid>
                  <InputFile name="image" fullWidth label="Receipt of transfer" form={form} required={false} />
                </Grid>
                {image && (
                  <Grid>
                    <Button onClick={() => setIsEditImage(false)}>Cancel</Button>
                  </Grid>
                )}
              </Grid>
            )}
            {!isEditImage && image && (
              <Grid container justify="space-between" className={classes.imageLink}>
                <Grid>
                  <InputLabel className={classes.label}>Receipt of transfer</InputLabel>
                  <a target="_blank" href={`${BASE_API}/file/public/${image}`}>
                    {image}
                  </a>
                </Grid>
                <Grid>{editMode && <Button onClick={() => setIsEditImage(true)}>Edit</Button>}</Grid>
              </Grid>
            )}
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
            <Button
              onClick={() => setEditMode(true)}
              className={classes.editButton}
              color="primary"
              variant="contained"
            >
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
