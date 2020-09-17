import React from 'react';
import { mountWithIntl, shallowWithIntl } from '../../enzyme-test-helpers';
import VcGenericSwitch from '../../../js/components/vcGenericSwitch/vcGenericSwitch';
import VcToggle from '../../../js/components/vcToggle/vcToggle';
import VcTextField from '../../../js/components/vcTextField/vcTextField';
import VcAlertsCard from '../../../js/components/vcAlertsCard/vcAlertsCard';

describe('VcGenericSwitch', () => {
  it('renders without crashing', () => {
    const component = mountWithIntl(
      <VcGenericSwitch
        value={false}
        nestedComponents={[
          <VcTextField value="Test comment" />,
          <VcAlertsCard
            alerts={[
              { timestamp: '28 March 10:00', value: 'Test Alert 1 lalalal' },
              { timestamp: '05 April 12:00', value: 'Test Alert 2 Trololo' },
              { timestamp: '02 May 09:00', value: 'Test Alert 3 iiiihiiii' },
            ]}
          />,
          <VcToggle />,
        ]}
      />
    );
    expect(component).toBeDefined();

    const datapt = component.find('TextField').at(0);
    expect(datapt).toBeDefined();

    const vcToggle = component.find('VcToggle').at(0);
    expect(vcToggle).toBeDefined();

    const vcAlertsCard = component.find('VcAlertsCard').at(0);
    expect(vcAlertsCard).toBeDefined();
    component.unmount();
  });

  it('should change on click', () => {
    const mockFunc = jest.fn();
    const component = mountWithIntl(
      <VcGenericSwitch value={false} onChange={mockFunc} />
    );
    const component2 = mountWithIntl(
      <VcGenericSwitch value onChange={mockFunc} />
    );
    const buttonYes = component
      .find('VcToggleWithUnsure')
      .find('div')
      .at(3);
    buttonYes.simulate('click');
    expect(mockFunc.mock.calls[0][0]).toBe(true);
    const buttonUnsure = component
      .find('VcToggleWithUnsure')
      .find('div')
      .at(2);
    buttonUnsure.simulate('click');
    expect(mockFunc.mock.calls[1][0]).toBe(null);
    const buttonNo = component
      .find('VcToggleWithUnsure')
      .find('div')
      .at(1);
    buttonNo.simulate('click');
    expect(mockFunc.mock.calls[2][0]).toBe(false);
    component.unmount();
    component2.unmount();
  });
});
