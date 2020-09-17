import React from 'react';
import { mount } from 'enzyme';
import VcChartDot from '../../../../js/components/vcChart/vcChartDot/vcChartDot';
import {
  chartTypes,
  contStrOptions,
} from '../../../../js/components/vcChart/vcChart';

describe('VcChartDot', () => {
  it('renders without value', () => {
    const component = mount(<VcChartDot />);
    expect(component).toBeDefined();
  });
  it('renders with wrong value and console error', () => {
    console.log(
      'We test for the following warning, showing it when running the test is normal'
    );
    const component = mount(<VcChartDot value="blah" />);
    expect(component).toBeDefined();
  });
  it('renders regular and with coordinates', () => {
    const component = mount(<VcChartDot value={160} cy={1} cx={2} />);
    expect(component).toBeDefined();
  });
  it('renders irregular', () => {
    const component = mount(
      <VcChartDot
        value={160}
        maxAlertValue={170}
        payload={{ irregular: true }}
      />
    );
    expect(component).toBeDefined();
  });
  it('renders alert', () => {
    const component = mount(<VcChartDot value={180} maxAlertValue={170} />);
    expect(component).toBeDefined();
  });
  it('renders alert irregular', () => {
    const component = mount(
      <VcChartDot value={180} payload={{ irregular: true }} />
    );
    expect(component).toBeDefined();
  });

  it('renders contractions strong', () => {
    const component = mount(
      <VcChartDot
        value={180}
        type={chartTypes.CONTRACTIONS}
        payload={{ [chartTypes.CONTRACTIONS_STRENGTH]: contStrOptions.STRONG }}
      />
    );
    expect(component).toBeDefined();
  });
  it('renders contractions moderate', () => {
    const component = mount(
      <VcChartDot
        value={180}
        type={chartTypes.CONTRACTIONS}
        payload={{
          [chartTypes.CONTRACTIONS_STRENGTH]: contStrOptions.MODERATE,
        }}
      />
    );
    expect(component).toBeDefined();
  });
  it('renders contractions mild', () => {
    const component = mount(
      <VcChartDot
        value={180}
        type={chartTypes.CONTRACTIONS}
        payload={{ [chartTypes.CONTRACTIONS_STRENGTH]: contStrOptions.MILD }}
      />
    );
    expect(component).toBeDefined();
  });
});
