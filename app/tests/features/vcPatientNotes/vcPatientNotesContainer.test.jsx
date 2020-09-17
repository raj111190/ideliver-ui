import React from 'react';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import { createMockStore } from 'redux-test-utils';
import { mountWithIntl } from '../../enzyme-test-helpers';
import moment from 'moment-timezone';
import { pick } from 'lodash';
import { concept } from '../../../js/uuid';
import VcPatientNotesContainer from '../../../js/features/VcPatientNotes/vcPatientNotesContainer';
import VcPatientNotes from '../../../js/features/VcPatientNotes/vcPatientNotes';

describe('VcPatientNotesContainer', () => {
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
        <VcPatientNotesContainer
          location={{
            pathname: `0123456789`,
          }}
          encounterUuid="encounter123"
        />
      </Provider>
    );

    componentWithoutEncounter = mountWithIntl(
      <Provider store={store}>
        <VcPatientNotesContainer
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
      concept: concept.DOCTOR_NOTES,
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
            uuid: concept.CARDEX_TIME,
            display: 'Cardex Time',
          },
          uuid: 'timeObs1234',
          value: currentDateTime,
          obsDatetime: currentDateTime,
          voided: false,
          encounter: {
            uuid: 'encounter123',
          },
          display: `Cardex Time: ${currentDateTime}`,
        },
      ],
    };
    const container = component.find(VcPatientNotes).at(0);
    const actions = store.getActions();

    container.props().onSubmit(editObs, { encounterUuid: 'encounter123' });

    const newObsAction = [
      {
        observation: {
          concept: '36cfb426-a0a3-426d-a3d7-474cdd560ec7',
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
                display: 'Cardex Time',
                uuid: '3b44f577-a574-4a49-9b67-37cc79e5b376',
              },
              display: `Cardex Time: ${currentDateTime}`,
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
        options: undefined,
        type: 'SAVE_OBSERVATION_ACTION',
        url: '/openmrs/ws/rest/v1/',
      },
    ];
    expect(actions).toEqual(newObsAction);

    const patientNotes = componentWithoutEncounter.find(VcPatientNotes).at(0);
    patientNotes.props().onSubmit(editObs, {});

    const newEncAction = [
      {
        observation: {
          concept: '36cfb426-a0a3-426d-a3d7-474cdd560ec7',
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
                display: 'Cardex Time',
                uuid: '3b44f577-a574-4a49-9b67-37cc79e5b376',
              },
              display: `Cardex Time: ${currentDateTime}`,
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
        options: undefined,
        type: 'SAVE_OBSERVATION_ACTION',
        url: '/openmrs/ws/rest/v1/',
      },
      {
        encounter: {
          encounterType: 'd7151f82-c1f3-4152-a605-2f9ea7414a79',
          obs: [
            {
              concept: '36cfb426-a0a3-426d-a3d7-474cdd560ec7',
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
                    display: 'Cardex Time',
                    uuid: '3b44f577-a574-4a49-9b67-37cc79e5b376',
                  },
                  display: `Cardex Time: ${currentDateTime}`,
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
