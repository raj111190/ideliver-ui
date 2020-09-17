import React from 'react';
import { shallow } from 'enzyme';
import ManagementPlansList from '../../../js/features/managementPlansList/managementPlansList';

describe('ManagementPlansList', () => {
  it('renders without crashing', () => {
    const component = shallow(
      <ManagementPlansList
        location={{
          pathname: '01234567DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD89',
        }}
        confirmedDiagnoses={[{ value: { uuid: 'mockUuid' } }]}
      />
    );
    expect(component).toBeDefined();
  });
});
