import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles, Grid, Typography, CircularProgress } from "@material-ui/core";
import queryString from "query-string";
import ld from "lodash";
import delay from "delay";

import { fetchSnacks, Snack } from "../modules/api/snacksAPI";
import ProductCard from "../components/ProductCard";
import { Pagination } from "../modules/api/pagination";
import PaginationControl from "../components/PaginationControl";
import { CartSnack, fetchCart } from "../modules/api/cartAPI";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { isArray } from "util";

const useStyles = makeStyles({
  container: {
    marginTop: 32
  },
  paginationControl: {
    marginTop: 20
  },
  info: {
    marginTop: 200
  }
});

interface SnacksPageProps extends RouteComponentProps<{}> {
  fetchSnacks: (rowsPerPage?: number, page?: number, q?: string) => Promise<Pagination<Snack>>;
  fetchCart: () => Promise<CartSnack[]>;
}

const SnacksPage = (props: SnacksPageProps) => {
  const rowsPerPage = 12;
  const classes = useStyles();
  const { fetchSnacks, fetchCart } = props;
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [cart, setCart] = useState<CartSnack[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [fetched, setFetched] = useState(false);
  const [onFetch, setOnFetch] = useState(false);

  const q = queryString.parse(props.location.search).q || "";

  useEffect(() => {
    fetchSnacks(rowsPerPage, page - 1, isArray(q) ? q[0] : q).then((pagedData) => {
      setSnacks(pagedData.data);
      setPageCount(Math.ceil(pagedData.total / rowsPerPage));
      setFetched(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      delay(500).then(() => setOnFetch(false));
    });
  }, [page]);

  useEffect(() => {
    fetchCart().then(setCart);
  }, []);

  const handleChangePage = (page: number) => {
    setPage(page);
    setOnFetch(true);
  };

  const idToCart = ld.keyBy(cart, "id");

  const renderSnacks = () =>
    snacks.map((snack) => {
      return (
        <Grid item>
          <ProductCard
            snack={snack}
            quantity={idToCart[snack.id] ? idToCart[snack.id].quantity : 0}
            onFetch={onFetch}
          />
        </Grid>
      );
    });

  const renderLoading = () => (
    <Grid container direction="column" justify="center" alignItems="center" className={classes.info}>
      <Grid>
        <CircularProgress />
      </Grid>
      <Grid>
        <Typography variant="h6">Loading</Typography>
      </Grid>
    </Grid>
  );

  const renderNotFound = () => (
    <Typography className={classes.info} variant="h6">
      Oops, snack not found
    </Typography>
  );

  return (
    <>
      <Grid className={classes.container} container justify="center">
        <Grid item xs={10}>
          <Grid container justify="center" spacing={4}>
            {renderSnacks()}
            {fetched && snacks.length === 0 && renderNotFound()}
            {!fetched && renderLoading()}
          </Grid>
        </Grid>
      </Grid>
      <PaginationControl
        className={classes.paginationControl}
        page={page}
        pageCount={pageCount}
        onPageChange={handleChangePage}
      />
    </>
  );
};
const mapDispatchToProps = { fetchSnacks, fetchCart };

export default withRouter(connect(undefined, mapDispatchToProps)(SnacksPage));
