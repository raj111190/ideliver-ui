import React from 'react';
import { shallow } from 'enzyme';
import VcDrawer from '../../../js/components/vcDrawer/vcDrawer';

describe('VcDrawer', () => {
  it('renders without crashing', () => {
    const component = shallow(<VcDrawer />);
    expect(component).toBeDefined();
  });
});
