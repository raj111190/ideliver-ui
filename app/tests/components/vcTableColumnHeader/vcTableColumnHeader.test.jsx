import React from 'react';
import { IntlProvider } from 'react-intl';
import VcTableColumnHeader from '../../../js/components/vcTableColumnHeader/vcTableColumnHeader';
import { mountWithIntl, shallowWithIntl } from '../../enzyme-test-helpers';

describe('VcTableColumnHeader', () => {
  // Construct a new `IntlProvider` instance by passing `props` and
  // `context` as React would, then call `getChildContext()` to get the
  // React Intl API, complete with the `format*()` functions.
  const intlProvider = new IntlProvider({ locale: 'en' }, {});
  const { intl } = intlProvider.getChildContext();

  let mockFunc, mockFunc2;
  beforeEach(() => {
    mockFunc = jest.fn();
    mockFunc2 = jest.fn();
  });

  it('renders without crashing', () => {
    const component = shallowWithIntl(
      <VcTableColumnHeader.WrappedComponent
        intl={intl}
        value="filterAndSort"
        sortable
        filterOptions={['test0', 'test1', 'test2', 'test3', 'test4', 'test5']}
        filtersSelected={[0, 4, 5]}
        isStatus="every"
        filterLabels={['Intake', 'ANC', 'PNC', 'Labor', 'Not at clinic']}
      >
        test
      </VcTableColumnHeader.WrappedComponent>
    );
    expect(component).toBeDefined();
  });

  it('should change state on clicking button', () => {
    const component = mountWithIntl(
      <VcTableColumnHeader.WrappedComponent
        intl={intl}
        value="filterAndSort"
        sortable
        filterOptions={['test0', 'test1', 'test2', 'test3', 'test4', 'test5']}
        filtersSelected={[0, 4, 5]}
        isStatus="every"
        filterLabels={['Intake', 'ANC', 'PNC', 'Labor', 'Not at clinic']}
      >
        test
      </VcTableColumnHeader.WrappedComponent>
    );
    const button = component.find('Button').at(0);

    expect(component.state()).toEqual({ open: false });
    button.simulate('click');

    expect(component.state()).toEqual({ open: true });
  });

  it('should change state on click away', () => {
    const component = mountWithIntl(
      <VcTableColumnHeader.WrappedComponent
        intl={intl}
        onSort={mockFunc2}
        onFilter={mockFunc}
        value="filterAndSort"
        sortable
        filterOptions={['test0', 'test1', 'test2', 'test3', 'test4', 'test5']}
        filtersSelected={[0, 4, 5]}
        isStatus="every"
        filterLabels={['Intake', 'ANC', 'PNC', 'Labor', 'Not at clinic']}
      >
        test
      </VcTableColumnHeader.WrappedComponent>
    );

    const openButton = component.find('Button').at(0);

    openButton.simulate('click');

    const away = component.find('ClickAwayListener').getElement();

    expect(component.state()).toEqual({ open: true });

    away.props.onClickAway({}, {});

    openButton.simulate('click');
    expect(component.state()).toEqual({ open: false });

    away.props.onClickAway({}, {});
  });

  it('should fire sort action', () => {
    const component = mountWithIntl(
      <VcTableColumnHeader.WrappedComponent
        intl={intl}
        onSort={mockFunc}
        value="Sort"
        sortable
        isStatus="every"
        filterLabels={['Intake', 'ANC', 'PNC', 'Labor', 'Not at clinic']}
      >
        test
      </VcTableColumnHeader.WrappedComponent>
    );

    const sortButton = component.find('Button').at(1);
    sortButton.simulate('click');

    expect(mockFunc.mock.calls.length).toBe(1);
  });
});
