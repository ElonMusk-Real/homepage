import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Typography, Grid, makeStyles, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";

import InputText from "../../components/forms/InputText";
import { minLength, maxLength, isNumber } from "../../modules/validation";
import { addSnack, InsertSnackForm } from "../../modules/api/snacksAPI";
import { fetchAllSellers, IdToName } from "../../modules/api/sellersAPI";
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

interface AddSnackPageProps {
  addSnack: (insertSnackForm: InsertSnackForm) => Promise<void>;
  fetchAllSellers: () => Promise<IdToName[]>;
}

const AddSnackPage = (props: AddSnackPageProps) => {
  const { fetchAllSellers } = props;
  const { handleSubmit, ...form } = useForm();
  const [allMenu, setAllMenu] = useState({});
  const classes = useStyles();

  useEffect(() => {
    fetchAllSellers().then((idtonames) => {
      let tempIdtoNames = {};
      idtonames.map((idtoname) => {
        tempIdtoNames[idtoname.id] = idtoname.name;
      });
      setAllMenu(tempIdtoNames);
    });
  }, []);

  const handleCreate = (data) => {
    const { sellerId, name, price, quantity, stock, sellingPrice, image } = data;
    const insertSnackForm: InsertSnackForm = image[0]
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
    props.addSnack(insertSnackForm);
  };

  return (
    <Grid item xs={11} md={6}>
      <Grid container justify="center">
        <Typography variant="body1" className={classes.text} display="block">
          Add new Snack
        </Typography>
        <form onSubmit={handleSubmit(handleCreate)}>
          <Dropdown name="sellerId" listMenu={allMenu} label="Seller Id" form={form} />
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
            name="stock"
            className={classes.paddingv}
            fullWidth
            label="Stock"
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
          <InputFile name="image" className={classes.paddingv} fullWidth label="Image" form={form} required={false} />
          <Button type="submit" className={classes.marginv} fullWidth variant="contained" color="inherit">
            Create
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = { addSnack, fetchAllSellers };

export default connect(undefined, mapDispatchToProps)(AddSnackPage);
