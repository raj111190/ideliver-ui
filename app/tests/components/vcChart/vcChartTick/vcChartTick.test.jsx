import React from 'react';
import { mountWithIntl } from '../../../enzyme-test-helpers';
import VcChartTick from '../../../../js/components/vcChart/vcChartTick/vcChartTick';

describe('VcChartTick', () => {
  let mockFunc;
  beforeEach(() => {
    mockFunc = jest.fn();
  });
  it('renders without crashing', () => {
    const component = mountWithIntl(
      <VcChartTick
        payload={{ value: 'test' }}
        index={0}
        x={1}
        y={2}
        tickFormatter={mockFunc}
      />
    );
    expect(mockFunc.mock.calls.length).toBe(1);
    expect(component).toBeDefined();
  });
  it('renders without crashing', () => {
    const component = mountWithIntl(
      <VcChartTick
        payload={{ value: 'test' }}
        index={7}
        visibleTicksCount={9}
      />
    );
    expect(component).toBeDefined();
  });
  it('renders without crashing', () => {
    const component = mountWithIntl(
      <VcChartTick
        payload={{ value: 'test' }}
        index={8}
        visibleTicksCount={9}
      />
    );
    expect(component).toBeDefined();
  });
});
