import React from "react";
import { TextField, makeStyles } from "@material-ui/core";
import { combineValidator, Validator } from "../../modules/validation";

const useStyles = makeStyles({
  inputClasses: ({ readOnly }) => ({
    paddingTop: 16,
    paddingBottom: 16,
    background: readOnly ? "transparent" : "white"
  }),
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
  validators?: Validator[];
  defaultValue?: string;
  readOnly?: boolean;
  required?: boolean;
}

const InputText = (props: InputTextProps) => {
  const { label, className, name, form, password, validators, defaultValue, readOnly, required } = props;
  const classes = useStyles({ readOnly });

  return (
    <>
      <TextField
        defaultValue={defaultValue}
        name={name}
        className={className}
        variant="filled"
        error={!!form.errors[name]}
        helperText={form.errors[name] && form.errors[name].message}
        label={label}
        fullWidth={props.fullWidth}
        type={password ? "password" : "text"}
        inputRef={form.register({
          required: required === undefined ? true : required,
          validate: combineValidator(validators || [])
        })}
        InputProps={{
          classes: {
            input: classes.inputClasses
          },
          readOnly: !!readOnly
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
