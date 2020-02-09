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
import fibkopma from "../assets/fibkopma.jpg";
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
    "RIK : Pos Satpam": fksatpam,
    "RIK : Pos Satpam Gedung C": fksatpamgdc,
    "FMIPA : Kantin": mipa,
    "Fasilkom Gedung Lama : Meja Danus": pacillama,
    "Fasilkom Gedung Baru : Satpam Aula": pacilbarusatpam2,
    "FH : Meja Kantin Lantai 2 ": fhmejakantin,
    "FEB : Koperasi": febkoperasi,
    "FEB : Fotokopi": febfotokopi,
    "FIB : Kopma": fibkopma,
    "F.Psi : Atk Gedung H": fpsiatkgdh,
    "FISIP : PAU FISIP UI": fisippau,
    "FIA : PAU FISIP UI": fisippau
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
