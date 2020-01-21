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

import { Pagination } from "../../modules/api/pagination";
import { BASE_API } from "../../modules/api/http";
import { fetchTransaction, TransactionWithUser, TransactionStatuses } from "../../modules/api/transactionAPI";
import UpdateTransactionStatusDialog from "../../components/UpdateTransactionStatusDialog";

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

interface TransactionListPageProps {
  onFetchTransaction: (rowsPerPage?: number, page?: number) => Promise<Pagination<TransactionWithUser>>;
}

const TransactionListPage = (props: TransactionListPageProps) => {
  const { onFetchTransaction } = props;
  const [data, setData] = useState<TransactionWithUser[]>([]);
  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogId, setDialogId] = useState(0);
  const classes = useStyles();

  const handleUpdateData = () =>
    onFetchTransaction(rowsPerPage, page).then((pagedData) => {
      setData(pagedData.data);
      setTotal(pagedData.total);
    });

  useEffect(() => {
    handleUpdateData();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fixDate = (date: string | null) => date && new Date(date).toLocaleDateString();

  const fixDateTime = (date: string | null) => date && new Date(date).toLocaleString();

  const handleDialogOpen = (id: number) => {
    setDialogId(id);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    handleUpdateData();
  };

  return (
    <>
      <Grid direction="column">
        <Grid>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.numberCell}>ID</TableCell>
                <TableCell>User</TableCell>
                <TableCell>price</TableCell>
                <TableCell>date time</TableCell>
                <TableCell>location</TableCell>
                <TableCell>startedDateTime</TableCell>
                <TableCell>transferImage</TableCell>
                <TableCell>status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    <Grid>Name: {row.name}</Grid>
                    <Grid>Email: {row.email}</Grid>
                    <Grid>Line: {row.lineId || "-"}</Grid>
                    <Grid>Phone: {row.phoneNumber || "-"}</Grid>
                  </TableCell>
                  <TableCell>Rp. {row.price.toLocaleString()}</TableCell>
                  <TableCell>
                    {fixDate(row.date)}
                    <br />
                    {row.time}
                  </TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{fixDateTime(row.startedDateTime)}</TableCell>
                  <TableCell>
                    {(row.transferImage && <img height={40} src={`${BASE_API}/file/public/${row.transferImage}`} />) ||
                      "-"}
                    <br />
                    {fixDateTime(row.uploadedDateTime)}
                  </TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    {row.status !== TransactionStatuses.Done && (
                      <Button onClick={() => handleDialogOpen(row.id)}>Update</Button>
                    )}
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
      <UpdateTransactionStatusDialog id={dialogId} open={dialogOpen} onClose={handleDialogClose} />
    </>
  );
};

const mapDispatchToProps = {
  onFetchTransaction: fetchTransaction
};

export default connect(undefined, mapDispatchToProps)(TransactionListPage);