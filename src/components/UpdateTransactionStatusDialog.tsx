import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm } from "react-hook-form";
import Dropdown from "./forms/Dropdown";
import { updateTransactionStatus, TransactionStatuses } from "../modules/api/transactionAPI";
import { connect } from "react-redux";

interface UpdateTransactionStatusDialogProps {
  id: number;
  open: boolean;
  status?: TransactionStatuses;
  onClose: () => void;
  onUpdateTransactionStatus: (id: number, status: TransactionStatuses) => Promise<void>;
}

const UpdateTransactionStatusDialog = (props: UpdateTransactionStatusDialogProps) => {
  const { handleSubmit, ...form } = useForm();
  const { open, onClose, id, onUpdateTransactionStatus, status } = props;

  const handleSave = (data) => {
    const { status } = data;
    onUpdateTransactionStatus(id, status).then(onClose);
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit(handleSave)}>
        <DialogTitle id="form-dialog-title">Update Status</DialogTitle>
        <DialogContent>
          <Dropdown
            name="status"
            defaultValue={status && status.toString()}
            listMenu={{
              process: "Process",
              confirmed: "Confirmed",
              "in delivery": "In delivery",
              "wait to pick up": "Wait to pick up",
              done: "Done"
            }}
            label="Status"
            form={form}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const mapDispatchToProps = {
  onUpdateTransactionStatus: updateTransactionStatus
};

export default connect(undefined, mapDispatchToProps)(UpdateTransactionStatusDialog);
