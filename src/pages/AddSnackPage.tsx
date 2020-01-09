import React from "react";
import { connect } from "react-redux";
import { Typography, Grid, makeStyles, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";

import InputText from "../components/forms/InputText";
import { minLength, maxLength, isEmail, isNumber } from "../modules/validation";
import { addSnack, InsertSnackForm } from "../modules/api/snacksAPI";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    paddingTop: 64
  },
  debug: {
    border: "1px solid black"
  },
  text: {
    padding: 48
  },
  paddingv: {
    paddingTop: 6,
    paddingBottom: 6
  },
  marginv: {
    marginTop: 6,
    marginBottom: 6
  }
});

interface AddSnackPageProps {
  addSnack: (insertSnackForm: InsertSnackForm) => Promise<void>;
}

const AddSnackPage = (props: AddSnackPageProps) => {
  const { handleSubmit, ...form } = useForm();

  const classes = useStyles();

  const handleCreate = data => {
    const { sellerId, name, price, quantity, sellingPrice, image } = data;
    const insertSnackForm: InsertSnackForm = { sellerId, name, price, quantity, sellingPrice };
    console.log("Ini Datanya");
    console.log(insertSnackForm);
    props.addSnack(insertSnackForm);
  };

  return (
    <div className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={11} md={6}>
          <Grid container justify="center">
            <Typography variant="body1" className={classes.text} display="block">
              Add new Snack
            </Typography>
            <form onSubmit={handleSubmit(handleCreate)}>
              <InputText
                name="sellerId"
                className={classes.paddingv}
                fullWidth
                label="Seller Id"
                form={form}
                validators={[isNumber]}
              />
              <InputText
                name="name"
                className={classes.paddingv}
                fullWidth
                label="Name"
                form={form}
                validators={[minLength(3), maxLength(30)]}
              />
              <InputText
                name="price"
                className={classes.paddingv}
                fullWidth
                label="Price"
                form={form}
                validators={[isNumber]}
              />
              <InputText
                name="quantity"
                className={classes.paddingv}
                fullWidth
                label="Quantity"
                form={form}
                validators={[isNumber]}
              />
              <InputText
                name="sellingPrice"
                className={classes.paddingv}
                fullWidth
                label="Selling Price"
                form={form}
                validators={[isNumber]}
              />
              <InputText
                name="image"
                className={classes.paddingv}
                fullWidth
                label="Image"
                form={form}
                validators={[]}
              />
              <Button type="submit" className={classes.marginv} fullWidth variant="contained" color="inherit">
                Create
              </Button>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapDispatchToProps = { addSnack };

export default connect(undefined, mapDispatchToProps)(AddSnackPage);
