import React from 'react';
import { mountWithIntl, shallowWithIntl } from '../../enzyme-test-helpers';
import VcAlertsCard from '../../../js/components/vcAlertsCard/vcAlertsCard';

describe('VcAlertsCard', () => {
  it('renders without crashing', () => {
    const component = shallowWithIntl(
      <VcAlertsCard
        alerts={[
          { timestamp: '28 March 10:00', value: 'Test Alert 1 lalalal' },
          { timestamp: '05 April 12:00', value: 'Test Alert 2 Trololo' },
          { timestamp: '02 May 09:00', value: 'Test Alert 3 iiiihiiii' },
        ]}
      />
    );
    expect(component).toBeDefined();
  });

  it('handles null alerts', () => {
    const component = shallowWithIntl(<VcAlertsCard alerts={[]} />);

    expect(component).toBeDefined();
  });

  it('should render list items when alerts are present', () => {
    const component = mountWithIntl(
      <VcAlertsCard
        alerts={[
          { timestamp: '28 March 10:00', value: 'Test Alert 1 lalalal' },
          { timestamp: '05 April 12:00', value: 'Test Alert 2 Trololo' },
          { timestamp: '02 May 09:00', value: 'Test Alert 3 iiiihiiii' },
        ]}
      />
    );

    expect(component.find('ListItem').exists()).toBe(true);

    component.unmount();
  });

  it('should not render list items when alerts are null', () => {
    const component = mountWithIntl(<VcAlertsCard alerts={[]} />);

    expect(component.find('ListItem').exists()).toBe(false);

    component.unmount();
  });
});
