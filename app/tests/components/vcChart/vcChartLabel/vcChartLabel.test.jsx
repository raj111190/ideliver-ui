import React from 'react';
import { mount } from 'enzyme';
import VcChartLabel from '../../../../js/components/vcChart/vcChartLabel/vcChartLabel';

describe('VcChartLabel', () => {
  it('renders without crashing', () => {
    const component = mount(
      <VcChartLabel
        x={1}
        y={2}
        value="test"
        position="top"
        colors={{ test: 'black' }}
      />
    );
    expect(component).toBeDefined();
  });
  it('renders without top', () => {
    const component = mount(<VcChartLabel x={1} y={2} value="test" />);
    expect(component).toBeDefined();
  });
  it('renders without value', () => {
    const component = mount(<VcChartLabel x={1} y={2} />);
    expect(component).toBeDefined();
  });
});
