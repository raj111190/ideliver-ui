import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { createMockStore } from 'redux-test-utils';

import ManagementPlansListContainer from '../../../js/features/managementPlansList/managementPlansListContainer';

describe('ManagementPlansListContainer', () => {
  let store, component, testState;

  beforeEach(() => {
    testState = {
      Visits: fromJS({
        metadata: { forms: { mockFormId: { schema: 'schema' } } },
        data: {
          DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD: {
            forms: { mockFormId: { data: 'data' } },
          },
        },
      }),
      entities: fromJS({
        episodes: {},
        encounters: {},
        observations: {},
      }),
      ui: {
        episode: fromJS({
          currentEpisode: '123',
        }),
        observation: fromJS({}),
        form: fromJS({
          selectedForm: '123',
          formData: {
            DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD: {
              mockFormId: { data: 'data' },
            },
          },
        }),
      },
    };
    store = createMockStore(testState);
    component = shallow(
      <ManagementPlansListContainer
        store={store}
        location={{
          pathname: '01234567DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD89',
        }}
        uuid="mockFormId"
      />
    );
  });

  it('should pass props defined in mapStateToProps', () => {
    expect(component).toBeDefined();
    const managementPlanList = component.dive();
    const componentProps = ['confirmedDiagnoses', 'location'];
    expect(Object.keys(managementPlanList.props())).toEqual(
      expect.arrayContaining(componentProps)
    );
  });
});
