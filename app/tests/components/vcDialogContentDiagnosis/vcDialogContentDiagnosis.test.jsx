import React from 'react';
import { mountWithIntl, shallowWithIntl } from '../../enzyme-test-helpers';
import VcDialogContentDiagnosis from '../../../js/components/vcDialogContentDiagnosis/vcDialogContentDiagnosis';

describe('VcDialogContentDiagnosis', () => {
  let mockFunc;
  beforeEach(() => {
    mockFunc = jest.fn();
  });

  it('renders without crashing', () => {
    const component = shallowWithIntl(
      <VcDialogContentDiagnosis
        type="Diagnosis"
        filtersSelected={[]}
        filterOptions={['Intact', 'Clear', 'Meconium', 'Bloody']}
        onSelection={mockFunc}
      />
    );
    expect(component).toBeDefined();
  });

  it('should call the callback function when a checkbox is selected', () => {
    const component = mountWithIntl(
      <VcDialogContentDiagnosis
        type="Diagnosis"
        filtersSelected={[]}
        filterOptions={['Intact', 'Clear', 'Meconium', 'Bloody']}
        onSelection={mockFunc}
      />
    );

    const checkbox = component.find('input[type="checkbox"]').at(0);

    checkbox.simulate('click');
    expect(mockFunc.mock.calls.length).toBe(1);
  });
});
