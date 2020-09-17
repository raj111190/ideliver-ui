import React from 'react';
import { mount } from 'enzyme';
import VcSlider from '../../../js/components/vcSlider/vcSlider';

describe('VcSlider', () => {
  const mockFunc = jest.fn();
  it('renders without crashing', () => {
    const component = mount(<VcSlider value={99} />);
    expect(component).toBeDefined();
  });

  const labels = {
    0: '0°C',
    25: '25°C',
    75: '75°C',
    50: '50°C',
    100: '100',
  };
  it('renders with a value field', () => {
    const component = mount(
      <VcSlider
        value={0}
        onChange={mockFunc}
        marks={labels}
        min={0}
        max={100}
        valueField
      />
    );
    const textField = component.find('TextField').at(0);
    expect(textField).toBeDefined();
    textField.props().onChange({ target: { value: 70 } });
    expect(mockFunc.mock.calls.length).toBe(1);
  });
});
