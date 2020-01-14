import React, { useState } from "react";
import { TextField, makeStyles, InputAdornment, IconButton } from "@material-ui/core";
import { combineValidator, Validator } from "../../modules/validation";
import clsx from "clsx";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles({
  inputClasses: ({ readOnly }) => ({
    background: readOnly ? "transparent" : "white"
  }),
  container: {
    marginBottom: 8,
    marginTop: 8
  },
  showPassword: {
    backgroundColor: "white"
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

  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <TextField
        defaultValue={defaultValue}
        name={name}
        className={clsx([classes.inputClasses, classes.container, className])}
        variant="outlined"
        error={!!form.errors[name]}
        helperText={form.errors[name] && form.errors[name].message}
        label={label}
        fullWidth={props.fullWidth}
        type={password && !showPassword ? "password" : "text"}
        inputRef={form.register({
          required: required === undefined ? true : required,
          validate: combineValidator(validators || [])
        })}
        InputProps={{
          classes: {
            input: classes.inputClasses
          },
          readOnly: !!readOnly,
          endAdornment: password && (
            <InputAdornment className={classes.showPassword} position="end">
              <IconButton
                className={classes.showPassword}
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </>
  );
};

export default InputText;
