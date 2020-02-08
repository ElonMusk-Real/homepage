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
import ConfirmationDialog from "./ConfirmationDialog";
import InputText from "./forms/InputText";
import SeeLocationDialog from "./SeeLocationDialog";

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
  },
  timeoutLabel: {
    fontWeight: "bold"
  },
  timeoutValue: {
    color: red[500],
    fontWeight: "bold"
  },
  norek: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15
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
  const confirmTitle = "Confirm Transaction";
  const confirmText = "Are you sure you want to confirm your transaction?";
  const cancelTitle = "Cancel";
  const cancelText = "Are you sure you want to cancel transaction?";
  const { transaction } = props;
  const { handleSubmit, ...form } = useForm();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cancelDialog, setCancelDialog] = useState(false);
  const [seeImg, setSeeImg] = useState(false);
  const [handleSave, setHandleSave] = useState<() => void>();
  const [diffTime, setDiffTime] = useState("");

  form.watch();

  const handleImgClose = () => {
    setSeeImg(false);
  };

  const handleDialogOpen = (data) => {
    const { date, paymentMethod, time, location, image } = data;
    const tempUpdateTransactionForm: UpdateTransactionForm =
      image && image[0]
        ? { date, time, paymentMethod, location, transferImage: image[0] }
        : { date, time, paymentMethod, location };
    setHandleSave(() => () => {
      props.onUpdateTransaction(tempUpdateTransactionForm).then(props.onUpdated);
    });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCancelClose = () => {
    setCancelDialog(false);
  };

  const diffDateFromNow = (date: Date) => {
    const dateNow = new Date();
    const diff = Math.abs(Math.floor(date.getTime() - dateNow.getTime()) / 1000);

    const days = Math.floor(diff / (24 * 60 * 60));
    let leftSec = diff - days * 24 * 60 * 60;

    const hrs = Math.floor(leftSec / (60 * 60));
    leftSec = leftSec - hrs * 60 * 60;

    const min = Math.floor(leftSec / 60);
    leftSec = leftSec - min * 60;

    return hrs + ":" + min + ":" + Math.round(leftSec);
  };

  const updateTimout = () => {
    if (transaction) {
      const timeoutMinutes = 120;
      const date = new Date(new Date(transaction.startedDateTime).getTime() + timeoutMinutes * 60000);
      setDiffTime(diffDateFromNow(date));
    }
  };

  setTimeout(updateTimout, 1000);

  useEffect(() => {
    if (transaction) {
      transaction.location && form.setValue("location", transaction.location);
      transaction.date && form.setValue("date", transaction.date);
      transaction.time && form.setValue("time", transaction.time);
      transaction.paymentMethod && form.setValue("paymentMethod", transaction.paymentMethod);
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

        return date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
      })
      .reduce((prev, curr) => {
        prev[curr] = curr;

        return prev;
      }, {});
  };

  const values = form.getValues();
  const paymentMethod = values.paymentMethod;
  const location: string | undefined = values.location;

  const norek = {
    gopay: "Gopay 082215151500",
    ovo: "OVO 082215151500",
    "bank bca": (
      <>
        BNI 0496518845
        <br />
        a.n. Muhammad Dzulkarnaen
      </>
    ),
    "bank bni": (
      <>
        BCA 8691493547
        <br />
        a.n. Muhammad Dzulkarnaen Abdul Aziz
      </>
    )
  };

  return (
    <>
      <Paper className={classes.summary} elevation={3}>
        <Grid direction="column" container>
          <form onSubmit={handleSubmit(handleDialogOpen)}>
            <span className={classes.timeoutLabel}>Timeout:</span>{" "}
            <span className={classes.timeoutValue}>{diffTime}</span>
            <Dropdown
              name="paymentMethod"
              listMenu={{
                gopay: "Gopay",
                ovo: "OVO",
                "bank bca": "Bank BNI",
                "bank bni": "Bank BCA"
              }}
              label="Transfer Method"
              form={form}
            ></Dropdown>
            {paymentMethod && (
              <>
                <InputLabel>Transfer to</InputLabel> <div className={classes.norek}>{norek[paymentMethod]}</div>
              </>
            )}
            <Dropdown name="date" listMenu={getNext7Days()} label="Order Date" form={form} />
            <Dropdown
              name="time"
              listMenu={{
                "6 am - 8 am": "6 am - 8 am",
                "8 am - 10 am": "8 am - 10 am",
                "10 am - 12 pm": "10 am - 12 pm",
                "12 pm - 2 pm": "12 pm - 2 pm"
              }}
              label="Delivery Time"
              form={form}
            />
            <Dropdown name="location" listMenu={facultyList} label="Destination Point" form={form} />
            {location && (
              <>
                <Button
                  onClick={() => {
                    setSeeImg(true);
                  }}
                  variant="contained"
                  color="primary"
                >
                  View Destination Point
                </Button>
              </>
            )}
            <InputFile name="image" fullWidth label="Receipt of transfer" form={form} />
            <Button type="submit" className={classes.saveButton} fullWidth variant="contained" color="inherit">
              Save
            </Button>
            <Button
              onClick={() => {
                setCancelDialog(true);
              }}
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
      <ConfirmationDialog
        title={confirmTitle}
        text={confirmText}
        open={dialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleSave}
      />
      <ConfirmationDialog
        title={cancelTitle}
        text={cancelText}
        open={cancelDialog}
        onClose={handleCancelClose}
        onConfirm={props.onCancelTransaction}
      />
      <SeeLocationDialog location={location} open={seeImg} onClose={handleImgClose} />
    </>
  );
};

const dispatchToProps = {
  onCancelTransaction: cancelTransaction,
  onUpdateTransaction: updateTransaction
};

export default connect(undefined, dispatchToProps)(TransactionForm);
