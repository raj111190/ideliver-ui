import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { createMockStore } from 'redux-test-utils';

import { form, conceptClass, encounterType, programs } from '../../../js/uuid';
import ClientDashboardContainer, {
  getPatientStatus,
} from '../../../js/features/clientDashboard/clientDashboardContainer';
import { PATIENT_STATUS } from '../../../js/components/vcPatientStatus/vcPatientStatus';
import selectVisitAction from '../../../js/features/visits/actions/selectVisitAction';
import { fetchEpisodesAction } from '../../../js/state/ui/episode/actions';
import { REST_API_PATHNAME } from '../../../js/paths';
import { saveVisitAttributeAction } from '../../../js/state/ui/visit/actions';

describe('ClientDashboardContainer', () => {
  let store,
    store2,
    store3,
    store4,
    component,
    component2,
    component3,
    component4,
    testState,
    testState2,
    testState3,
    testState4;

  beforeEach(() => {
    testState = {
      Visits: fromJS({
        metadata: { forms: { [form.COMPLAINTS_FORM_UUID]: {} } },
        data: {
          89: {
            encounters: {
              [encounterType.VISIT_SUMMARY_ENCOUNTER_TYPE_UUID]: {},
            },
            uuid: 1,
            name: 'test',
            diagnoses: [
              {
                groupMembers: [
                  {
                    value: {
                      uuid: conceptClass.PRESUMED_DIAGNOSIS_UUID,
                      display: 'testDisplay-1',
                    },
                    concept: { uuid: conceptClass.DIAGNOSIS_CERTAINTY_UUID },
                  },
                  {
                    value: {
                      uuid: conceptClass.CONFIRMED_DIAGNOSIS_UUID,
                      display: 'testDisplay0',
                    },
                    concept: { uuid: conceptClass.DIAGNOSIS_PROBLEM_LIST_UUID },
                  },
                  {
                    value: { uuid: 'testUuid1', display: 'testDisplay1' },
                    concept: {
                      uuid: conceptClass.DIAGNOSIS_ORDER_CONCEPT_UUID,
                    },
                  },
                ],
              },
            ],
          },
        },
      }),
      ui: {
        episode: fromJS({
          currentEpisode: '123',
        }),
        form: fromJS({
          selectedForm: '123',
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
        visit: fromJS({
          currentVisit: '',
        }),
      },
      entities: fromJS({
        concepts: {},
        encounters: {},
        observations: {},
        episodes: {},
      }),
    };
    testState2 = {
      Visits: fromJS({ data: { 89: null } }),
      ui: {
        episode: fromJS({
          currentEpisode: '123',
        }),
        form: fromJS({
          selectedForm: '123',
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
        visit: fromJS({
          currentVisit: '',
        }),
      },
      entities: fromJS({
        concepts: {},
        encounters: {},
        observations: {},
        episodes: {},
      }),
    };
    testState3 = {
      Visits: fromJS({
        data: {
          89: {
            uuid: 1,
            name: 'test',
            diagnoses: [
              {
                groupMembers: [
                  {
                    value: {
                      uuid: conceptClass.CONFIRMED_DIAGNOSIS_UUID,
                      display: 'testDisplay-1',
                    },
                    concept: { uuid: conceptClass.DIAGNOSIS_CERTAINTY_UUID },
                  },
                  {
                    value: {
                      uuid: conceptClass.CONFIRMED_DIAGNOSIS_UUID,
                      display: 'testDisplay0',
                    },
                    concept: { uuid: conceptClass.DIAGNOSIS_PROBLEM_LIST_UUID },
                  },
                  {
                    value: { uuid: 'testUuid1', display: 'testDisplay1' },
                    concept: {
                      uuid: conceptClass.DIAGNOSIS_ORDER_CONCEPT_UUID,
                    },
                  },
                ],
              },
            ],
          },
        },
      }),
      ui: {
        episode: fromJS({
          currentEpisode: '123',
        }),
        form: fromJS({
          selectedForm: '123',
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
        visit: fromJS({
          currentVisit: '',
        }),
      },
      entities: fromJS({
        concepts: {},
        encounters: {},
        observations: {},
        episodes: {},
      }),
    };
    testState4 = {
      Visits: fromJS({
        data: {
          89: {
            uuid: 1,
            name: 'test',
            diagnoses: [
              {
                groupMembers: [
                  {
                    value: {
                      uuid: conceptClass.CONFIRMED_DIAGNOSIS_UUID,
                      display: 'testDisplay-1',
                    },
                    concept: { uuid: conceptClass.DIAGNOSIS_CERTAINTY_UUID },
                  },
                  {
                    value: {
                      uuid: conceptClass.CONFIRMED_DIAGNOSIS_UUID,
                      display: 'testDisplay0',
                    },
                    concept: { uuid: conceptClass.DIAGNOSIS_PROBLEM_LIST_UUID },
                  },
                ],
              },
            ],
          },
        },
      }),
      ui: {
        episode: fromJS({
          currentEpisode: '123',
        }),
        form: fromJS({
          selectedForm: '123',
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
        visit: fromJS({
          currentVisit: '',
        }),
      },
      entities: fromJS({
        concepts: {},
        encounters: {},
        observations: {},
        episodes: {},
      }),
    };
    store = createMockStore(testState);
    store2 = createMockStore(testState2);
    store3 = createMockStore(testState3);
    store4 = createMockStore(testState4);
    component = shallow(
      <ClientDashboardContainer
        store={store}
        location={{ pathname: '/clients/visitId/patientId/' }}
      />
    );

    component2 = shallow(
      <ClientDashboardContainer
        store={store2}
        location={{ pathname: '/clients/visitId/patientId/' }}
      />
    );
    component3 = shallow(
      <ClientDashboardContainer
        store={store3}
        location={{ pathname: '/clients/visitId/patientId/' }}
      />
    );
    component4 = shallow(
      <ClientDashboardContainer
        store={store4}
        location={{ pathname: '/clients/visitId/patientId/' }}
      />
    );
  });

  it('should render without throwing an error 1', () => {
    expect(component).toBeDefined();
  });

  it('should render without throwing an error 2', () => {
    expect(component2).toBeDefined();
  });

  it('should render without throwing an error 3', () => {
    expect(component3).toBeDefined();
  });

  it('should render without throwing an error groupmembers less than 3', () => {
    expect(component4).toBeDefined();
  });

  it('demo action should get dispatched', () => {
    component
      .dive()
      .props()
      .fetchEpisodes();
    component
      .dive()
      .props()
      .updatePatientStatus(['formUuid']);

    const actions = store.getActions();
    expect(actions[0]).toEqual(selectVisitAction('visitId', 'patientId'));
    expect(actions[1]).toEqual(
      fetchEpisodesAction(REST_API_PATHNAME, {
        patientUuid: 'patientId',
        programUuid: programs.PREGNANCY_PROGRAM,
      })
    );
    expect(actions[2]).toEqual(
      saveVisitAttributeAction(
        REST_API_PATHNAME,
        {
          attributeType: '4402828d-2b88-48f6-ba25-1ba866aa11e2',
          value: null,
        },
        'visitId'
      )
    );
    expect(actions[3]).toBeUndefined();
  });

  it('gets the patient status depending on the form uuid', () => {
    expect(getPatientStatus(form.GENERAL_INFO_FORM_UUID)).toEqual(
      PATIENT_STATUS.ASSESSMENT
    );
    expect(getPatientStatus(form.LABOUR_SIGNS_FORM_UUID)).toEqual(
      PATIENT_STATUS.ASSESSMENT
    );
    expect(getPatientStatus(form.ADMISSION_FORM_UUID)).toEqual(
      PATIENT_STATUS.ADMITTED
    );
    expect(getPatientStatus(form.REFERRAL_FORM_UUID)).toEqual(
      PATIENT_STATUS.REFERRAL
    );
    expect(getPatientStatus(form.DISCHARGE_FORM_UUID)).toEqual(
      PATIENT_STATUS.DISCHARGED
    );
    expect(getPatientStatus('')).toEqual(null);
  });
});
