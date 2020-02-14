import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Grid,
  TableFooter,
  TablePagination
} from "@material-ui/core";
import { Link } from "react-router-dom";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";

import { fetchSnacks, Snack } from "../../modules/api/snackAPI";
import { Pagination } from "../../modules/api/pagination";
import { BASE_API } from "../../modules/api/http";

const useStyles = makeStyles({
  table: {
    width: 1000
  },
  numberCell: {
    width: 10
  },
  addButton: {
    margin: 16
  }
});

interface SnackListPageProps {
  fetchSnacks: (rowsPerPage?: number, page?: number, q?: string) => Promise<Pagination<Snack>>;
}

const SnackListPage = (props: SnackListPageProps) => {
  const { fetchSnacks } = props;
  const [data, setData] = useState<Snack[]>([]);
  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    fetchSnacks(rowsPerPage, page).then((pagedData) => {
      setData(pagedData.data);
      setTotal(pagedData.total);
    });
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid direction="column">
      <Grid>
        <Link to="/admin/snacks/add">
          <Button color="primary" variant="contained" className={classes.addButton}>
            Add new Snack
          </Button>
        </Link>
      </Grid>
      <Grid>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.numberCell}>Number</TableCell>
              <TableCell>Seller</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Selling Price</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1 + page * rowsPerPage}</TableCell>
                <TableCell>{row.seller}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price.toLocaleString()}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.stock}</TableCell>
                <TableCell>{row.sellingPrice.toLocaleString()}</TableCell>
                <TableCell>
                  {(row.image && <img height={40} src={`${BASE_API}/file/public/${row.image}`} />) || "-"}
                </TableCell>

                <TableCell>
                  <Link to={`/admin/snacks/edit/${row.id}`}>
                    <Button>Edit</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = { fetchSnacks };

export default connect(undefined, mapDispatchToProps)(SnackListPage);
