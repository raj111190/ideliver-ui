import React from 'react';
import { mountWithIntl, shallowWithIntl } from '../../enzyme-test-helpers';
import VcDiagnosisCardContent from '../../../js/components/vcDiagnosisCardContent/vcDiagnosisCardContent';

describe('VcDiagnosisCardContent', () => {
  let mockFunc;
  beforeEach(() => {
    mockFunc = jest.fn();
  });

  it('renders without crashing', () => {
    const component = mountWithIntl(
      <VcDiagnosisCardContent
        value="Diagnosis"
        filterOptions={['Intact', 'Clear', 'Meconium', 'Bloody']}
        filtersSelected={[]}
      />
    );
    expect(component).toBeDefined();
  });

  it('renders without crashing', () => {
    const component = mountWithIntl(
      <VcDiagnosisCardContent value="Diagnosis" />
    );
    expect(component).toBeDefined();
  });

  it('renders without crashing', () => {
    const component = mountWithIntl(
      <VcDiagnosisCardContent
        value="Possible Diagnosis"
        filterOptions={['Intact', 'Clear', 'Meconium', 'Bloody']}
        filtersSelected={[]}
      />
    );
    expect(component).toBeDefined();
  });

  it('renders without crashing', () => {
    const component = mountWithIntl(
      <VcDiagnosisCardContent
        value="Diagnosis"
        filterOptions={['Intact', 'Clear', 'Meconium', 'Bloody']}
        filtersSelected={[0]}
      />
    );
    expect(component).toBeDefined();
  });

  it('renders without crashing', () => {
    const component = mountWithIntl(
      <VcDiagnosisCardContent
        value="Possible Diagnosis"
        filterOptions={['Intact', 'Clear', 'Meconium', 'Bloody']}
        filtersSelected={[0]}
      />
    );
    expect(component).toBeDefined();
  });

  it('renders without crashing', () => {
    const component = mountWithIntl(
      <VcDiagnosisCardContent
        value="Summary"
        filterComments={['Intact', 'Clear', 'Meconium', 'Bloody']}
        editComment={mockFunc}
      />
    );
    expect(component).toBeDefined();
  });

  it('renders without crashing', () => {
    const component = mountWithIntl(
      <VcDiagnosisCardContent
        value="Summary"
        filterComments={[]}
        editComment={mockFunc}
      />
    );
    expect(component).toBeDefined();
  });
});
