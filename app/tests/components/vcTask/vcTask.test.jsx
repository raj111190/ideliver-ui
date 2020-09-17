import React from 'react';
import { shallow, mount } from 'enzyme';
import VcTask from '../../../js/components/vcTask/vcTask';

describe('VcTask', () => {
  let mockFunc;
  beforeEach(() => {
    mockFunc = jest.fn();
  });

  it('renders without crashing', () => {
    const component = shallow(<VcTask />);
    expect(component).toBeDefined();
  });
  it('renders disabled', () => {
    const component = mount(<VcTask disabled onChange={mockFunc} />);
    expect(component).toBeDefined();
    component
      .find('Checkbox')
      .at(0)
      .props()
      .onChange();
    expect(mockFunc.mock.calls.length).toBe(1);
  });
});
