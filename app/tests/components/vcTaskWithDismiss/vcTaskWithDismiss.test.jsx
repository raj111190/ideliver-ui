import React from 'react';
import {
  shallowWithIntl,
  mountWithIntl,
  createMockSvg,
} from '../../enzyme-test-helpers';
import VcTaskWithDismiss from '../../../js/components/vcTaskWithDismiss/vcTaskWithDismiss';

describe('VcTaskWithDismiss', () => {
  let mockFunc1, mockFunc2;
  beforeEach(() => {
    mockFunc1 = jest.fn();
    mockFunc2 = jest.fn();
  });

  it('renders without crashing', () => {
    const component = shallowWithIntl(<VcTaskWithDismiss />);
    expect(component).toBeDefined();
  });
  it('renders disabled', () => {
    const component = mountWithIntl(
      <VcTaskWithDismiss onChange={mockFunc1} onToggle={mockFunc2} />
    );
    expect(component).toBeDefined();
    component
      .find('Checkbox')
      .at(0)
      .props()
      .onChange();
    expect(mockFunc1.mock.calls.length).toBe(1);
  });

  it('renders and tests buttons', () => {
    const component = mountWithIntl(
      <VcTaskWithDismiss
        title="What's the cause of the prolonged active phase of labour?"
        timestamp="Done at 27 March 11:45"
        value
        onToggle={mockFunc1}
        onChange={mockFunc2}
      />
    );
    expect(component).toBeDefined();

    const textEls = component.find('Typography').getElements();

    // Expect to see the three typography elements
    expect(textEls.length).toBe(3);

    const closeIcon = component.find('CloseIcon').at(0);

    const svg = createMockSvg(1, 2);

    closeIcon.props().onClick({ persist: () => {}, currentTarget: svg });

    component.update();
    const dismissBtn = component.find('VcButton').at(1);

    expect(component.find('Typography').getElements().length).toBe(5);
    expect(component.find('VcButton').getElements().length).toBe(2);
    dismissBtn.simulate('click');

    expect(mockFunc1.mock.calls.length).toBe(1);

    closeIcon.props().onClick({ persist: () => {}, currentTarget: svg });

    const cancelBtn = component.find('VcButton').at(0);
    cancelBtn.simulate('click');

    const vcQuestionWithDismiss = component.find('VcQuestionWithDismiss').at(0);
    vcQuestionWithDismiss.props().onToggle();
    expect(mockFunc1.mock.calls.length).toBe(2);
    expect(mockFunc2.mock.calls.length).toBe(2);
  });
});
