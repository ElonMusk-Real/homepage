import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles, Table, TableHead, TableRow, TableCell, TableBody, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import { fetchSnacks, Snack } from "../modules/api/snacksAPI";

const useStyles = makeStyles({
  table: {
    width: 1000
  },
  numberCell: {
    width: 10
  }
});

interface SnackListPageProps {
  fetchSnacks: () => Promise<Snack[]>;
}

const SnackListPage = (props: SnackListPageProps) => {
  const { fetchSnacks } = props;
  const [data, setData] = useState<Snack[]>([]);
  const classes = useStyles();

  useEffect(() => {
    fetchSnacks().then((snacks) => {
      setData(snacks);
    });
  }, []);

  return (
    <Grid direction="column">
      <Grid>
        <Link to="/snacks/add">
          <Button color="primary" variant="contained">
            Add new Snack
          </Button>
        </Link>
      </Grid>
      <Grid>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.numberCell}>Number</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Seller</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Selling Price</TableCell>
              <TableCell>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.seller}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.sellingPrice}</TableCell>
                <TableCell>{row.image}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = { fetchSnacks };

export default connect(undefined, mapDispatchToProps)(SnackListPage);
