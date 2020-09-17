import React from 'react';
import { mount } from 'enzyme';
import VcToggle from '../../../js/components/vcToggle/vcToggle';

describe('VcToggle', () => {
  it('renders without crashing', () => {
    const component = mount(<VcToggle value />);
    expect(component).toBeDefined();
  });

  it('should change on click', () => {
    const mockFunc = jest.fn();
    const component = mount(<VcToggle value={false} onChange={mockFunc} />);
    const button = component.find('input').at(0);
    button.simulate('change');
    expect(mockFunc.mock.calls[0][0]).toBe(true);
  });
});
