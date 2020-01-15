import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles, Grid } from "@material-ui/core";
import queryString from "query-string";

import { fetchSnacks, Snack } from "../modules/api/snacksAPI";
import ProductCard from "../components/ProductCard";
import { Pagination } from "../modules/api/pagination";
import PaginationControl from "../components/PaginationControl";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { isArray } from "util";

const useStyles = makeStyles({
  container: {
    marginTop: 32
  },
  paginationControl: {
    marginTop: 20
  }
});

interface SnacksPageProps extends RouteComponentProps<{}> {
  fetchSnacks: (rowsPerPage?: number, page?: number, q?: string) => Promise<Pagination<Snack>>;
}

const SnacksPage = (props: SnacksPageProps) => {
  const rowsPerPage = 12;
  const classes = useStyles();
  const { fetchSnacks } = props;
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const q = queryString.parse(props.location.search).q || "";

  useEffect(() => {
    fetchSnacks(rowsPerPage, page - 1, isArray(q) ? q[0] : q).then((pagedData) => {
      setSnacks(pagedData.data);
      setPageCount(Math.ceil(pagedData.total / rowsPerPage));
    });
  }, [page]);

  const handleChangePage = (page: number) => {
    setPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <Grid className={classes.container} container justify="center">
        <Grid item xs={10}>
          <Grid container justify="center" spacing={4}>
            {snacks.map((snack) => {
              return (
                <Grid item>
                  <ProductCard snack={snack} />
                </Grid>
              );
            })}
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
const mapDispatchToProps = { fetchSnacks };

export default withRouter(connect(undefined, mapDispatchToProps)(SnacksPage));
