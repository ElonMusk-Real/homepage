import { createMuiTheme } from "@material-ui/core/styles";
import { yellow } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    secondary: yellow
  },
  overrides: {
    MuiButton: {
      root: {
        minWidth: 40
      }
    }
  }
});

export default theme;
