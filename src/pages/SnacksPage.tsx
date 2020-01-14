import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles, Grid, Button } from "@material-ui/core";

import { fetchSnacks, Snack } from "../modules/api/snacksAPI";
import ProductCard from "../components/ProductCard";
import { Pagination } from "../modules/api/pagination";
import PaginationControl from "../components/PaginationControl";

const useStyles = makeStyles({
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
  },
  paginationControl: {
    marginTop: 20
  }
});

interface SnacksPageProps {
  fetchSnacks: (rowsPerPage?: number, page?: number) => Promise<Pagination<Snack>>;
}

const SnacksPage = (props: SnacksPageProps) => {
  const rowsPerPage = 12;
  const classes = useStyles();
  const { fetchSnacks } = props;
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    fetchSnacks(rowsPerPage, page - 1).then((pagedData) => {
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
            {snacks.map((snacks) => {
              return (
                <Grid item>
                  <ProductCard name={snacks.name} price={snacks.price} address={snacks.address} image={snacks.image} />
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

export default connect(undefined, mapDispatchToProps)(SnacksPage);
