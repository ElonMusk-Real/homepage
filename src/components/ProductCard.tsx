import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActionArea, Button, Grid, Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { BASE_API } from "../modules/api/http";
import { Snack } from "../modules/api/snacksAPI";
import { green } from "@material-ui/core/colors";
import QuantityButton from "./QuantityButton";

const useStyles = makeStyles({
  container: {
    maxWidth: 240
  },
  media: {
    height: 180,
    width: 320
  },
  placeText: {},
  desc: {
    marginTop: 5,
    fontSize: 15,
    marginBottom: 20
  },
  addButton: {
    backgroundColor: green[700],
    "&:hover": {
      backgroundColor: green[900]
    },
    color: "white"
  }
});

interface ProductCardProps {
  snack: Snack;
  quantity: number;
}

const ProductCard = (props: ProductCardProps) => {
  const { name, price, quantity, image, estimatedProfit } = props.snack;
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.container}>
        <CardMedia
          className={classes.media}
          component="img"
          image={image ? `${BASE_API}/file/public/${image}` : "https://via.placeholder.com/640x480"}
        />
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom>{name}</Typography>
            <Typography color="primary" variant="h6">
              <b>Rp. {price.toLocaleString()}</b>
            </Typography>

            <Grid container direction="row" justify="space-between" alignItems="center">
              <Grid className={classes.desc}>{quantity} / box</Grid>
              <Grid>
                <QuantityButton snackId={props.snack.id} quantity={props.quantity} />
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default ProductCard;
