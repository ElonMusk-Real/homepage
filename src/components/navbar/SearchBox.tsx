import React, { useState, useEffect } from "react";
import { IconButton, makeStyles, Theme, createStyles, InputAdornment, InputBase } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { RouteComponentProps, withRouter } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles";
import queryString from "query-string";
import { isArray } from "util";
import { isMobile } from "react-device-detect";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.8),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.9)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
      }
    },
    clearSearchButton: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    inputAdornment: {
      width: 20,
      marginRight: 5
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 200
      }
    }
  })
);

interface SearchBoxProps extends RouteComponentProps<{}> {
  onClose: () => void;
}

const SearchBox = (props: SearchBoxProps) => {
  const [searchText, setSearchText] = useState("");
  const classes = useStyles();

  const isMatch = (menuURL: string) => props.location.pathname.split("/")[1] === menuURL.split("/")[1];

  const isQueryStringExists = !!queryString.parse(props.location.search).q;
  const isSnackPage = isMatch("/snacks");
  const isSnackSearchPage = isSnackPage && isQueryStringExists;

  useEffect(() => {
    const q = queryString.parse(props.location.search).q || "";
    setSearchText(isArray(q) ? q[0] : q);
  }, [props.location.pathname, props.location.search]);

  const handleClearSearchText = () => {
    setSearchText("");
    isSnackPage && props.history.push("/snacks");
    isMobile && props.onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      props.history.push(`/snacks?q=${searchText}`);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        onKeyDown={handleKeyDown}
        inputProps={{ "aria-label": "search" }}
        value={searchText}
        onChange={handleSearchChange}
        endAdornment={
          isSnackSearchPage || isMobile ? (
            <InputAdornment className={classes.inputAdornment} position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClearSearchText}>
                <div className={classes.clearSearchButton}>
                  <ClearIcon />
                </div>
              </IconButton>
            </InputAdornment>
          ) : (
            <InputAdornment className={classes.inputAdornment} position="end"></InputAdornment>
          )
        }
      />
    </div>
  );
};

export default withRouter(SearchBox);
