import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Typography } from '@material-ui/core';
import VcToggleWithDismiss from '../../../js/components/vcToggleWithDismiss/vcToggleWithDismiss';
import { mountWithIntl, createMockSvg } from '../../enzyme-test-helpers';
import VcButton from '../../../js/components/vcButton/vcButton';

describe('VcToggleWithDismiss', () => {
  let mockFunc1, mockFunc2;

  beforeEach(() => {
    mockFunc1 = jest.fn();
    mockFunc2 = jest.fn();
  });

  it('renders without crashing', () => {
    const component = mountWithIntl(
      <VcToggleWithDismiss
        title="What's the cause of the prolonged active phase of labour?"
        timestamp="Done at 27 March 11:45"
        value
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
    const dismissBtn = component.find(VcButton).at(3);

    expect(component.find(Typography).getElements().length).toBe(4);
    expect(component.find(VcButton).getElements().length).toBe(4);
    dismissBtn.simulate('click');

    expect(mockFunc1.mock.calls.length).toBe(1);

    closeIcon.props().onClick({ persist: () => {}, currentTarget: svg });

    const cancelBtn = component.find(VcButton).at(3);
    cancelBtn.simulate('click');
  });

  it('renders without timestamp', () => {
    const component = mountWithIntl(
      <VcToggleWithDismiss
        title="What's the cause of the prolonged active phase of labour?"
        value={false}
        onToggle={mockFunc1}
        onChange={mockFunc2}
      />
    );
    expect(component).toBeDefined();

    const vcSelectOptions = component.find('VcSelectOptions').at(0);
    vcSelectOptions.props().onSelect(['Yes']);

    const textEls = component.find(Typography).getElements();

    // Expect to see only one typography elements
    expect(textEls.length).toBe(1);
  });

  it('renders without timestamp and value', () => {
    const component = mountWithIntl(
      <VcToggleWithDismiss
        title="What's the cause of the prolonged active phase of labour?"
        onToggle={mockFunc1}
        onChange={mockFunc2}
      />
    );
    expect(component).toBeDefined();
  });
});
