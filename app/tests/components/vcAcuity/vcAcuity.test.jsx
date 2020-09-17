import React from 'react';
import { mountWithIntl } from '../../enzyme-test-helpers';
import VcAcuity from '../../../js/components/vcAcuity/vcAcuity';

describe('VcAcuity', () => {
  it('renders without crashing', () => {
    const component = mountWithIntl(<VcAcuity withLabel value={1} />);
    expect(component.find('div').length).toBe(3);
  });
  it('renders without crashing with value 1', () => {
    const component = mountWithIntl(<VcAcuity value={5} />);
    expect(component.find('div').length).toBe(2);
    expect(component).toBeDefined();
  });
});
