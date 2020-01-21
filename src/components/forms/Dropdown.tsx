import React, { useEffect } from "react";
import { makeStyles, InputLabel, Select, MenuItem, FormControl, FormHelperText } from "@material-ui/core";

const useStyles = makeStyles({
  formControl: {
    marginBottom: 8,
    width: "100%"
  }
});

interface DropdownProps {
  listMenu: any;
  label: string;
  name: string;
  form: any;
  defaultValue?: string;
  readOnly?: boolean;
}

const Dropdown = (props: DropdownProps) => {
  const classes = useStyles();
  const { listMenu, label, form, name, readOnly } = props;

  useEffect(() => {
    form.register(
      {
        name,
        type: "text"
      },
      {
        required: true
      }
    );

    return () => form.unregister(name);
  }, []);

  form.watch(name);
  const values = form.getValues();

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-helper">{label}</InputLabel>
        <Select
          error={!!form.errors[name]}
          autoWidth={true}
          name={name}
          inputProps={{ readOnly: !!readOnly }}
          value={values[name] || ""}
          onChange={(e) => {
            form.setValue(name, e.target.value);
          }}
        >
          {Object.keys(listMenu).map((key) => {
            return (
              <MenuItem key={key} value={key}>
                {listMenu[key]}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>{form.errors[name] && form.errors[name].message}</FormHelperText>
      </FormControl>
    </>
  );
};

export default Dropdown;
