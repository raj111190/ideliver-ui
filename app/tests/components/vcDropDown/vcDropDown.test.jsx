import React from 'react';
import { mountWithIntl, shallowWithIntl } from '../../enzyme-test-helpers';
import VcDropDown from '../../../js/components/vcDropDown/vcDropDown';

describe('VcDropDown', () => {
  const options = [
    { value: 'option 1', display: 'display 1' },
    { value: 'option 2', display: 'display 2' },
    { value: 'option 3', display: 'display 3' },
  ];
  it('renders without crashing', () => {
    const component = shallowWithIntl(<VcDropDown options={options} />);
    expect(component).toBeDefined();
  });

  it('renders all necessary components', () => {
    const component = mountWithIntl(<VcDropDown options={options} />);
    const menu = component.find('SelectField').at(0);
    expect(menu).toBeDefined();

    const opt_1 = component.find('MenuItem').at(0);
    expect(opt_1).toBeDefined();

    const opt_2 = component.find('MenuItem').at(1);
    expect(opt_2).toBeDefined();

    const opt_3 = component.find('MenuItem').at(2);
    expect(opt_3).toBeDefined();

    component.unmount();
  });
});
