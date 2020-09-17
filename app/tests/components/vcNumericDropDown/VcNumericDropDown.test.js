import React from 'react';
import { mountWithIntl } from '../../enzyme-test-helpers';
import VcNumericDropDown from '../../../js/components/vcNumericDropDown/vcNumericDropDown';

describe('VcNumericDropDown', () => {
  let mockFunc;
  beforeEach(() => {
    mockFunc = jest.fn();
  });

  it('renders without crashing', () => {
    const component = mountWithIntl(
      <VcNumericDropDown
        value={0}
        onChange={mockFunc}
        title="temperature"
        stepSize={20}
        start={50}
        end={220}
      />
    );
    expect(component).toBeDefined();
  });

  it('renders without crashing', () => {
    const component = mountWithIntl(
      <VcNumericDropDown
        value={0}
        onChange={mockFunc}
        title="urineVolume"
        stepSize={20}
        start={50}
        end={220}
      />
    );
    expect(component).toBeDefined();
  });

  it('renders without crashing', () => {
    const component = mountWithIntl(
      <VcNumericDropDown
        value={0}
        onChange={mockFunc}
        title="heartRate"
        stepSize={20}
        start={50}
        end={220}
      />
    );
    expect(component).toBeDefined();
  });

  it('calls the callback function when the plus button is clicked', () => {
    const component = mountWithIntl(
      <VcNumericDropDown
        value={210}
        onChange={mockFunc}
        title="diastolic"
        stepSize={20}
        start={50}
        end={220}
      />
    );

    const button = component.find('VcButton').at(0);

    button.simulate('click');
    expect(mockFunc).toBeCalled();
    component.unmount();
  });

  it('calls the callback function when the minus button is clicked', () => {
    const component = mountWithIntl(
      <VcNumericDropDown
        value={10}
        onChange={mockFunc}
        title="diastolic"
        stepSize={20}
        start={50}
        end={220}
      />
    );

    const button = component.find('VcButton').at(1);

    button.simulate('click');
    expect(mockFunc).toBeCalled();
    component.unmount();
  });

  it('calls the callback function when the Minus button is clicked', () => {
    const component = mountWithIntl(
      <VcNumericDropDown
        value={210}
        onChange={mockFunc}
        title="urineProtein"
        stepSize={20}
        start={50}
        end={220}
      />
    );

    const button = component.find('VcButton').at(1);

    button.simulate('click');
    expect(mockFunc).toBeCalled();
    component.unmount();
  });

  it('updates state when select is opened', () => {
    const component = mountWithIntl(
      <VcNumericDropDown
        value={0}
        onChange={mockFunc}
        title="urineAcetone"
        stepSize={20}
        start={50}
        end={220}
      />
    );

    const select = component.find('Select').getElement();
    expect(component.state()).toEqual({ open: false });
    select.props.onOpen({}, {});
    expect(component.state()).toEqual({ open: true });
    select.props.onClose({}, {});
    expect(component.state()).toEqual({ open: false });

    component.setProps({ stepSize: 10 });

    const iconButton = component.find('IconButton').at(0);
    iconButton.simulate('click');
    expect(component.state()).toEqual({ open: true });
  });
});
