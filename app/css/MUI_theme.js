import { createMuiTheme } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import theme from './theme.scss';

const MUI_theme = createMuiTheme({
  palette: {
    primary: { main: theme.dark_lavender, contrastText: theme.white },
    secondary: { main: theme.mediumaquamarine, contrastText: theme.white },
    textSecondary: lightGreen,
    inherit: theme.grey,
    doctorNotes: theme.red,
  },
  typography: {
    useNextVariants: true,
    h3: {
      fontSize: '40px',
    },
    h2: {
      width: '100%',
      fontSize: '12px',
      color: '#757575 !important',
      fontWeight: 'normal !important',
      margin: '0 !important',
      left: '0px !important',
      top: '0px !important',
      height: '16px !important',
    },
  },
});

export default MUI_theme;
