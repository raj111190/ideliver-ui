/** This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import es from 'react-intl/locale-data/es';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from './store';
import routes from './routes';
import theme from '../css/MUI_theme';
import '../fonts/index.css';
import enMessages from './intl/en.json';
import esMessages from './intl/es.json';
import frMessages from './intl/fr.json';

// Our translated strings
const localeData = {
  en: enMessages,
  es: esMessages,
  fr: frMessages,
};

addLocaleData([...en, ...es, ...fr]);

// Define user's language. Different browsers have the user locale defined
// on different fields on the `navigator` object, so we make sure to account
// for these different by checking all of them
const language =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

// Try full locale, try locale without region code, fallback to 'en'
const messages =
  localeData[languageWithoutRegionCode] ||
  localeData[language] ||
  localeData.en;

// Render our root component into the div with id "root"
// We select the messages to pass to IntlProvider based on the user's locale
export default render(
  [
    <CssBaseline key="reboot" />,
    <MuiThemeProvider key="themeProvider" theme={theme}>
      <Provider store={store()}>
        <IntlProvider
          defaultLocale={language}
          locale={language}
          messages={messages}
        >
          <HashRouter hashType="noslash">{routes()}</HashRouter>
        </IntlProvider>
      </Provider>
    </MuiThemeProvider>,
  ],
  document.getElementById('app')
);
