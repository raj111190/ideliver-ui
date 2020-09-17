import React from 'react';
import { IntlProvider } from 'react-intl';
import { mountWithIntl, shallowWithIntl } from '../../enzyme-test-helpers';
import VcTimePicker from '../../../js/components/vcTimePicker/vcTimePicker';
import TimeKeeper from 'react-timekeeper';

describe('VcTimePicker', () => {
  // Construct a new `IntlProvider` instance by passing `props` and
  // `context` as React would, then call `getChildContext()` to get the
  // React Intl API, complete with the `format*()` functions.
  const intlProvider = new IntlProvider({ locale: 'en' }, {});
  const { intl } = intlProvider.getChildContext();

  it('renders without crashing', () => {
    const component = shallowWithIntl(<VcTimePicker label="enter time" />);
    expect(component).toBeDefined();
  });

  it('renders clock field without crashing', () => {
    const component = mountWithIntl(
      <VcTimePicker.WrappedComponent intl={intl} label="enter time" />
    );
    expect(component.find('TextField').exists()).toBe(true);
  });

  it('should change state on click on the time field', () => {
    const component = mountWithIntl(
      <VcTimePicker.WrappedComponent intl={intl} label="enter time" />
    );

    const button = component.find('TextField').at(0);

    expect(component.state()).toEqual({
      displayTimepicker: false,
    });

    button.simulate('click');
    expect(component.state()).toEqual({
      displayTimepicker: true,
    });

    component.unmount();
  });

  it('should change state on click away', () => {
    const component = mountWithIntl(
      <VcTimePicker.WrappedComponent intl={intl} label="enter time" />
    );

    const button = component.find('TextField').at(0);
    button.simulate('click');
    const away = component.find('ClickAwayListener').getElement();

    expect(component.state()).toEqual({
      displayTimepicker: true,
    });

    away.props.onClickAway({}, {});
    expect(component.state()).toEqual({
      displayTimepicker: false,
    });
    button.simulate('click');
    expect(component.state()).toEqual({
      displayTimepicker: true,
    });

    const clock = component.find(TimeKeeper).at(0);
    const done = clock.find('span').at(15);
    done.simulate('click');

    expect(component.state()).toEqual({
      displayTimepicker: false,
    });
  });
});
