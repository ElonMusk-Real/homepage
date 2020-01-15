import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {},
  overrides: {
    MuiButton: {
      root: {
        minWidth: 40
      }
    }
  }
});

export default theme;
