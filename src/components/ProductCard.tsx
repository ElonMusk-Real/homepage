import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActionArea } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { BASE_API } from "../modules/api/http";

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

interface ProductCardProps {
  name: string;
  price: number;
  address: string;
  image: string | null;
}

const ProductCard = (props: ProductCardProps) => {
  const { name, price, address, image } = props;
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
              <b>Rp {price.toLocaleString()}</b>
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
