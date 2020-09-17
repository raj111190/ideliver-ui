import React from 'react';
import { IntlProvider } from 'react-intl';
import lolex from 'lolex';
import { mountWithIntl } from '../../enzyme-test-helpers';
import VcTimer from '../../../js/components/vcTimer/vcTimer';

describe('VcTimer', () => {
  // Construct a new `IntlProvider` instance by passing `props` and
  // `context` as React would, then call `getChildContext()` to get the
  // React Intl API, complete with the `format*()` functions.
  const intlProvider = new IntlProvider({ locale: 'en' }, {});
  const { intl } = intlProvider.getChildContext();

  it('renders with value 30', () => {
    const component = mountWithIntl(
      <VcTimer.WrappedComponent intl={intl} value={30} />
    );
    expect(component).toBeDefined();
    expect(component.state()).toEqual({ next: 30, percentage: 50 });
  });
  it('renders with value 120', () => {
    const component = mountWithIntl(
      <VcTimer.WrappedComponent intl={intl} value={120} />
    );
    expect(component).toBeDefined();
    expect(component.state()).toEqual({ next: 120, percentage: 100 });
  });
  it('moves the state backwards with 30 cycles and puts the percentage at half with value 0', () => {
    const clock = lolex.install();
    const component = mountWithIntl(
      <VcTimer.WrappedComponent intl={intl} value={0} tickLengthInMs={1} />
    );
    clock.tick(30);
    expect(component.state()).toEqual({ next: -30, percentage: 50 });
    clock.uninstall();
  });
  it('moves the state with 30 cycles and puts the percentage at half with value 60', () => {
    const clock = lolex.install();
    const component = mountWithIntl(
      <VcTimer.WrappedComponent intl={intl} value={60} tickLengthInMs={1} />
    );
    clock.tick(30);
    expect(component.state()).toEqual({ next: 30, percentage: 50 });
    clock.uninstall();
  });
  it('the timer stops at -61 cycles and -2 percentage state with value 15', () => {
    const clock = lolex.install();
    const component = mountWithIntl(
      <VcTimer.WrappedComponent intl={intl} value={15} tickLengthInMs={1} />
    );
    clock.tick(1000);
    expect(component.state()).toEqual({ next: -61, percentage: -2 });
    component.unmount();
    clock.uninstall();
  });
});
