import React from "react";
import { makeStyles, InputLabel, Select, MenuItem, FormControl } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    backgroundColor: "#F8EAEA",
    minHeight: "100vh",
    paddingTop: 64,
    maxWidth: "100%"
  },
  debug: {
    border: "1px solid black"
  },
  text: {
    padding: 48
  },
  separator: {
    height: 24
  },
  formControl: {
    minWidth: 120
  },
  padding: {
    padding: 12
  }
});

interface Props {
  listMenu: Record<string, any>[];
  label: string;
  onChange: any;
}

const Dropdown: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-helper">{props.label}</InputLabel>
        <Select
          inputProps={{
            name: "age",
            id: "age-helper"
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {props.listMenu.map((value, index) => {
            return <MenuItem>value</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;
