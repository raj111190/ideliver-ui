import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import VcSelectWithDismiss from '../../../js/components/vcSelectWithDismiss/vcSelectWithDismiss';
import { mountWithIntl } from '../../enzyme-test-helpers';
import { Typography, Popover } from '@material-ui/core';
import VcButton from '../../../js/components/vcButton/vcButton';
import VcSelectOptions from '../../../js/components/vcSelectOptions/vcSelectOptions';

describe('VcSelectWithDismiss', () => {
  let mockFunc1, mockFunc2;

  const createMockSvg = (width, height) => {
    const svg = document.createElement('svg');
    Object.assign(svg.style, {
      width: `${width}px`,
      height: `${height}px`,
    });
    // we have to mock this for jsdom.
    svg.getBoundingClientRect = () => ({
      width,
      height,
      top: 0,
      left: 0,
      right: width,
      bottom: height,
    });
    return svg;
  };
  beforeEach(() => {
    mockFunc1 = jest.fn();
    mockFunc2 = jest.fn();
  });

  it('renders without crashing', () => {
    const component = mountWithIntl(
      <VcSelectWithDismiss
        title="What's the cause of the prolonged active phase of labout?"
        timestamp="Done at 27 March 11:45"
        options={['CPD', 'Obstructed labour', 'Malposition']}
        value={['CPD']}
        onToggle={mockFunc1}
        onChange={mockFunc2}
      />
    );
    expect(component).toBeDefined();

    const textEls = component.find(Typography).getElements();

    // Expect to see the two typography elements
    expect(textEls.length).toBe(2);

    const closeIcon = component.find(CloseIcon).at(0);

    const svg = createMockSvg(1, 2);

    closeIcon.props().onClick({ persist: () => {}, currentTarget: svg });

    component.update();
    const dismissBtn = component.find(VcButton).at(4);

    expect(component.find(Typography).getElements().length).toBe(4);
    expect(component.find(VcButton).getElements().length).toBe(5);
    dismissBtn.simulate('click');

    expect(mockFunc1.mock.calls.length).toBe(1);

    closeIcon.props().onClick({ persist: () => {}, currentTarget: svg });

    const cancelBtn = component.find(VcButton).at(3);
    cancelBtn.simulate('click');
  });

  it('renders without timestamp', () => {
    const component = mountWithIntl(
      <VcSelectWithDismiss
        title="What's the cause of the prolonged active phase of labout?"
        options={['CPD', 'Obstructed labour', 'Malposition']}
        value={['CPD']}
        onToggle={mockFunc1}
        onChange={mockFunc2}
      />
    );
    expect(component).toBeDefined();

    const textEls = component.find(Typography).getElements();

    // Expect to see only one typography elements
    expect(textEls.length).toBe(1);
  });
});
