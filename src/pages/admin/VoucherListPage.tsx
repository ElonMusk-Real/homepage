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
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import { Link } from "react-router-dom";

import { Pagination } from "../../modules/api/pagination";
import { Voucher, fetchVouchers } from "../../modules/api/voucherAPI";

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

interface VoucherListPageProps {
  onFetchVouchers: (rowsPerPage?: number, page?: number) => Promise<Pagination<Voucher>>;
}

const VoucherListPage = (props: VoucherListPageProps) => {
  const { onFetchVouchers } = props;
  const [data, setData] = useState<Voucher[]>([]);
  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    onFetchVouchers(rowsPerPage, page).then((pagedData) => {
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
        <Link to="/admin/vouchers/add">
          <Button color="primary" variant="contained" className={classes.addButton}>
            Add new Voucher
          </Button>
        </Link>
      </Grid>
      <Grid>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.numberCell}>Number</TableCell>
              <TableCell>Voucher Code</TableCell>
              <TableCell>Discount Rate</TableCell>
              <TableCell>Max Discount</TableCell>
              <TableCell>Min Box</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1 + rowsPerPage * page}</TableCell>
                <TableCell>{row.voucherCode}</TableCell>
                <TableCell>{row.discountRate}</TableCell>
                <TableCell>{row.maxDiscount}</TableCell>
                <TableCell>{row.minBox}</TableCell>
                <TableCell>
                  <Link to={`/admin/vouchers/edit/${row.id}`}>
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

const mapDispatchToProps = { onFetchVouchers: fetchVouchers };

export default connect(undefined, mapDispatchToProps)(VoucherListPage);
