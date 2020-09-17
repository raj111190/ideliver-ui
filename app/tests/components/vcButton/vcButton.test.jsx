import React from 'react';
import { shallow } from 'enzyme';
import VcButton from '../../../js/components/vcButton/vcButton';

describe('VcButton', () => {
  it('renders without crashing', () => {
    const component = shallow(<VcButton />);
    expect(component).toBeDefined();
  });
});
