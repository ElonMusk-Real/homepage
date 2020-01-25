import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Divider, Button, Grid } from "@material-ui/core";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { UpdateTransactionForm, updateTransaction } from "../modules/api/transactionAPI";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  text: string;
}

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const { onConfirm, open, onClose, title, text } = props;
  const handleConfirm = () => {
    onConfirm && onConfirm();
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>{text}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          No
        </Button>
        <Button onClick={handleConfirm}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

const dispatchToProps = {
  onUpdateTransaction: updateTransaction
};

export default connect(undefined, dispatchToProps)(ConfirmationDialog);
