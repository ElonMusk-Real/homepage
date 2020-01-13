import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles, Table, TableHead, TableRow, TableCell, TableBody, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import { fetchSellers, Seller } from "../../modules/api/sellersAPI";
import { Pagination } from "../../modules/api/pagination";

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

interface SellerListPageProps {
  fetchSellers: () => Promise<Pagination<Seller>>;
}

const SellerListPage = (props: SellerListPageProps) => {
  const { fetchSellers } = props;
  const [data, setData] = useState<Seller[]>([]);
  const classes = useStyles();

  useEffect(() => {
    fetchSellers().then((pagedData) => {
      setData(pagedData.data);
    });
  }, []);

  return (
    <Grid direction="column">
      <Grid>
        <Link to="/sellers/add">
          <Button color="primary" variant="contained" className={classes.addButton}>
            Add new Seller
          </Button>
        </Link>
      </Grid>
      <Grid>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.numberCell}>Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>
                  <Link to={`/sellers/edit/${row.id}`}>
                    <Button>Edit</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = { fetchSellers };

export default connect(undefined, mapDispatchToProps)(SellerListPage);
