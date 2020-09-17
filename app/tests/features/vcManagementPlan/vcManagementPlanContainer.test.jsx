import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { createMockStore } from 'redux-test-utils';

import VcManagementPlanContainer from '../../../js/features/vcManagementPlan/vcManagementPlanContainer';
import { diagToForm } from '../../../js/uuid';
import {
  selectFormAction,
  submitFormAction,
} from '../../../js/state/ui/form/actions';
import { REST_API_PATHNAME } from '../../../js/paths';

describe('VcManagementPlanContainer', () => {
  let store, component, testState, diagnosis;

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
        formResource: fromJS({
          fetching: false,
          requiredFormFields: {},
          formResourceData: {
            results: [
              {
                uuid: 'de5affcd-8881-47ea-8fce-8f0d68696cbf',
                name: 'Demographics',
                valueReference: '{"saveButtons":[{"save":{"label":"Save"}}]}',
                display: 'Demographics',
                resourceVersion: '1.9',
                links: [
                  {
                    rel: 'value',
                    uri:
                      'http://localhost:8080/openmrs/ws/rest/v1/form/71a643f5-63e1-439f-a8a6-cb4f2bced721/resource/de5affcd-8881-47ea-8fce-8f0d68696cbf?v=full',
                  },
                  {
                    rel: 'self',
                    uri:
                      'http://localhost:8080/openmrs/ws/rest/v1/form/71a643f5-63e1-439f-a8a6-cb4f2bced721/resource/de5affcd-8881-47ea-8fce-8f0d68696cbf?v=full',
                  },
                  {
                    rel: 'full',
                    uri:
                      'http://localhost:8080/openmrs/ws/rest/v1/form/71a643f5-63e1-439f-a8a6-cb4f2bced721/resource/de5affcd-8881-47ea-8fce-8f0d68696cbf?v=full',
                  },
                ],
              },
            ],
          },
          selectedFormResource: '71a643f5-63e1-439f-a8a6-cb4f2bced721',
        }),
      },
    };
    store = createMockStore(testState);
    diagnosis = {
      uuid: '230AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      display: 'PPH',
    };
    component = shallow(
      <VcManagementPlanContainer
        store={store}
        location={{
          pathname: '01234567DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD89',
        }}
        key={diagnosis.uuid}
        diagnosis={diagnosis}
      />
    );
  });

  it('should pass props defined in mapStateToProps', () => {
    expect(component).toBeDefined();
    const managementPlanContainer = component.dive();
    const componentProps = [
      'acuity',
      'isStarted',
      'formMetaData',
      'timestamp',
      'uuid',
      'formId',
    ];
    expect(Object.keys(managementPlanContainer.props())).toEqual(
      expect.arrayContaining(componentProps)
    );
  });

  it('should pass props defined in mapDispatchToProps', () => {
    expect(component).toBeDefined();
    const managementPlanList = component.dive();
    const componentProps = ['onSubmit', 'selectForm'];
    expect(Object.keys(managementPlanList.props())).toEqual(
      expect.arrayContaining(componentProps)
    );
  });

  it('should dispatch actions', () => {
    expect(component).toBeDefined();
    const managementPlanContainer = component.dive();
    managementPlanContainer
      .props()
      .selectForm('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', 'formIndex');
    const isSelectFormActionDispatched = store.isActionDispatched(
      selectFormAction('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', 'formIndex')
    );
    expect(isSelectFormActionDispatched).toBe(true);

    managementPlanContainer.props().onSubmit('encounterTypeId');
    const isSubmitFormActionDispatched = store.isActionDispatched(
      submitFormAction(
        REST_API_PATHNAME,
        'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
        [diagToForm[diagnosis.uuid]],
        'encounterTypeId'
      )
    );
    expect(isSubmitFormActionDispatched).toBe(true);

    managementPlanContainer.props().onSubmit('encounterTypeId', ['123']);
    const isSubmitFormWithVoidedFieldActionDispatched = store.isActionDispatched(
      submitFormAction(
        REST_API_PATHNAME,
        'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
        [diagToForm[diagnosis.uuid]],
        'encounterTypeId',
        ['123']
      )
    );
    expect(isSubmitFormWithVoidedFieldActionDispatched).toBe(true);
  });
});
