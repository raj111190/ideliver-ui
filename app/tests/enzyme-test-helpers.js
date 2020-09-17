/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */

import React from 'react';
import { IntlProvider, intlShape } from 'react-intl';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// You can pass your messages to the IntlProvider. Optional: remove if unneeded.
const messages = require('../js/intl/en'); // en.json

// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider = new IntlProvider({ locale: 'en', messages }, {});
const { intl } = intlProvider.getChildContext();

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
const nodeWithIntlProp = node => React.cloneElement(node, { intl });

// Instantiate router context
const router = {
  history: new MemoryRouter().history,
  route: {
    location: {},
    match: {},
  },
};

const createRouterContext = () => ({
  router,
});

/**
 * Export these methods.
 */
export const shallowWithIntl = node =>
  shallow(nodeWithIntlProp(node), { context: { intl } });

export const mountWithIntl = node =>
  mount(nodeWithIntlProp(node), {
    context: { intl },
    childContextTypes: { intl: intlShape },
  });

export const mountWithIntlAndStore = (node, store) =>
  mount(nodeWithIntlProp(node), {
    context: { intl, store },
    childContextTypes: { intl: intlShape, store: () => null },
  });

export const mountWithStore = (node, store) => {
  const context = {
    store,
  };
  return mount(node, { context });
};

export const shallowWithStore = (node, store) => {
  const context = {
    store,
  };
  return shallow(node, { context });
};

export const shallowWithRouter = node => {
  const context = createRouterContext();
  return shallow(nodeWithIntlProp(node), { context });
};

export const mountWithRouter = node => {
  const context = createRouterContext();
  const childContextTypes = {
    router: PropTypes.shape({}),
  };
  return mount(nodeWithIntlProp(node), { context, childContextTypes });
};

export const shallowWithRouterAndIntl = node => {
  const context = createRouterContext();
  return shallow(nodeWithIntlProp(node), { context: { intl, ...context } });
};

export const mountWithRouterAndIntl = node => {
  const context = createRouterContext();
  const childContextTypes = {
    router: PropTypes.shape({}),
    intl: intlShape,
  };
  return mount(nodeWithIntlProp(node), {
    context: { intl, ...context },
    childContextTypes,
  });
};

export const mountWithIntlStoreRouter = (node, store) => {
  const context = createRouterContext();
  const childContextTypes = {
    router: PropTypes.shape({}),
    intl: intlShape,
    store: () => null,
  };
  return mount(nodeWithIntlProp(node), {
    context: { intl, store, ...context },
    childContextTypes,
  });
};

export const createMockSvg = (width, height) => {
  const svg = document.createElement('svg');
  Object.assign(svg.style, {
    width: `${width}px`,
    height: `${height}px`,
  });
  // we have to mock this for jsdom.
  svg.getBoundingClientRect = () => ({
    width,
    height,
    top: 0,
    left: 0,
    right: width,
    bottom: height,
  });
  return svg;
};
