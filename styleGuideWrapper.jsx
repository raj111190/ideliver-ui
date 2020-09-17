import React from 'react';
import { IntlProvider } from 'react-intl';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './app/css/MUI_theme';

const Wrapper = props => (
  <MuiThemeProvider theme={theme}>
    <IntlProvider locale="en">{props.children}</IntlProvider>{' '}
  </MuiThemeProvider>
);

export default Wrapper;
