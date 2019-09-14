import React from "react";
import { connect } from "react-redux";
import { Snackbar, Theme, SnackbarContent } from "@material-ui/core";
import { CheckCircle as CheckCircleIcon, Error as ErrorIcon } from "@material-ui/icons";
import { amber, green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

import { AppState } from "../modules/reducer";
import { ToastType } from "../modules/toast/toastActions";
import { hideToast } from "../modules/toast/toastAPI";

const variantIcon = {
  [ToastType.SUCCESS]: CheckCircleIcon,
  [ToastType.ERROR]: ErrorIcon
};

const useStyles = makeStyles((theme: Theme) => ({
  [ToastType.SUCCESS]: {
    backgroundColor: green[600]
  },
  [ToastType.ERROR]: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

interface Props {
  message: string;
  toastType: ToastType;
  hideToast: () => void;
}

const ToastComponent: React.FC<Props> = (props) => {
  const classes = useStyles();
  const Icon = variantIcon[props.toastType];

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={props.message !== ""}
      autoHideDuration={3000}
      onClose={props.hideToast}
    >
      <SnackbarContent
        className={classes[props.toastType]}
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {props.message}
          </span>
        }
      />
    </Snackbar>
  );
};

const mapStateToProps = (state: AppState, ownProps: any = {}) => ({
  message: state.toast.message,
  toastType: state.toast.toastType
});

const mapDispatchToProps = { hideToast };

const Toast = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToastComponent);

export default Toast;
