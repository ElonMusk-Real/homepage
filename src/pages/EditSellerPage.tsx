import React from "react";
import { connect } from "react-redux";
import { Typography, Grid, makeStyles, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";

import InputText from "../components/forms/InputText";
import { minLength, maxLength } from "../modules/validation";
import { addSeller, InsertSellerForm } from "../modules/api/sellersAPI";
import { withRouter, RouteComponentProps } from "react-router-dom";

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

interface ParamMatch {
  id: string;
}

interface EditSellerPageProps extends RouteComponentProps<ParamMatch> {
  addSeller: (insertSellerForm: InsertSellerForm) => Promise<void>;
}

const EditSellerPage = (props: EditSellerPageProps) => {
  const { handleSubmit, ...form } = useForm();

  const classes = useStyles();

  const handleCreate = (data) => {
    const { name, phoneNumber, address } = data;
    const insertSellerForm: InsertSellerForm = { name, phoneNumber, address };
    props.addSeller(insertSellerForm);
  };

  return (
    <div className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={11} md={6}>
          <Grid container justify="center">
            <Typography variant="body1" className={classes.text} display="block">
              Add new Seller
            </Typography>
            <form onSubmit={handleSubmit(handleCreate)}>
              <InputText
                name="name"
                className={classes.paddingv}
                fullWidth
                label="Name"
                form={form}
                validators={[minLength(3), maxLength(30)]}
              />
              <InputText
                name="phoneNumber"
                className={classes.paddingv}
                fullWidth
                label="Phone Number"
                form={form}
                validators={[minLength(3), maxLength(30)]}
              />
              <InputText
                name="address"
                className={classes.paddingv}
                fullWidth
                label="Address"
                form={form}
                validators={[minLength(3), maxLength(30)]}
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

const mapDispatchToProps = { addSeller };

export default withRouter(connect(undefined, mapDispatchToProps)(EditSellerPage));
