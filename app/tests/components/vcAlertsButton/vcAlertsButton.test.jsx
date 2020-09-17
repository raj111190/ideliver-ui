import React from 'react';
import { IntlProvider } from 'react-intl';
import { mountWithIntl, shallowWithIntl } from '../../enzyme-test-helpers';
import VcAlertsButton from '../../../js/components/vcAlertsButton/vcAlertsButton';

describe('VcAlertsButton', () => {
  // Construct a new `IntlProvider` instance by passing `props` and
  // `context` as React would, then call `getChildContext()` to get the
  // React Intl API, complete with the `format*()` functions.
  const intlProvider = new IntlProvider({ locale: 'en' }, {});
  const { intl } = intlProvider.getChildContext();

  it('renders without crashing', () => {
    const component = shallowWithIntl(
      <VcAlertsButton.WrappedComponent
        intl={intl}
        alerts={[
          { value: 'Test Alert 1 lalalal' },
          { value: 'Test Alert 2 Trololo' },
          { value: 'Test Alert 3 iiiihiiii' },
        ]}
      />
    );
    expect(component).toBeDefined();
  });

  it('renders badge without crashing', () => {
    const component = mountWithIntl(
      <VcAlertsButton.WrappedComponent
        intl={intl}
        alerts={[
          { value: 'Test Alert 1 lalalal' },
          { value: 'Test Alert 2 Trololo' },
          { value: 'Test Alert 3 iiiihiiii' },
        ]}
      />
    );
    expect(component.find('Badge').exists()).toBe(true);
  });

  it('doesnt render badge when no alerts present', () => {
    const component = mountWithIntl(
      <VcAlertsButton.WrappedComponent intl={intl} alerts={[]} />
    );
    expect(component.find('Badge').exists()).toBe(false);
  });

  it('should change state on click on the Avatar', () => {
    const component = mountWithIntl(
      <VcAlertsButton.WrappedComponent
        intl={intl}
        alerts={[
          { value: 'Test Alert 1 lalalal' },
          { value: 'Test Alert 2 Trololo' },
          { value: 'Test Alert 3 iiiihiiii' },
        ]}
      />
    );

    const button = component.find('Avatar').at(0);

    expect(component.state()).toEqual({ open: false });

    button.simulate('click');
    expect(component.state()).toEqual({ open: true });

    button.simulate('click');
    expect(component.state()).toEqual({ open: false });

    button.simulate('click');
    expect(component.state()).toEqual({ open: true });

    component.unmount();
  });

  it('should change state on click away', () => {
    const component = mountWithIntl(
      <VcAlertsButton.WrappedComponent intl={intl} />
    );

    const avatar = component.find('Avatar').at(0);
    avatar.simulate('click');
    const away = component.find('ClickAwayListener').getElement();

    expect(component.state()).toEqual({ open: true });

    away.props.onClickAway({}, {});

    avatar.simulate('click');
    expect(component.state()).toEqual({ open: false });

    away.props.onClickAway({}, {});
  });
});
