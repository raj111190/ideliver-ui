import React from 'react';
import { mount } from 'enzyme';
import VcMessage from '../../../js/components/vcMessage/vcMessage';

describe('VcMessage', () => {
  it('renders without warning', () => {
    const component = mount(
      <VcMessage>
        <b>Test</b>LALALA
      </VcMessage>
    );
    expect(component).toBeDefined();
  });
  it('renders with warning', () => {
    const component = mount(<VcMessage isWarning value="Test LALALA" />);
    expect(component).toBeDefined();
  });
});
