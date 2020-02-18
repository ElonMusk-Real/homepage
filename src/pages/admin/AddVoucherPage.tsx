import React from "react";
import { connect } from "react-redux";
import { Typography, Grid, makeStyles, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";

import InputText from "../../components/forms/InputText";
import { minLength, maxLength, minValue, maxValue, isNumber } from "../../modules/validation";
import { VoucherInsertForm, addVoucher } from "../../modules/api/voucherAPI";

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

interface AddVoucherPageProps {
  onAddVoucher: (form: VoucherInsertForm) => Promise<void>;
}

const AddVoucherPage = (props: AddVoucherPageProps) => {
  const { handleSubmit, ...form } = useForm();

  const classes = useStyles();

  const handleCreate = (data) => {
    const { voucherCode, discountRate, maxDiscount, minBox } = data;
    const form: VoucherInsertForm = {
      voucherCode,
      discountRate: +discountRate,
      maxDiscount: +maxDiscount,
      minBox: +minBox
    };
    props.onAddVoucher(form);
  };

  return (
    <Grid item xs={11} md={6}>
      <Grid container justify="center">
        <Typography variant="body1" className={classes.text} display="block">
          Add new Voucher
        </Typography>
        <form onSubmit={handleSubmit(handleCreate)}>
          <InputText
            name="voucherCode"
            className={classes.paddingv}
            fullWidth
            label="Voucher Code"
            form={form}
            validators={[minLength(3), maxLength(30)]}
          />
          <InputText
            name="discountRate"
            className={classes.paddingv}
            fullWidth
            label="Discount Rate (%)"
            form={form}
            validators={[isNumber, minValue(0), maxValue(100)]}
          />
          <InputText
            name="maxDiscount"
            className={classes.paddingv}
            fullWidth
            label="Max Discount (Rp)"
            form={form}
            validators={[isNumber, minValue(0)]}
          />
          <InputText
            name="minBox"
            className={classes.paddingv}
            fullWidth
            label="Min Box"
            form={form}
            validators={[isNumber, minValue(0)]}
          />
          <Button type="submit" className={classes.marginv} fullWidth variant="contained" color="inherit">
            Create
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = { onAddVoucher: addVoucher };

export default connect(undefined, mapDispatchToProps)(AddVoucherPage);
