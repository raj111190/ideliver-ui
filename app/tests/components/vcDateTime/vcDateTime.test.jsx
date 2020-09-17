import React from 'react';
import { mountWithIntl, shallowWithIntl } from '../../enzyme-test-helpers';
import VcDateTime from '../../../js/components/vcDateTime/vcDateTime';
import TimeKeeper from 'react-timekeeper';
import moment from 'moment';

describe('VcDateTime', () => {
  let DATE_TO_USE, _Date;
  beforeEach(() => {
    DATE_TO_USE = new Date('2018');
    _Date = Date;
    global.Date = jest.fn(() => DATE_TO_USE);
    global.Date.UTC = _Date.UTC;
    global.Date.parse = _Date.parse;
    global.Date.now = _Date.now;
  });
  it('renders without crashing', () => {
    const component = shallowWithIntl(<VcDateTime hasClear />);
    expect(component).toBeDefined();
  });

  it('renders optional components', () => {
    const mockFunc2 = jest.fn();
    const component = mountWithIntl(
      <VcDateTime hasClear onChange={mockFunc2} />
    );
    expect(component.find('IconButton').exists()).toBe(true);
    expect(component.find('TextField').exists()).toBe(true);
    expect(component.find('TimeInput').exists()).toBe(true);

    const timeInput = component.find('TimeInput').at(0);
    timeInput
      .props()
      .onChange('Wed Jul 11 2018 19:34:00 GMT-0400 (Eastern Daylight Time)');

    expect(mockFunc2.mock.calls.length).toBe(1);

    const textField = component.find('VcTextField').at(0);
    textField.props().onChange('2018-01-13');

    expect(mockFunc2.mock.calls.length).toBe(2);
  });

  it('renders only necessary components', () => {
    const component = mountWithIntl(<VcDateTime />);
    expect(component.find('IconButton').exists()).toBe(false);
    expect(component.find('TimeInput').exists()).toBe(true);
  });

  it('renders whithout date and time', () => {
    const component = mountWithIntl(
      <VcDateTime hasDate={false} hasTime={false} />
    );
    expect(component).toBeDefined();
  });

  it('renders with props', () => {
    const component = mountWithIntl(<VcDateTime hasClear />);

    expect(
      component
        .find('TimeInput')
        .at(0)
        .prop('value')
        .toString()
        .split(' ')[4]
    ).toBe(moment().format('HH:mm:ss'));
  });

  it('clear should change on click', () => {
    const mockFunc = jest.fn();
    const component = mountWithIntl(
      <VcDateTime hasClear onChange={mockFunc} />
    );
    const button = component.find('IconButton');
    button.simulate('click');
    expect(mockFunc.mock.calls[0][0]).toBeDefined();
    component.unmount();
  });
});
