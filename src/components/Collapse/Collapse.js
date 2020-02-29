import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./Collapse.css";
import { AutoComplete } from "material-ui";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  }
}));

const styles = {
  marginTop: "20px",
  width: "95%",
  marginLeft: "auto",
  marginRight: "auto",
  color: "#6c676c"
};

export default function ControlledExpansionPanels() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="kolaps" className={classes.root}>
      <ExpansionPanel
        style={styles}
        className="kolapspanel"
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <p className={classes.heading}>Apa itu natadanus?</p>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <p>
            Natadanus adalah platform yang berfokus mengembangkan wirausaha
            mahasiswa melalui jasa menghubungkan mahasiswa dengan penjual
            snackbox.
          </p>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        style={styles}
        className="kolapspanel"
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <p className={classes.heading}>
            Bagaimana cara bertransaksi di natadanus?
          </p>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <p>
            Kamu bisa daftar terlebih dahulu menjadi user, kemudian ikuti alur
            transaksi yang tersedia, setelah itu ambil box di jam dan tempat
            yang sudah ditentukan.
          </p>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        style={styles}
        className="kolapspanel"
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <p className={classes.heading}>
            Apakah jika saya beli snackbox perlu bertemu dengan seller?
          </p>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <p>
            Kamu tidak perlu bertemu dengan seller karena kami
            sudah menyediakan destination point untuk seller menaruh box tanpa melakukan pertemuan.
          </p>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        style={styles}
        className="kolapspanel"
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <p className={classes.heading}>
            Bagaimana cara memasarkan barang di natadanus?
          </p>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <p>
            Kamu bisa langsung menghubungi natadanus di Instagram: @natadanus.
            Setelah itu kamu pihak kami akan membantu untuk memasangkan barang
            kamu :)
          </p>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
