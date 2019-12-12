//#region 'NPM DEP'
import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
//#endregion

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: {
      main: '#baa524'
    },
    background: {
      default: '#D3D3D3'
    }
  },
  typography: {
    fontFamily: 'Comfortaa, cursive'
  }
});

export default theme;
