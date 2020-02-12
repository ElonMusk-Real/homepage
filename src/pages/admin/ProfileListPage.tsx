import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  TableFooter,
  TablePagination
} from "@material-ui/core";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";

import { fetchAllProfile, Profile } from "../../modules/api/usersAPI";
import { Pagination } from "../../modules/api/pagination";

const useStyles = makeStyles({
  table: {
    width: 1000
  },
  numberCell: {
    width: 10
  }
});

interface ProfileListPageProps {
  fetchAllProfile: () => Promise<Pagination<Profile>>;
}

const ProfileListPage = (props: ProfileListPageProps) => {
  const { fetchAllProfile } = props;
  const [data, setData] = useState<Profile[]>([]);
  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const classes = useStyles();

  const handleChangePage = (event, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchAllProfile().then((pagedData) => {
      setData(pagedData.data);
      setTotal(pagedData.total);
    });
  }, [page, rowsPerPage]);

  return (
    <Grid direction="column">
      <Grid>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.numberCell}>Number</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Line Id</TableCell>
              <TableCell>University</TableCell>
              <TableCell>Faculty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>{row.lineId}</TableCell>
                <TableCell>{row.university}</TableCell>
                <TableCell>{row.faculty}</TableCell>
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

        <Table className={classes.table} aria-label="simple table"></Table>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = { fetchAllProfile };

export default connect(undefined, mapDispatchToProps)(ProfileListPage);
