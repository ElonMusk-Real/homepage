import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Avatar, Button } from "@material-ui/core";
import { connect } from "react-redux";

import { getMyProfile, Profile } from "../modules/api/user/myProfileAPI";
import { useForm } from "react-hook-form";
import InputText from "../components/forms/InputText";
import { minLength, maxLength, isEmail } from "../modules/validation";
import Dropdown from "../components/forms/Dropdown";
import { green } from "@material-ui/core/colors";
import { updateProfile, UserUpdateForm } from "../modules/api/user/updateProfileAPI";

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
  avatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  avatarContainer: {
    padding: 20
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

interface ProfilePageProps {
  getMyProfile: () => Promise<Profile>;
  updateProfile: (arg0: UserUpdateForm) => Promise<void>;
}

const ProfilePage = (props: ProfilePageProps) => {
  const classes = useStyles();
  const { handleSubmit, ...form } = useForm();
  const [editMode, setEditMode] = useState(false);
  const [initial, setInitial] = useState("??");

  form.watch();

  const getInitial = (name: string) => {
    const removedSpace = name.replace(" ", "").toUpperCase();
    if (removedSpace.length <= 2) {
      return removedSpace;
    }

    return removedSpace.slice(0, 2);
  };

  const setProfile = (profile: Profile) => {
    form.setValue("email", profile.email);
    form.setValue("name", profile.name);
    form.setValue("university", profile.university);
    form.setValue("faculty", profile.faculty);
    form.setValue("lineId", profile.lineId);
    form.setValue("phoneNumber", profile.phoneNumber);
    setInitial(getInitial(profile.name));
  };

  const onSave = (data) => {
    const { email, name, university, faculty, lineId, phoneNumber } = data;
    const profile: UserUpdateForm = { email, name, university, faculty, lineId, phoneNumber };
    props.updateProfile(profile).then(() => {
      setInitial(getInitial(name));
      setEditMode(false);
    });
  };

  useEffect(() => {
    props.getMyProfile().then(setProfile);
  }, []);

  return (
    <div className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={11} md={6}>
          <Grid container justify="center">
            <div className={classes.avatarContainer}>
              <Avatar className={classes.avatar}>{initial}</Avatar>
            </div>
            <form onSubmit={handleSubmit(onSave)}>
              <Grid container justify="center">
                <InputText
                  name="email"
                  className={classes.paddingv}
                  fullWidth
                  label="email"
                  form={form}
                  validators={[minLength(5), maxLength(50), isEmail]}
                  defaultValue="Loading..."
                  readOnly={!editMode}
                />
                <InputText
                  name="name"
                  className={classes.paddingv}
                  fullWidth
                  label="name"
                  form={form}
                  validators={[minLength(3), maxLength(30)]}
                  defaultValue="Loading..."
                  readOnly={!editMode}
                />
                <InputText
                  name="lineId"
                  className={classes.paddingv}
                  fullWidth
                  label="Line ID"
                  form={form}
                  validators={[minLength(0), maxLength(20)]}
                  defaultValue="Loading..."
                  readOnly={!editMode}
                  required={false}
                />
                <InputText
                  name="phoneNumber"
                  className={classes.paddingv}
                  fullWidth
                  label="Phone Number"
                  form={form}
                  validators={[minLength(0), maxLength(20)]}
                  defaultValue="Loading..."
                  readOnly={!editMode}
                  required={false}
                />
                <Dropdown
                  name="university"
                  listMenu={{ "Universitas Indonesia": "Universitas Indonesia" }}
                  label="University"
                  form={form}
                  defaultValue={"Loading..."}
                  readOnly={!editMode}
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
                  defaultValue={"Loading..."}
                  readOnly={!editMode}
                />
                {editMode && (
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: green[500],
                      color: "white"
                    }}
                    onClick={() => {}}
                    variant="contained"
                  >
                    Save
                  </Button>
                )}
              </Grid>
            </form>
            {editMode || (
              <Button onClick={() => setEditMode(true)} color="primary" variant="contained">
                Edit Profile
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapDispatchToProps = { getMyProfile, updateProfile };

export default connect(undefined, mapDispatchToProps)(ProfilePage);
