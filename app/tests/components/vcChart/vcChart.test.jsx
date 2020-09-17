import React from 'react';
import { mountWithIntl } from '../../enzyme-test-helpers';
import VcChart, {
  chartTypes,
  contStrOptions,
} from '../../../js/components/vcChart/vcChart';

describe('VcChart', () => {
  it('renders without crashing', () => {
    const component = mountWithIntl(
      <VcChart type={chartTypes.FETAL_HEART_RATE} />
    );
    expect(component).toBeDefined();
  });
  it('renders with chart type Contractions', () => {
    const component = mountWithIntl(<VcChart type={chartTypes.CONTRACTIONS} />);
    expect(component).toBeDefined();
  });
  it('renders with chart type Bubble Chart', () => {
    const component = mountWithIntl(<VcChart type={chartTypes.BUBBLE_CHART} />);
    expect(component).toBeDefined();
  });
  it('renders without crashing', () => {
    const component = mountWithIntl(<VcChart minValue={30} maxValue={80} />);
    expect(component).toBeDefined();
  });
});
