import React from 'react';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import { createMockStore } from 'redux-test-utils';
import { mountWithIntl } from '../../enzyme-test-helpers';
import { conceptClass, validDiagnoses } from '../../../js/uuid';
import { REST_API_PATHNAME } from '../../../js/paths';
import VcDiagnosisContainer from '../../../js/features/vcDiagnosis/vcDiagnosisContainer';
import { pick } from 'lodash';
import { createConfirmedDiagnosisObservation } from '../../../js/features/vcDiagnosis/diagnosisHelpers';
import {
  VcDiagnosisCard,
  VcDiagnosisList,
  VcButton,
  VcAlphaScrollList,
} from '@vecnacares/vc-ui';
import {
  toggleAddDiagnosisAction,
  toggleRemoveDiagnosisAction,
  saveObservationAction,
} from '../../../js/state/ui/obs/actions';

describe('vcDiagnosisContainer', () => {
  let store,
    storeWithDiag,
    component,
    componentWithDiag,
    testState,
    testStateWithDiag;

  beforeEach(() => {
    testState = {
      Visits: fromJS({ data: { [validDiagnoses[0].uuid]: { diagnoses: [] } } }),
      entities: fromJS({
        episodes: {},
        observations: {},
      }),
      ui: {
        episode: fromJS({}),
        observation: fromJS({}),
      },
    };
    testStateWithDiag = {
      Visits: fromJS({
        data: {
          [validDiagnoses[0].uuid]: {
            diagnoses: [{ uuid: validDiagnoses[0].uuid }],
            changedDiagnoses: [
              {
                uuid: validDiagnoses[0].uuid,
                certaintyUuid: conceptClass.CONFIRMED_DIAGNOSIS_UUID,
              },
              {
                uuid: validDiagnoses[1].uuid,
                certaintyUuid: conceptClass.PRESUMED_DIAGNOSIS_UUID,
              },
            ],
          },
        },
      }),
      entities: fromJS({
        episodes: {},
        observations: {},
      }),
      ui: {
        episode: fromJS({}),
        observation: fromJS({}),
      },
    };
    store = createMockStore(testState);
    storeWithDiag = createMockStore(testStateWithDiag);
    component = mountWithIntl(
      <Provider store={store}>
        <VcDiagnosisContainer
          location={{
            pathname: `01234567${validDiagnoses[0].uuid}`,
          }}
          encounterUuid="encounterId"
        />
      </Provider>
    );
    componentWithDiag = mountWithIntl(
      <Provider store={storeWithDiag}>
        <VcDiagnosisContainer
          location={{
            pathname: `01234567${validDiagnoses[0].uuid}`,
          }}
          encounterUuid="encounterId"
        />
      </Provider>
    );
  });

  it('should render without throwing an error', () => {
    expect(component).toBeDefined();
  });

  it('should provide the right props to the wrapped component', () => {
    expect(componentWithDiag).toBeDefined();
    const vcDiagnosis = componentWithDiag.find('VcDiagnosis').at(0);
    const sortedDiagnoses = validDiagnoses.sort((a, b) =>
      a.display > b.display ? 1 : -1
    );
    expect(vcDiagnosis.props().allDiagnoses).toEqual(sortedDiagnoses);
    expect(vcDiagnosis.props().confirmedDiagnoses).toEqual([]);
    expect(vcDiagnosis.props().possibleDiagnoses).toEqual([]);
  });

  it('actions should get dispatched', () => {
    const actions = storeWithDiag.getActions();
    const vcDiagnosis = componentWithDiag.find('VcDiagnosis').at(0);

    vcDiagnosis.props().addDiagnosis('uuid');
    vcDiagnosis.props().removeDiagnosis('uuid');
    vcDiagnosis.props().saveObservation({});
    vcDiagnosis.props().onSubmit('changedDiagnoses');

    expect(actions).toEqual([
      toggleAddDiagnosisAction('uuid'),
      toggleRemoveDiagnosisAction('uuid'),
      saveObservationAction(REST_API_PATHNAME, {}),
    ]);

    const vcDiagnosis2 = component.find('VcDiagnosis').at(0);

    const newDiagnosesUuids = ['123', '1234'];
    const newDiagnoses = newDiagnosesUuids.map(uuid =>
      createConfirmedDiagnosisObservation(
        uuid,
        vcDiagnosis.props().encounterUuid,
        vcDiagnosis.props().patientUuid
      )
    );
    const newDiagnoses2 = newDiagnosesUuids.map(uuid =>
      createConfirmedDiagnosisObservation(
        uuid,
        '',
        vcDiagnosis2.props().patientUuid
      )
    );

    const confirmedDiagnoses = [
      {
        uuid: '190019DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
        display: 'Active Labor',
        datatype: {
          uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
          display: 'N/A',
        },
        conceptClass: {
          uuid: '8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Diagnosis',
        },
        attributes: [
          {
            uuid: '0211893d-98df-41ab-8df7-6999f2a3ec45',
            display: 'Diagnosis Acuity: ',
            value: '',
            attributeType: {
              uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
              display: 'Diagnosis Acuity',
            },
            voided: false,
          },
        ],
      },
    ];

    const removedDiagnoses = [
      {
        uuid: '190019DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
        display: 'Active Labor',
        datatype: {
          uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
          display: 'N/A',
        },
        conceptClass: {
          uuid: '8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Diagnosis',
        },
        attributes: [
          {
            uuid: '0211893d-98df-41ab-8df7-6999f2a3ec45',
            display: 'Diagnosis Acuity: ',
            value: '',
            attributeType: {
              uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
              display: 'Diagnosis Acuity',
            },
            voided: false,
          },
        ],
      },
    ];

    const uuids = pick(vcDiagnosis.props(), [
      'patientUuid',
      'encounterUuid',
      'episodeUuid',
      'visitUuid',
    ]);

    vcDiagnosis
      .props()
      .saveDiagnoses(
        { newDiagnoses, confirmedDiagnoses, removedDiagnoses },
        uuids
      );
    vcDiagnosis2
      .props()
      .saveDiagnoses(
        { newDiagnoses2, confirmedDiagnoses, removedDiagnoses },
        {}
      );
  });
});
