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

interface InputFileProps {
  name: string;
  label: string;
  fullWidth: boolean;
  className?: string;
  form: any;
  required?: boolean;
}

const InputFile = (props: InputFileProps) => {
  const { label, className, name, form, required } = props;
  const classes = useStyles();

  return (
    <>
      <TextField
        name={name}
        className={className}
        variant="filled"
        error={!!form.errors[name]}
        helperText={form.errors[name] && form.errors[name].message}
        label={label}
        fullWidth={props.fullWidth}
        type={"file"}
        inputRef={form.register({
          required: required === undefined ? true : required
        })}
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
      />
    </>
  );
};

export default InputFile;
