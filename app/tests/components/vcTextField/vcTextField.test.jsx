import React from 'react';
import { mountWithIntl, shallowWithIntl } from '../../enzyme-test-helpers';
import VcTextField from '../../../js/components/vcTextField/vcTextField';

describe('vcTextField', () => {
  let mockFunc;
  beforeEach(() => {
    mockFunc = jest.fn();
  });
  it('renders without crashing text field', () => {
    const component = shallowWithIntl(
      <VcTextField
        value="Test"
        vType="text"
        label="Add summary"
        onChange={mockFunc}
      />
    );
    expect(component).toBeDefined();
  });
  it('renders without crashing number field', () => {
    const component = shallowWithIntl(
      <VcTextField
        value="Test"
        vType="number"
        label="Add number"
        onChange={mockFunc}
      />
    );
    expect(component).toBeDefined();
  });
  it('renders without crashing date field', () => {
    const component = shallowWithIntl(
      <VcTextField
        value="Test"
        vType="date"
        label="Add date"
        onChange={mockFunc}
      />
    );
    expect(component).toBeDefined();
  });

  it('should call the update the state when text value is changed', () => {
    const component = mountWithIntl(
      shallowWithIntl(
        <VcTextField
          label="Add summary"
          pattern="^[1-9][0-9]?$|^100$"
          onChange={mockFunc}
        />
      ).get(0)
    );
    expect(component.state()).toEqual({
      value: '',
      isDirty: false,
      hasError: false,
      errorMessage: '',
      hasWarning: false,
    });

    const TextField = component
      .find('VcTextField')
      .find('TextField')
      .at(0);
    const input = component.find('input').at(0);
    input.simulate('change', { target: { value: '2' } });

    expect(component.state()).toEqual({
      errorMessage: '',
      hasError: false,
      isDirty: true,
      value: '2',
      hasWarning: false,
    });

    input.simulate('blur');
    expect(mockFunc.mock.calls.length).toBe(1);
    expect(component.state()).toEqual({
      errorMessage: '',
      hasError: false,
      isDirty: false,
      value: '',
      hasWarning: false,
    });

    input.simulate('change', { target: { value: 'asd' } });

    expect(component.state()).toEqual({
      errorMessage: 'Error: Invalid format',
      hasError: true,
      isDirty: true,
      value: 'asd',
      hasWarning: false,
    });

    input.simulate('blur');
    expect(mockFunc.mock.calls.length).toBe(2);
    expect(component.state()).toEqual({
      errorMessage: 'Error: Invalid format',
      hasError: false,
      isDirty: false,
      value: '',
      hasWarning: false,
    });
  });

  it('should call the update the state when number value is changed', () => {
    const component = mountWithIntl(
      shallowWithIntl(
        <VcTextField
          head="head"
          tail="tail"
          label="Add summary"
          vType="number"
          onChange={mockFunc}
          max={3}
          min={1}
          helperTextId="datetime"
        />
      ).get(0)
    );
    expect(component.state()).toEqual({
      value: '',
      isDirty: false,
      hasError: false,
      errorMessage: '',
      hasWarning: false,
    });

    const TextField = component
      .find('VcTextField')
      .find('TextField')
      .at(0);
    const input = component.find('input').at(0);
    input.simulate('change', { target: { value: 4 } });

    expect(component.state()).toEqual({
      errorMessage: 'The value should be less than or equal to:  3',
      hasError: true,
      isDirty: true,
      value: 4,
      hasWarning: false,
    });

    input.simulate('blur');
    expect(mockFunc.mock.calls.length).toBe(1);
    expect(component.state()).toEqual({
      errorMessage: 'The value should be less than or equal to:  3',
      hasError: false,
      isDirty: false,
      value: '',
      hasWarning: false,
    });

    input.simulate('change', { target: { value: -1 } });

    expect(component.state()).toEqual({
      errorMessage: 'The value should be more than or equal to:  1',
      hasError: true,
      isDirty: true,
      value: -1,
      hasWarning: false,
    });

    input.simulate('blur');
    expect(mockFunc.mock.calls.length).toBe(2);
    expect(component.state()).toEqual({
      errorMessage: 'The value should be more than or equal to:  1',
      hasError: false,
      isDirty: false,
      value: '',
      hasWarning: false,
    });
  });

  it('should call the update the state when date value is changed', () => {
    const component = mountWithIntl(
      shallowWithIntl(
        <VcTextField
          label="Add summary"
          vType="date"
          onChange={mockFunc}
          max="10/09/2018"
          min="10/05/2018"
          helperTextId="calcGestationalAge"
        />
      ).get(0)
    );
    expect(component.state()).toEqual({
      value: '',
      isDirty: false,
      hasError: false,
      errorMessage: '',
      hasWarning: false,
    });

    const TextField = component
      .find('VcTextField')
      .find('TextField')
      .at(0);
    const input = component.find('input').at(0);
    input.simulate('change', { target: { value: '10/10/2018' } });

    expect(component.state()).toEqual({
      errorMessage: 'The value should be less than or equal to:  09-10-2018',
      hasError: true,
      isDirty: true,
      value: '10/10/2018',
      hasWarning: false,
    });

    input.simulate('blur');
    expect(mockFunc.mock.calls.length).toBe(1);
    expect(component.state()).toEqual({
      errorMessage: 'The value should be less than or equal to:  09-10-2018',
      hasError: false,
      isDirty: false,
      value: '',
      hasWarning: false,
    });

    input.simulate('change', { target: { value: '10/04/2018' } });

    expect(component.state()).toEqual({
      errorMessage: 'The value should be more than or equal to:  05-10-2018',
      hasError: true,
      isDirty: true,
      value: '10/04/2018',
      hasWarning: false,
    });

    input.simulate('blur');
    expect(mockFunc.mock.calls.length).toBe(2);
    expect(component.state()).toEqual({
      errorMessage: 'The value should be more than or equal to:  05-10-2018',
      hasError: false,
      isDirty: false,
      value: '',
      hasWarning: false,
    });

    input.simulate('change', { target: { value: '10/06/2018' } });

    expect(component.state()).toEqual({
      errorMessage: '',
      hasError: false,
      isDirty: true,
      value: '10/06/2018',
      hasWarning: false,
    });

    input.simulate('blur');
    expect(mockFunc.mock.calls.length).toBe(3);
    expect(component.state()).toEqual({
      errorMessage: '',
      hasError: false,
      isDirty: false,
      value: '',
      hasWarning: false,
    });
  });

  it('should call the update the state when value is changed', () => {
    const component = mountWithIntl(
      shallowWithIntl(
        <VcTextField
          label="number field"
          vType="number"
          onChange={mockFunc}
          warnMin="100"
          warnMax="300"
          min="0"
          max="500"
          warnMsgId="wbcError"
        />
      ).get(0)
    );
    expect(component.state()).toEqual({
      value: '',
      isDirty: false,
      hasError: false,
      errorMessage: '',
      hasWarning: false,
    });

    const input = component.find('input').at(0);
    input.simulate('change', { target: { value: '50' } });

    expect(component.state()).toEqual({
      errorMessage: '',
      hasError: false,
      isDirty: true,
      value: '50',
      hasWarning: true,
    });

    input.simulate('change', { target: { value: '600' } });

    expect(component.state()).toEqual({
      errorMessage: 'The value should be less than or equal to:  500',
      hasError: true,
      isDirty: true,
      value: '600',
      hasWarning: true,
    });

    input.simulate('change', { target: { value: '-10' } });

    expect(component.state()).toEqual({
      errorMessage: 'The value should be more than or equal to:  0',
      hasError: true,
      isDirty: true,
      value: '-10',
      hasWarning: true,
    });

    input.simulate('change', { target: { value: '400' } });

    expect(component.state()).toEqual({
      errorMessage: '',
      hasError: false,
      isDirty: true,
      value: '400',
      hasWarning: true,
    });
  });
});
