import React from 'react';
import { mountWithIntl, shallowWithIntl } from '../../enzyme-test-helpers';
import VcSelectOptions from '../../../js/components/vcSelectOptions/vcSelectOptions';

describe('VcSelectOptions', () => {
  let mockFunc;
  beforeEach(() => {
    mockFunc = jest.fn();
  });

  it('renders without crashing', () => {
    const component = shallowWithIntl(
      <VcSelectOptions
        title="Liquor"
        options={['Intact', 'Clear', 'Meconium', 'Bloody']}
        value={['Intact']}
        onChange={mockFunc}
        value={1}
      />
    );
    expect(component).toBeDefined();
  });

  it('should have only one entry in selected Array', () => {
    const component = mountWithIntl(
      <VcSelectOptions
        title="Liquor"
        options={['Intact', 'Clear', 'Meconium', 'Bloody']}
        value={['Intact']}
        onChange={mockFunc}
      />
    );

    const button = component.find('button').at(1);
    expect(component.prop('value').length).toBe(1);
    button.simulate('click');
    expect(component.prop('value').length).toBe(1);
  });

  it('should have only one entry in selected Array 2', () => {
    const component = mountWithIntl(
      <VcSelectOptions
        title="Liquor"
        options={['Intact', 'Clear', 'Meconium', 'Bloody']}
        value={['Intact']}
        onChange={mockFunc}
      />
    );

    const button = component.find('button').at(0);
    expect(component.prop('value').length).toBe(1);
    button.simulate('click');
    expect(component.prop('value').length).toBe(0);
  });

  it('should have only one entry in selected Array 3', () => {
    const component = mountWithIntl(
      <VcSelectOptions
        title="Liquor"
        options={['Intact', 'Clear', 'Meconium', 'Bloody']}
        value={['Intact']}
        onChange={mockFunc}
        isMultiSelect
      />
    );
    const button = component.find('button').at(1);
    expect(component.prop('value').length).toBe(1);
    button.simulate('click');
    expect(component.prop('value').length).toBe(1);
    const button2 = component.find('button').at(0);
    button2.simulate('click');
    expect(component.prop('value').length).toBe(0);
  });

  it('should have only one entry in selected Array 4', () => {
    const component = mountWithIntl(
      <VcSelectOptions
        title="Liquor"
        options={['Intact', 'Clear', 'Meconium', 'Bloody']}
        value={['Intact']}
        onChange={mockFunc}
        error
        required
        isMultiSelect
      />
    );
    const button = component.find('button').at(0);
    expect(component.prop('value').length).toBe(1);
    button.simulate('click');
    expect(component.prop('value').length).toBe(0);
  });
});
