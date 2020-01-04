import React from "react";
import { TextField, makeStyles } from "@material-ui/core";
import { combineValidator, Validator } from "../../modules/validation";

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

interface InputTextProps {
  name: string;
  label: string;
  fullWidth: boolean;
  password?: boolean;
  className?: string;
  form: any;
  validators: Validator[];
}

const InputText = (props: InputTextProps) => {
  const { label, className, name, form, password, validators } = props;
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
        type={password ? "password" : "text"}
        inputRef={form.register({
          required: true,
          validate: combineValidator(validators)
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

export default InputText;
