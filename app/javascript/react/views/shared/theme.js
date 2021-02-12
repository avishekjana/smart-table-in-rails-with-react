import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      ...blue
    },
    secondary: {
      ...orange
    },
  }
});

export default theme;
