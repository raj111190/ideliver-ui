import React from 'react';
import { shallow } from 'enzyme';
import VcSidebarButton from '../../../js/components/vcSidebarButton/vcSidebarButton';

describe('VcSidebarButton', () => {
  let mockFunc;
  beforeEach(() => {
    mockFunc = jest.fn();
  });

  it('renders without crashing', () => {
    const component = shallow(<VcSidebarButton onClick={mockFunc} />);
    expect(component).toBeDefined();
    component.simulate('click');
    expect(mockFunc).toBeCalled();
  });

  it('renders selected without crashing', () => {
    const component = shallow(<VcSidebarButton selected />);
    expect(component).toBeDefined();
  });
});
