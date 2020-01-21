import React from "react";
import { Drawer as DrawerMUI, Button, ListItem, ListItemIcon, ListItemText, Icon } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import InputText from "../components/forms/InputText";
import { useForm } from "react-hook-form";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      height: 140,
      width: 100
    },
    control: {
      padding: theme.spacing(2)
    },
    container: {
      margin: 20,
      width: "auto"
    },
    paddingv: {
      paddingTop: 6,
      paddingBottom: 6
    },
    marginv: {
      marginTop: 6,
      marginBottom: 6
    },
    paddingh: {
      paddingLeft: 20,
      paddingRight: 20
    },
    pinkbox: {
      paddingTop: 50,
      width: "100%",
      minHeight: "35vh",
      background: "linear-gradient(90deg, #E73361 0%, #9A1675 100%)"
    },
    contactus: {
      marginBottom: 20,
      textAlign: "center",
      marginLeft: "10vw",
      fontFamily: "Rounded Mplus 1c Bold",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "24px",
      lineHeight: "36px",
      color: "#FFFFFF"
    },
    address: {
      marginLeft: 20,
      marginRight: 20,
      fontFamily: "Rounded Mplus 1c Bold",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "12px",
      lineHeight: "18px",
      textAlign: "center",
      color: "#FFFFFF"
    },
    pesan: {
      fontFamily: "Rounded Mplus 1c Bold",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "21px",
      textAlign: "center",
      color: "#FFFFFF"
    },
    email: {
      fontFamily: "Rounded Mplus 1c Bold",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "12px",
      lineHeight: "18px",
      textAlign: "center",
      color: "#FFFFFF"
    }
  })
);

const Contacts = () => {
  const { handleSubmit, ...form } = useForm();
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.pinkbox}>
        <Grid>
          <Grid className={classes.contactus}>Contact Us</Grid>
        </Grid>
        <Grid>
          <Grid className={classes.address}>
            Jl Kompos, No.19, RT 11/RW 08, Lenteng Agung Jagakarsa, Jakarta Selatan 12630{" "}
          </Grid>

          <Grid className={classes.pesan}>Tinggalkan Pesan</Grid>

          <Grid container direction="row" justify="center" alignItems="center">
            <Icon>mailoutline</Icon>
            <Grid className={classes.email}>nataeventplatform@gmail.com</Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid>
        <form>
          <InputText form={form} name="name" className={classes.paddingv} fullWidth label="Name" />
          <InputText form={form} name="email" className={classes.paddingv} fullWidth label="Email" />
          <InputText form={form} name="message" className={classes.paddingv} fullWidth label="Message" />
          <Button
            className={clsx([classes.marginv, classes.paddingh])}
            type="submit"
            fullWidth
            variant="contained"
            color="inherit"
          >
            Send Message
          </Button>
        </form>
      </Grid>
    </>
  );
};

export default Contacts;
