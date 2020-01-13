import React from "react";
import { connect } from "react-redux";
import { Typography, Grid, makeStyles, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";

import InputText from "../components/forms/InputText";
import { registerUser, UserRegistrationForm } from "../modules/api/usersAPI";
import { minLength, maxLength, isEmail } from "../modules/validation";
import Dropdown from "../components/forms/Dropdown";

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

interface RegisterPageProps {
  registerUser: (userRegistrationForm: UserRegistrationForm) => Promise<void>;
}

const RegisterPage = (props: RegisterPageProps) => {
  const { handleSubmit, ...form } = useForm();

  const classes = useStyles();

  const handleRegister = (data) => {
    const { email, name, password, university, faculty } = data;
    const userRegistrationForm: UserRegistrationForm = { email, name, password, university, faculty };
    props.registerUser(userRegistrationForm);
  };

  return (
    <Grid item xs={11} md={6}>
      <Grid container justify="center">
        <Typography variant="body1" className={classes.text} display="block">
          Register your email here to get our best offer
        </Typography>
        <form onSubmit={handleSubmit(handleRegister)}>
          <InputText
            name="email"
            className={classes.paddingv}
            fullWidth
            label="email"
            form={form}
            validators={[minLength(5), maxLength(50), isEmail]}
          />
          <InputText
            name="name"
            className={classes.paddingv}
            fullWidth
            label="name"
            form={form}
            validators={[minLength(3), maxLength(30)]}
          />
          <InputText
            name="password"
            className={classes.paddingv}
            fullWidth
            label="password"
            password
            form={form}
            validators={[minLength(8), maxLength(16)]}
          />
          <Dropdown
            name="university"
            listMenu={{ "Universitas Indonesia": "Universitas Indonesia" }}
            label="University"
            form={form}
          />
          <Dropdown
            name="faculty"
            listMenu={{
              "Fakultas Kedokteran": "Fakultas Kedokteran",
              "Fakultas Kedokteran Gigi": "Fakultas Kedokteran Gigi",
              "Fakultas Farmasi": "Fakultas Farmasi",
              "Fakultas Kesehatan Masyarakat": "Fakultas Kesehatan Masyarakat",
              "Fakultas Ilmu Keperawatan": "Fakultas Ilmu Keperawatan",
              "Fakultas Matematika dan Ilmu Pengetahuan Alam": "Fakultas Matematika dan Ilmu Pengetahuan Alam",
              "Fakultas Teknik": "Fakultas Teknik",
              "Fakultas Ilmu Komputer": "Fakultas Ilmu Komputer",
              "Fakultas Hukum": "Fakultas Hukum",
              "Fakultas Ekonomi dan Bisnis": "Fakultas Ekonomi dan Bisnis",
              "Fakultas Ilmu Pengetahuan Budaya": "Fakultas Ilmu Pengetahuan Budaya",
              "Fakultas Psikologi": "Fakultas Psikologi",
              "Fakultas Ilmu Sosial dan Ilmu Politik": "Fakultas Ilmu Sosial dan Ilmu Politik",
              "Fakultas Ilmu Administrasi": "Fakultas Ilmu Administrasi"
            }}
            label="Faculty"
            form={form}
          />
          <Button type="submit" className={classes.marginv} fullWidth variant="contained" color="inherit">
            Register
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = { registerUser };

export default connect(undefined, mapDispatchToProps)(RegisterPage);
