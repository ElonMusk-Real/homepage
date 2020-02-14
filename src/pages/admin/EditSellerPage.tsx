import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Typography, Grid, makeStyles, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { withRouter, RouteComponentProps } from "react-router-dom";

import InputText from "../../components/forms/InputText";
import { minLength, maxLength } from "../../modules/validation";
import { getSeller, Seller, updateSeller, SellerUpdateForm } from "../../modules/api/sellerAPI";

const useStyles = makeStyles({
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
  getSeller: (id: number) => Promise<Seller>;
  updateSeller: (id: number, updateSellerForm: SellerUpdateForm) => Promise<void>;
}

const EditSellerPage = (props: EditSellerPageProps) => {
  const { handleSubmit, ...form } = useForm();
  const id = +props.match.params.id;
  const classes = useStyles();
  form.watch();

  const handleUpdate = (data) => {
    const { name, phoneNumber, address } = data;
    const updateSellerForm: SellerUpdateForm = { name, phoneNumber, address };
    props.updateSeller(id, updateSellerForm);
  };

  const setSeller = (seller: Seller) => {
    form.setValue("name", seller.name);
    form.setValue("phoneNumber", seller.phoneNumber);
    form.setValue("address", seller.address);
  };

  useEffect(() => {
    props.getSeller(id).then(setSeller);
  }, []);

  return (
    <Grid item xs={11} md={6}>
      <Grid container justify="center">
        <Typography variant="body1" className={classes.text} display="block">
          Edit Seller
        </Typography>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <InputText
            name="name"
            className={classes.paddingv}
            fullWidth
            label="Name"
            form={form}
            validators={[minLength(3), maxLength(30)]}
            defaultValue={"Loading..."}
          />
          <InputText
            name="phoneNumber"
            className={classes.paddingv}
            fullWidth
            label="Phone Number"
            form={form}
            validators={[minLength(3), maxLength(30)]}
            defaultValue={"Loading..."}
          />
          <InputText
            name="address"
            className={classes.paddingv}
            fullWidth
            label="Address"
            form={form}
            validators={[minLength(3), maxLength(30)]}
            defaultValue={"Loading..."}
          />
          <Button type="submit" className={classes.marginv} fullWidth variant="contained" color="inherit">
            Update
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = { getSeller, updateSeller };

export default withRouter(connect(undefined, mapDispatchToProps)(EditSellerPage));
