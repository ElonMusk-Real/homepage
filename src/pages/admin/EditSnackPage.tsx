import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Typography, Grid, makeStyles, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { withRouter, RouteComponentProps } from "react-router-dom";

import InputText from "../../components/forms/InputText";
import { minLength, maxLength, isNumber } from "../../modules/validation";
import { updateSnack, RawSnack, getSnack, SnackUpdateForm } from "../../modules/api/snackAPI";
import { fetchAllSellers, IdToName } from "../../modules/api/sellerAPI";
import Dropdown from "../../components/forms/Dropdown";
import InputFile from "../../components/forms/InputFile";

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

interface EditSnackPageProps extends RouteComponentProps<ParamMatch> {
  updateSnack: (id: number, updateSnackForm: SnackUpdateForm) => Promise<void>;
  fetchAllSellers: () => Promise<IdToName[]>;
  getSnack: (id: number) => Promise<RawSnack>;
}

const EditSnackPage = (props: EditSnackPageProps) => {
  const { fetchAllSellers } = props;
  const { handleSubmit, ...form } = useForm();
  const id = +props.match.params.id;
  const [allMenu, setAllMenu] = useState({});
  const classes = useStyles();
  form.watch();

  useEffect(() => {
    fetchAllSellers().then((idtonames) => {
      let tempIdtoNames = {};
      idtonames.map((idtoname) => {
        tempIdtoNames[idtoname.id] = idtoname.name;
      });
      setAllMenu(tempIdtoNames);
    });
  }, []);

  const setSnack = (snack: RawSnack) => {
    form.setValue("name", snack.name);
    form.setValue("price", snack.price);
    form.setValue("quantity", snack.quantity);
    form.setValue("stock", snack.stock);
    form.setValue("sellingPrice", snack.sellingPrice);
    form.setValue("sellerId", snack.sellerId);
  };

  useEffect(() => {
    props.getSnack(id).then(setSnack);
  }, [allMenu]);

  const handleUpdate = (data) => {
    const { sellerId, name, price, quantity, stock, sellingPrice, image } = data;
    const updateSnackForm: SnackUpdateForm = image[0]
      ? {
          sellerId,
          name,
          price,
          quantity,
          stock,
          sellingPrice,
          image: image[0]
        }
      : {
          sellerId,
          name,
          price,
          quantity,
          stock,
          sellingPrice
        };
    props.updateSnack(id, updateSnackForm);
  };

  return (
    <Grid item xs={11} md={6}>
      <Grid container justify="center">
        <Typography variant="body1" className={classes.text} display="block">
          Add new Snack
        </Typography>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <Dropdown name="sellerId" listMenu={allMenu} label="Seller Id" form={form} defaultValue={""} />
          <InputText
            name="name"
            className={classes.paddingv}
            fullWidth
            label="Name"
            form={form}
            validators={[minLength(3), maxLength(30)]}
            defaultValue="Loading..."
          />
          <InputText
            name="price"
            className={classes.paddingv}
            fullWidth
            label="Price"
            form={form}
            validators={[isNumber]}
            defaultValue="Loading..."
          />
          <InputText
            name="quantity"
            className={classes.paddingv}
            fullWidth
            label="Quantity"
            form={form}
            validators={[isNumber]}
            defaultValue="Loading..."
          />
          <InputText
            name="stock"
            className={classes.paddingv}
            fullWidth
            label="Stock"
            form={form}
            validators={[isNumber]}
            defaultValue="Loading..."
          />
          <InputText
            name="sellingPrice"
            className={classes.paddingv}
            fullWidth
            label="Selling Price"
            form={form}
            validators={[isNumber]}
            defaultValue="Loading..."
          />
          <InputFile name="image" className={classes.paddingv} fullWidth label="Image" form={form} required={false} />
          <Button type="submit" className={classes.marginv} fullWidth variant="contained" color="inherit">
            Update
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = { updateSnack, fetchAllSellers, getSnack };

export default withRouter(connect(undefined, mapDispatchToProps)(EditSnackPage));
