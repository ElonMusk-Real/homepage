import React from "react";
import { makeStyles, Grid, Button } from "@material-ui/core";
import ProductCard from "../components/ProductCard";
import Dropdown from "../components/Dropdown";

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

interface Props {}

const ProductList: React.FC<Props> = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    category: "",
    maxPrice: 0,
    searchQuery: ""
  });
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <div className={classes.container}>
      <div className={classes.separator}></div>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Grid container justify="center" className={classes.padding}>
            <Grid item className={classes.paddingDropdown}>
              <Dropdown listMenu={[{ null: null }]} label="Category" onChange={null} />
            </Grid>
            <Grid item className={classes.padding}>
              <Button variant="contained" color="primary">
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Grid container justify="center" spacing={4}>
            {list.map((value, index) => {
              return (
                <Grid item>
                  <ProductCard />
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
export default ProductList;
