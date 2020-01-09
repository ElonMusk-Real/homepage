import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles, Table, TableHead, TableRow, TableCell, TableBody, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import { fetchAllProfile, Profile } from "../modules/api/usersAPI";
import Container from "../components/Container";
import { Pagination } from "../modules/api/pagination";

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
  const classes = useStyles();

  useEffect(() => {
    fetchAllProfile().then((pagedData) => {
      setData(pagedData.data);
    });
  }, []);

  return (
    <Container>
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
          </Table>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapDispatchToProps = { fetchAllProfile };

export default connect(undefined, mapDispatchToProps)(ProfileListPage);
