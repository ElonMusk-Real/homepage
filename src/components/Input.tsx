import React from "react";
import { TextField, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  inputClasses: {
    paddingTop: 16,
    paddingBottom: 16,
    background: "white"
  },
  labelClasses: {
    top: -6
  },
  shrinkClasses: {
    top: -9
  }
});

interface Props {
  label: string;
  fullWidth: boolean;
  value: string;
  onChange: any;
  className?: string;
}

const Input: React.FC<Props> = props => {
  const { label, value, onChange, className, ...transferProps } = props;
  const classes = useStyles();

  return (
    <TextField
      className={className}
      variant="filled"
      label={label}
      value={value}
      onChange={onChange}
      fullWidth={props.fullWidth}
      InputProps={{
        classes: {
          input: classes.inputClasses
        }
      }}
      InputLabelProps={{
        classes: {
          root: classes.labelClasses,
          shrink: classes.shrinkClasses
        }
      }}
      {...transferProps}
    />
  );
};

export default Input;
