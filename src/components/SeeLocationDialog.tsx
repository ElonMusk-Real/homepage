import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Divider, Button, Grid, makeStyles } from "@material-ui/core";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import febfotokopi from "../assets/febfotokopi.jpg";
import febkoperasi from "../assets/febkoperasi.jpg";
import fksatpam from "../assets/fksatpam.jpg";
import fksatpamgdc from "../assets/fksatpamgdc.jpg";
import fhmejakantin from "../assets/fhmejakantin.jpg";
import fisippau from "../assets/fisippau.jpg";
import fpsiatkgdh from "../assets/fpsiatkgdh.jpg";
import mipa from "../assets/mipa.jpg";
import pacilbarusatpam from "../assets/pacilbarusatpam.jpg";
import pacilbarusatpam2 from "../assets/pacilbarusatpam2.jpg";
import pacillama from "../assets/pacillama.jpg";

interface SeeLocationDialogProps {
  location: string | undefined;
  open: boolean;
  onClose: () => void;
}

const useStyle = makeStyles({
  image: {
    maxHeight: 512
  }
});

const SeeLocationDialog = (props: SeeLocationDialogProps) => {
  const { location, open, onClose } = props;
  const classes = useStyle();
  const images = {
    "Fakultas Ekonomi dan Bisnis Fotokopi": febfotokopi,
    "Fakultas Ekonomi dan Bisnis Koperasi": febkoperasi,
    "Rumpun Ilmu Kesehatan Pos Satpam": fksatpam,
    "Rumpun Ilmu Kesehatan Pos Satpam Gedung C": fksatpamgdc,
    "Fakultas Psikologi Atk Gedung H": fpsiatkgdh,
    "Fakultas Matematika dan Ilmu Pengetahuan Alam": mipa,
    "Fakultas Ilmu Komputer Gedung Baru": pacilbarusatpam2,
    "Fakultas Ilmu Komputer Gedung Lama": pacillama,
    "Fakultas Hukum": fhmejakantin,
    "Fakultas Ilmu Sosial dan Ilmu Politik": fisippau,
    "Fakultas Ilmu Administrasi": fisippau
  };
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Destination Point Location</DialogTitle>
      <DialogContent>
        {location && (
          <>
            <img src={images[location]} className={classes.image} alt="" />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default SeeLocationDialog;
