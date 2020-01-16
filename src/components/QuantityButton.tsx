import React, { useState, useEffect } from "react";
import { Button, Grid, Icon, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";
import { connect } from "react-redux";

import { upsertCart, UpsertCartForm } from "../modules/api/cartAPI";

const useStyles = makeStyles({
  addButton: {
    backgroundColor: green[700],
    "&:hover": {
      backgroundColor: green[900]
    },
    color: "white"
  },
  quantityButton: {
    color: "#4ee44e"
  },
  quantityText: {
    color: "black"
  }
});

export interface QuantityButtonProps {
  snackId: number;
  quantity: number;
  upsertCart: (upsertCartForm: UpsertCartForm) => Promise<void>;
}

const QuantityButton = (props: QuantityButtonProps) => {
  const { snackId } = props;
  const [quantity, setQuantity] = useState(0);
  const classes = useStyles();

  useEffect(() => setQuantity(props.quantity), [props.quantity]);

  const handleIncrease = () => {
    const increasedQuantity = quantity + 1;
    props.upsertCart({ snackId, quantity: increasedQuantity }).then(() => {
      setQuantity(increasedQuantity);
    });
  };

  const handleDecrease = () => {
    const decreasedQuantity = quantity - 1;
    props.upsertCart({ snackId, quantity: decreasedQuantity }).then(() => {
      setQuantity(decreasedQuantity);
    });
  };

  if (quantity === 0) {
    return (
      <Button size="small" className={classes.addButton} onClick={handleIncrease}>
        <Icon>add</Icon> Add
      </Button>
    );
  } else {
    return (
      <Grid direction="row" container>
        <ButtonGroup size="small" color="primary" aria-label="outlined primary button group">
          <Button size="small" className={classes.quantityButton} onClick={handleDecrease}>
            <Icon>remove</Icon>
          </Button>
          <Button disabled>
            <span className={classes.quantityText}>{quantity}</span>
          </Button>
          <Button size="small" className={classes.quantityButton} onClick={handleIncrease}>
            <Icon>add</Icon>
          </Button>
        </ButtonGroup>
      </Grid>
    );
  }
};

const mapDispatchToProps = { upsertCart };

export default connect(undefined, mapDispatchToProps)(QuantityButton);
