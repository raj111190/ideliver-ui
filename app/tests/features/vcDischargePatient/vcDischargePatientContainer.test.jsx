import React from 'react';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import { createMockStore } from 'redux-test-utils';
import { mountWithIntl } from '../../enzyme-test-helpers';
import moment from 'moment-timezone';
import { concept } from '../../../js/uuid';
import VcDischargePatientContainer from '../../../js/features/VcDischargePatient/vcDischargePatientContainer';
import VcDischargePatient from '../../../js/features/VcDischargePatient/vcDischargePatient';

describe('VcDischargePatientContainer', () => {
  let store, component, componentWithoutEncounter, testState;
  const currentDateTime = moment().toString();
  beforeEach(() => {
    testState = {
      Visits: fromJS({}),
      entities: fromJS({
        episodes: {},
        observations: {},
      }),
      ui: {
        episode: fromJS({}),
        observation: fromJS({}),
        visit: fromJS({}),
      },
    };

    store = createMockStore(testState);

    component = mountWithIntl(
      <Provider store={store}>
        <VcDischargePatientContainer
          location={{
            pathname: `0123456789`,
          }}
          encounterUuid="encounter123"
        />
      </Provider>
    );

    componentWithoutEncounter = mountWithIntl(
      <Provider store={store}>
        <VcDischargePatientContainer
          location={{
            pathname: `0123456789`,
          }}
        />
      </Provider>
    );
  });

  it('should render without throwing an error', () => {
    expect(component).toBeDefined();
    expect(componentWithoutEncounter).toBeDefined();
    const editObs = {
      concept: concept.DISCHARGE_NOTES,
      uuid: '987654331',
      notesValue: 'notesValue2',
      timeValue: currentDateTime,
      hasEdit: true,
      type: 'Doctor',
      obsDatetime: currentDateTime,
      voided: false,
      encounter: {
        uuid: 'encounter123',
      },
      groupMembers: [
        {
          concept: {
            uuid: concept.NOTES,
            display: 'Notes',
          },
          uuid: '9876543321',
          obsDatetime: currentDateTime,
          voided: false,
          encounter: {
            uuid: 'encounter123',
          },
          value: 'notesValue2',
          display: 'Notes: notesValue',
        },
        {
          concept: {
            uuid: concept.DISCHARGE_TIME,
            display: 'Discharge Time',
          },
          uuid: 'timeObs1234',
          value: currentDateTime,
          obsDatetime: currentDateTime,
          voided: false,
          encounter: {
            uuid: 'encounter123',
          },
          display: `Discharge Time: ${currentDateTime}`,
        },
      ],
    };
    const container = component.find(VcDischargePatient).at(0);
    const actions = store.getActions();

    container.props().onSubmit(editObs, { encounterUuid: 'encounter123' });

    const newObsAction = [
      {
        observation: {
          concept: '200083DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          encounter: { uuid: 'encounter123' },
          groupMembers: [
            {
              concept: {
                display: 'Notes',
                uuid: '200030DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              },
              display: 'Notes: notesValue',
              encounter: { uuid: 'encounter123' },
              obsDatetime: currentDateTime,
              uuid: '9876543321',
              value: 'notesValue2',
              voided: false,
            },
            {
              concept: {
                display: 'Discharge Time',
                uuid: '59c05758-1eba-45d6-b240-a5d31baeea9a',
              },
              display: `Discharge Time: ${currentDateTime}`,
              encounter: { uuid: 'encounter123' },
              obsDatetime: currentDateTime,
              uuid: 'timeObs1234',
              value: currentDateTime,
              voided: false,
            },
          ],
          hasEdit: true,
          notesValue: 'notesValue2',
          obsDatetime: currentDateTime,
          timeValue: currentDateTime,
          type: 'Doctor',
          uuid: '987654331',
          voided: false,
        },
        options: { encounterUuid: 'encounter123' },
        type: 'SAVE_OBSERVATION_ACTION',
        url: '/openmrs/ws/rest/v1/',
      },
    ];
    expect(actions).toEqual(newObsAction);

    const patientNotes = componentWithoutEncounter
      .find(VcDischargePatient)
      .at(0);
    patientNotes.props().onSubmit(editObs, {});

    const newEncAction = [
      {
        observation: {
          concept: '200083DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          encounter: { uuid: 'encounter123' },
          groupMembers: [
            {
              concept: {
                display: 'Notes',
                uuid: '200030DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              },
              display: 'Notes: notesValue',
              encounter: { uuid: 'encounter123' },
              obsDatetime: currentDateTime,
              uuid: '9876543321',
              value: 'notesValue2',
              voided: false,
            },
            {
              concept: {
                display: 'Discharge Time',
                uuid: '59c05758-1eba-45d6-b240-a5d31baeea9a',
              },
              display: `Discharge Time: ${currentDateTime}`,
              encounter: { uuid: 'encounter123' },
              obsDatetime: currentDateTime,
              uuid: 'timeObs1234',
              value: currentDateTime,
              voided: false,
            },
          ],
          hasEdit: true,
          notesValue: 'notesValue2',
          obsDatetime: currentDateTime,
          timeValue: currentDateTime,
          type: 'Doctor',
          uuid: '987654331',
          voided: false,
        },
        options: { encounterUuid: 'encounter123' },
        type: 'SAVE_OBSERVATION_ACTION',
        url: '/openmrs/ws/rest/v1/',
      },
      {
        encounter: {
          encounterType: '181820aa-88c9-479b-9077-af92f5364329',
          obs: [
            {
              concept: '200083DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              encounter: { uuid: 'encounter123' },
              groupMembers: [
                {
                  concept: {
                    display: 'Notes',
                    uuid: '200030DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  },
                  display: 'Notes: notesValue',
                  encounter: { uuid: 'encounter123' },
                  obsDatetime: currentDateTime,
                  uuid: '9876543321',
                  value: 'notesValue2',
                  voided: false,
                },
                {
                  concept: {
                    display: 'Discharge Time',
                    uuid: '59c05758-1eba-45d6-b240-a5d31baeea9a',
                  },
                  display: `Discharge Time: ${currentDateTime}`,
                  encounter: { uuid: 'encounter123' },
                  obsDatetime: currentDateTime,
                  uuid: 'timeObs1234',
                  value: currentDateTime,
                  voided: false,
                },
              ],
              hasEdit: true,
              notesValue: 'notesValue2',
              obsDatetime: currentDateTime,
              timeValue: currentDateTime,
              type: 'Doctor',
              uuid: '987654331',
              voided: false,
            },
          ],
          patient: undefined,
          uuid: undefined,
          visit: undefined,
        },
        options: {},
        type: 'SAVE_ENCOUNTER_ACTION',
        url: '/openmrs/ws/rest/v1/',
      },
    ];

    expect(actions).toEqual(newEncAction);
  });
});
