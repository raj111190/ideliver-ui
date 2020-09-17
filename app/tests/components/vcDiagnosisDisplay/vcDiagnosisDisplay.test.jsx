import React from 'react';
import { mount, shallow } from 'enzyme';
import VcDiagnosisDisplay from '../../../js/components/vcDiagnosisDisplay/vcDiagnosisDisplay';

describe('VcDiagnosisDisplay', () => {
  const value = ['Diag 1', 'Diag 2', 'Diag 3'];

  it('renders without crashing', () => {
    const component = shallow(<VcDiagnosisDisplay value={value} />);
    expect(component).toBeDefined();
    component.unmount();
  });
});
