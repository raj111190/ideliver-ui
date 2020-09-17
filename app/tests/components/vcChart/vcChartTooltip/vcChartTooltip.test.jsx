import React from 'react';
import { mountWithIntl } from '../../../enzyme-test-helpers';
import VcChartTooltip from '../../../../js/components/vcChart/vcChartTooltip/vcChartTooltip';

describe('VcChartTooltip', () => {
  it('renders without crashing', () => {
    const component = mountWithIntl(
      <VcChartTooltip
        labelFormatter={(value, type) =>
          !type || type === 'time' ? value : value
        }
        payload={[{ payload: ['test'] }]}
        active
      />
    );
    expect(component).toBeDefined();
  });

  it('renders with active false', () => {
    const component = mountWithIntl(
      <VcChartTooltip
        labelFormatter={(value, type) =>
          !type || type === 'time' ? value : value
        }
        payload={[{ payload: ['test'] }]}
        active={false}
      />
    );
    expect(component).toBeDefined();
  });
});
