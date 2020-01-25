import React from "react";
import { TextField, makeStyles, FormHelperText } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles({
  inputClasses: {
    background: "white",
    paddingLeft: 0
  },
  inputLabel: {
    left: -12
  },
  container: {
    marginBottom: 8
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
        className={clsx([classes.container, className])}
        variant="filled"
        error={!!form.errors[name]}
        helperText={form.errors[name] && form.errors[name].message}
        label={label}
        fullWidth={props.fullWidth}
        type={"file"}
        inputRef={form.register({
          required: required === undefined ? true : required
        })}
        InputLabelProps={{
          shrink: true,
          classes: {
            shrink: classes.inputLabel
          }
        }}
        InputProps={{
          classes: {
            input: classes.inputClasses
          }
        }}
      />
      <FormHelperText>{form.errors[name] && form.errors[name].message}</FormHelperText>
    </>
  );
};

export default InputFile;
