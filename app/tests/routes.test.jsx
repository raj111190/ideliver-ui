import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { createMockStore } from 'redux-test-utils';
import { fromJS } from 'immutable';
import Routes from '../js/routes';
import { APP_PATHNAME } from '../js/paths';
import Main from '../js/main';
import VisitsContainer from '../js/features/visits/visitsContainer';

describe('Routes', () => {
  let store;
  let component;
  let testState;

  beforeEach(() => {
    testState = {
      Demo: { name: 'test' },
      Visits: fromJS({ list: [] }),
    };
    store = createMockStore(testState);
  });

  it('renders Main', () => {
    component = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <MemoryRouter initialEntries={[APP_PATHNAME]}>
            <Routes />
          </MemoryRouter>
        </IntlProvider>
      </Provider>
    );
    expect(component).toBeTruthy();
    expect(component.find(Main)).toHaveLength(1);
  });

  it('renders tasks and Main', () => {
    component = shallow(
      <Provider store={store}>
        <IntlProvider locale="en">
          <MemoryRouter initialEntries={['/tasks']}>
            <Routes />
          </MemoryRouter>
        </IntlProvider>
      </Provider>
    );
    expect(component).toBeTruthy();
    expect(component.find(Main)).toBeDefined();
  });

  it('renders home and Main', () => {
    component = shallow(
      <Provider store={store}>
        <IntlProvider locale="en">
          <MemoryRouter initialEntries={['/visits']}>
            <Routes />
          </MemoryRouter>
        </IntlProvider>
      </Provider>
    );
    expect(component).toBeTruthy();
    expect(component.find(VisitsContainer)).toBeDefined();
    expect(component.find(Main)).toBeDefined();
  });
});
