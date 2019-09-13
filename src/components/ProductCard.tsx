import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActionArea } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  container: {
    maxWidth: 240
  },
  media: {
    height: 180,
    width: 320
  },
  placeText: {},
  perBox: {
    fontSize: 18,
    color: "black",
    display: "block"
  }
});

interface Props {}

const ProductCard: React.FC<Props> = () => {
  const classes = useStyles();
  const address = "Komplek BIG Kavling A no 12 Limo, Grogol, Depok";
  console.log(address.length);
  return (
    <div>
      <Card className={classes.container}>
        <CardMedia className={classes.media} component="img" image="https://via.placeholder.com/640x480" />
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom>Kue Danus</Typography>
            <Typography color="primary" variant="h6">
              <b>Rp 30.000</b>
              <span className={classes.perBox}>per box</span>
            </Typography>
            <Typography className={classes.placeText} variant="caption">
              {address.length > 40 ? `${address.substring(0, 40)}...` : address}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default ProductCard;
