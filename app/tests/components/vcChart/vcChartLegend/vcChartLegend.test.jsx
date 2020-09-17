import React from 'react';
import { mount } from 'enzyme';
import { mountWithIntl } from '../../../enzyme-test-helpers';
import VcChartLegend from '../../../../js/components/vcChart/vcChartLegend/vcChartLegend';
import { chartTypes } from '../../../../js/components/vcChart/vcChart';

describe('VcChartLegend', () => {
  it('renders without crashing', () => {
    const component = mountWithIntl(
      <VcChartLegend
        payload={[{ dataKey: 'test' }]}
        topLabelDataKey="top"
        bottomLabelDataKey="bottom"
      />
    );
    expect(component).toBeDefined();
  });
  it('renders with type Contractions', () => {
    const component = mountWithIntl(
      <VcChartLegend type={chartTypes.CONTRACTIONS} />
    );
    expect(component).toBeDefined();
  });
  it('renders with type Fetal Heart Rate', () => {
    const component = mountWithIntl(
      <VcChartLegend type={chartTypes.FETAL_HEART_RATE} />
    );
    expect(component).toBeDefined();
  });
});
