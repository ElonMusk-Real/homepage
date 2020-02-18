import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Typography, Grid, makeStyles, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";

import InputText from "../../components/forms/InputText";
import { minLength, maxLength, minValue, maxValue, isNumber } from "../../modules/validation";
import { VoucherUpdateForm, updateVoucher, getVoucher, Voucher } from "../../modules/api/voucherAPI";
import { RouteComponentProps, withRouter } from "react-router-dom";

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

interface EditVoucherPageProps extends RouteComponentProps<ParamMatch> {
  onUpdateVoucher: (id: number, form: VoucherUpdateForm) => Promise<void>;
  onGetVoucher: (id: number) => Promise<Voucher>;
}

const EditVoucherPage = (props: EditVoucherPageProps) => {
  const { handleSubmit, ...form } = useForm();

  const classes = useStyles();

  const id = +props.match.params.id;
  form.watch();

  const setVoucher = (voucher: Voucher) => {
    form.setValue("voucherCode", voucher.voucherCode);
    form.setValue("discountRate", voucher.discountRate);
    form.setValue("maxDiscount", voucher.maxDiscount);
    form.setValue("minBox", voucher.minBox);
  };

  useEffect(() => {
    props.onGetVoucher(id).then(setVoucher);
  }, []);

  const handleUpdate = (data) => {
    const { voucherCode, discountRate, maxDiscount, minBox } = data;
    const form: VoucherUpdateForm = {
      voucherCode,
      discountRate: +discountRate,
      maxDiscount: +maxDiscount,
      minBox: +minBox
    };
    props.onUpdateVoucher(id, form);
  };

  return (
    <Grid item xs={11} md={6}>
      <Grid container justify="center">
        <Typography variant="body1" className={classes.text} display="block">
          Edit Voucher
        </Typography>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <InputText
            name="voucherCode"
            className={classes.paddingv}
            fullWidth
            label="Voucher Code"
            form={form}
            validators={[minLength(3), maxLength(30)]}
            defaultValue="Loading..."
          />
          <InputText
            name="discountRate"
            className={classes.paddingv}
            fullWidth
            label="Discount Rate (%)"
            form={form}
            validators={[isNumber, minValue(0), maxValue(100)]}
            defaultValue="Loading..."
          />
          <InputText
            name="maxDiscount"
            className={classes.paddingv}
            fullWidth
            label="Max Discount (Rp)"
            form={form}
            validators={[isNumber, minValue(0)]}
            defaultValue="Loading..."
          />
          <InputText
            name="minBox"
            className={classes.paddingv}
            fullWidth
            label="Min Box"
            form={form}
            validators={[isNumber, minValue(0)]}
            defaultValue="Loading..."
          />
          <Button type="submit" className={classes.marginv} fullWidth variant="contained" color="inherit">
            Update
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = { onUpdateVoucher: updateVoucher, onGetVoucher: getVoucher };

export default withRouter(connect(undefined, mapDispatchToProps)(EditVoucherPage));
