import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActionArea, Button, Grid, Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";
import Skeleton from "@material-ui/lab/Skeleton";

import QuantityButton from "./QuantityButton";
import { BASE_API } from "../modules/api/http";
import { Snack } from "../modules/api/snacksAPI";
import LazyCardMediaImage from "./LazyCardMediaImage";

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
  onFetch: boolean;
}

const ImagePlaceHolder = () => {
  const classes = useStyles();

  return <Skeleton variant="rect" className={classes.media} />;
};

const ProductCard = (props: ProductCardProps) => {
  const { name, price, quantity, image } = props.snack;
  const { onFetch } = props;
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.container}>
        {onFetch && <CardMedia component={ImagePlaceHolder} />}
        {!onFetch && (
          <CardMedia
            component={() => (
              <LazyCardMediaImage
                className={classes.media}
                src={image ? `${BASE_API}/file/public/${image}` : "https://cdn-2.tstatic.net/default-2.jpg"}
              />
            )}
          />
        )}
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom>{onFetch ? <Skeleton variant="text" /> : name}</Typography>
            <Typography color="primary" variant="h6">
              <b>{onFetch ? <Skeleton variant="text" /> : <>Rp. {price.toLocaleString()}</>}</b>
            </Typography>

            <Grid container direction="row" justify="space-between" alignItems="center">
              <Grid className={classes.desc}>
                {onFetch ? <Skeleton variant="text" width={80} /> : <>{quantity} / box</>}
              </Grid>
              <Grid>
                {onFetch ? (
                  <Skeleton variant="text" width={40} />
                ) : (
                  <QuantityButton snackId={props.snack.id} quantity={props.quantity} />
                )}
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default ProductCard;
