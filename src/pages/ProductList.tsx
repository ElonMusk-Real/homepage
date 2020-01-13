import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles, Grid, Button } from "@material-ui/core";
import ProductCard from "../components/ProductCard";

import { fetchSnacks, Snack } from "../modules/api/snacksAPI";
const useStyles = makeStyles({
  container: {
    backgroundColor: "#F8EAEA",
    minHeight: "100vh",
    paddingTop: 64
  },
  debug: {
    border: "1px solid black"
  },
  text: {
    padding: 48
  },
  separator: {
    height: 24
  },
  formControl: {
    minWidth: 120
  },
  padding: {
    padding: 12
  },
  paddingDropdown: {
    paddingBottom: 6
  }
});

interface ProductListProps {
  fetchSnacks: () => Promise<Snack[]>;
}

const ProductList = (props: ProductListProps) => {
  const classes = useStyles();
  const { fetchSnacks } = props;
  const [snacks, setSnacks] = useState<Snack[]>([]);

  useEffect(() => {
    fetchSnacks().then(snacks => {
      setSnacks(snacks);
    });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.separator}></div>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Grid container justify="center" className={classes.padding}>
            <Grid item className={classes.padding}>
              <Button variant="contained" color="primary">
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Grid container justify="center" spacing={4}>
            {snacks.map(snacks => {
              return (
                <Grid item>
                  <ProductCard name={snacks.name} price={snacks.price} address={snacks.address} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.separator}></div>
    </div>
  );
};
const mapDispatchToProps = { fetchSnacks };

export default connect(undefined, mapDispatchToProps)(ProductList);
