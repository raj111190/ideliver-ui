import React from 'react';
import {
  VcDiagnosisCard,
  VcDiagnosisList,
  VcButton,
  VcAlphaScrollList,
} from '@vecnacares/vc-ui';
import VcDiagnosis from '../../../js/features/vcDiagnosis/vcDiagnosis';
import { validDiagnoses } from '../../../js/uuid';
import { shallowWithIntl } from '../../enzyme-test-helpers';
import VcDialog from '../../../js/components/vcDialog/vcDialog';

export const possibleDiagnoses = [
  {
    uuid: '190002DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Antepartum Haemorrhage',
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
        uuid: 'ec44bb06-d502-4fc7-8857-03eb117f769f',
        display: 'Diagnosis Acuity: 2',
        value: '2',
        attributeType: {
          uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
          display: 'Diagnosis Acuity',
        },
        voided: false,
      },
    ],
  },
];
export const confirmedDiagnoses = [
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
export const conceptToObsMap = {
  '190019DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD': {
    uuid: 'fc583dcf-4cbc-4d35-96e1-71f629a5a2ec',
    display: 'Visit Diagnoses: Confirmed diagnosis, Active Labor, Primary',
    voided: false,
    obsDatetime: '2019-08-20T17:28:47.000-0400',
    concept: {
      uuid: '159947AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      display: 'Visit Diagnoses',
      datatype: {
        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
        display: 'N/A',
      },
      conceptClass: {
        uuid: '8d492594-c2cc-11de-8d13-0010c6dffd0f',
        display: 'ConvSet',
      },
      attributes: [],
    },
    value: null,
    groupMembers: [
      {
        uuid: '695fdfec-3417-4437-be6e-9ca637f3b413',
        display: 'Diagnosis certainty: Confirmed diagnosis',
        voided: false,
        obsDatetime: '2019-08-20T17:28:47.000-0400',
        concept: {
          uuid: '159394AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          display: 'Diagnosis certainty',
          datatype: {
            uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Coded',
          },
          conceptClass: {
            uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Finding',
          },
          attributes: [],
        },
        value: {
          uuid: '159392AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          display: 'Confirmed diagnosis',
          datatype: {
            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
            display: 'N/A',
          },
          conceptClass: {
            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Misc',
          },
          attributes: [],
        },
        encounter: 'abd782c5-eaae-4dda-be09-193242ed5949',
      },
      {
        uuid: 'dd1b3c17-ce87-4841-8b01-60a91aa54361',
        display: 'PROBLEM LIST: Active Labor',
        voided: false,
        obsDatetime: '2019-08-20T17:28:47.000-0400',
        concept: {
          uuid: '1284AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          display: 'PROBLEM LIST',
          datatype: {
            uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Coded',
          },
          conceptClass: {
            uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Finding',
          },
          attributes: [],
        },
        value: {
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
        encounter: 'abd782c5-eaae-4dda-be09-193242ed5949',
      },
      {
        uuid: '206d1f1e-66cf-4693-a5ef-153537f5fd45',
        display: 'Diagnosis order: Primary',
        voided: false,
        obsDatetime: '2019-08-20T17:28:47.000-0400',
        concept: {
          uuid: '159946AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          display: 'Diagnosis order',
          datatype: {
            uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Coded',
          },
          conceptClass: {
            uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Finding',
          },
          attributes: [],
        },
        value: {
          uuid: '159943AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          display: 'Primary',
          datatype: {
            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
            display: 'N/A',
          },
          conceptClass: {
            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Misc',
          },
          attributes: [],
        },
        encounter: 'abd782c5-eaae-4dda-be09-193242ed5949',
      },
    ],
    encounter: 'abd782c5-eaae-4dda-be09-193242ed5949',
  },
  '190002DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD': {
    uuid: 'b145af94-7777-4ae2-aa09-e72af8758a77',
    display:
      'Visit Diagnoses: Presumed diagnosis, Primary, Antepartum Haemorrhage',
    voided: false,
    obsDatetime: '2019-08-20T17:28:47.000-0400',
    concept: {
      uuid: '159947AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      display: 'Visit Diagnoses',
      datatype: {
        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
        display: 'N/A',
      },
      conceptClass: {
        uuid: '8d492594-c2cc-11de-8d13-0010c6dffd0f',
        display: 'ConvSet',
      },
      attributes: [],
    },
    value: null,
    groupMembers: [
      {
        uuid: 'de1e5b8f-d08b-4c64-821c-313be17a5344',
        display: 'Diagnosis certainty: Presumed diagnosis',
        voided: false,
        obsDatetime: '2019-08-20T17:28:47.000-0400',
        concept: {
          uuid: '159394AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          display: 'Diagnosis certainty',
          datatype: {
            uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Coded',
          },
          conceptClass: {
            uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Finding',
          },
          attributes: [],
        },
        value: {
          uuid: '159393AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          display: 'Presumed diagnosis',
          datatype: {
            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
            display: 'N/A',
          },
          conceptClass: {
            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Misc',
          },
          attributes: [],
        },
        encounter: 'abd782c5-eaae-4dda-be09-193242ed5949',
      },
      {
        uuid: 'dd0ac468-76af-4bae-b767-71a69cb387aa',
        display: 'Diagnosis order: Primary',
        voided: false,
        obsDatetime: '2019-08-20T17:28:47.000-0400',
        concept: {
          uuid: '159946AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          display: 'Diagnosis order',
          datatype: {
            uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Coded',
          },
          conceptClass: {
            uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Finding',
          },
          attributes: [],
        },
        value: {
          uuid: '159943AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          display: 'Primary',
          datatype: {
            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
            display: 'N/A',
          },
          conceptClass: {
            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Misc',
          },
          attributes: [],
        },
        encounter: 'abd782c5-eaae-4dda-be09-193242ed5949',
      },
      {
        uuid: 'bbde5bb0-a249-4b28-9f50-c01fffc90f8c',
        display: 'PROBLEM LIST: Antepartum Haemorrhage',
        voided: false,
        obsDatetime: '2019-08-20T17:28:47.000-0400',
        concept: {
          uuid: '1284AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          display: 'PROBLEM LIST',
          datatype: {
            uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Coded',
          },
          conceptClass: {
            uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Finding',
          },
          attributes: [],
        },
        value: {
          uuid: '190002DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          display: 'Antepartum Haemorrhage',
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
              uuid: 'ec44bb06-d502-4fc7-8857-03eb117f769f',
              display: 'Diagnosis Acuity: 2',
              value: '2',
              attributeType: {
                uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
                display: 'Diagnosis Acuity',
              },
              voided: false,
            },
          ],
        },
        encounter: 'abd782c5-eaae-4dda-be09-193242ed5949',
      },
    ],
    encounter: 'abd782c5-eaae-4dda-be09-193242ed5949',
  },
};
export const patientDiagnoses = [
  {
    uuid: 'b145af94-7777-4ae2-aa09-e72af8758a77',
    name: 'Antepartum Haemorrhage',
    certainty: 'Possible',
    acuity: 2,
  },
  {
    uuid: 'fc583dcf-4cbc-4d35-96e1-71f629a5a2ec',
    name: 'Active Labor',
    certainty: 'Confirmed',
    acuity: undefined,
  },
];

describe('VcDiagnosis', () => {
  let saveObservationMock;
  let saveDiagnosesMock;
  let addDiagnosisMock;
  let removeDiagnosisMock;
  let pushMock;
  let component;
  let wrapper;

  const allDiagnoses = validDiagnoses.sort((a, b) => {
    return a.display > b.display ? 1 : -1;
  });

  beforeEach(() => {
    saveObservationMock = jest.fn();
    addDiagnosisMock = jest.fn();
    removeDiagnosisMock = jest.fn();
    saveDiagnosesMock = jest.fn();
    pushMock = jest.fn();
    wrapper = shallowWithIntl(
      <VcDiagnosis
        visitUuid="123"
        allDiagnoses={allDiagnoses}
        confirmedDiagnoses={confirmedDiagnoses}
        possibleDiagnoses={possibleDiagnoses}
        conceptToObsMap={conceptToObsMap}
        patientDiagnoses={patientDiagnoses}
        saveObservation={saveObservationMock}
        addDiagnosis={addDiagnosisMock}
        removeDiagnosis={removeDiagnosisMock}
        saveDiagnoses={saveDiagnosesMock}
        history={{ push: pushMock }}
      />
    );
    component = wrapper.dive();
  });

  it('should render', () => {
    expect(component).toBeDefined();
    expect(component.find(VcDiagnosisCard).length).toBe(1);
    expect(component.find(VcDialog).length).toBe(1);
  });

  describe('VcDiagnosisCard', () => {
    it('should render diagnoses in the diagnosis card', () => {
      expect(component).toBeDefined();
      const diagnosisCard = component.find(VcDiagnosisCard).dive();
      expect(diagnosisCard.length).toBe(1);
      expect(diagnosisCard.prop('diagnoses')).toEqual(patientDiagnoses);
    });

    it('should confirm a diagnosis', () => {
      const diagnosisCard = component.find(VcDiagnosisCard).dive();
      expect(diagnosisCard.length).toBe(1);
      const possibleDiagnosisList = diagnosisCard
        .dive()
        .find(VcDiagnosisList)
        .at(1);
      const confirm = possibleDiagnosisList
        .shallow()
        .dive()
        .childAt(0)
        .childAt(2)
        .children()
        .at(0);
      confirm.simulate('click');
      expect(saveObservationMock.mock.calls.length).toEqual(1);
    });

    it('should navigate to management plan', () => {
      const diagnosisCard = component.find(VcDiagnosisCard).dive();
      expect(diagnosisCard.length).toBe(1);
      const possibleDiagnosisList = diagnosisCard
        .dive()
        .find(VcDiagnosisList)
        .at(0);
      const diagnosis = possibleDiagnosisList
        .shallow()
        .dive()
        .childAt(0)
        .childAt(1);
      diagnosis.simulate('click');
      expect(pushMock.mock.calls.length).toEqual(0);
    });
  });

  describe('VcDiagnosisCard', () => {
    test('dialog picker should not be open by default', () => {
      expect(component).toBeDefined();
      const dialog = component.find(VcDialog).dive();
      expect(dialog.prop('open')).toBe(false);
    });

    it('should open the diagnosis dialog', () => {
      const diagnosisCard = component.find(VcDiagnosisCard).dive();

      const addMoreButton = diagnosisCard.dive().find(VcButton);
      addMoreButton.simulate('click');
      const dialog = component.find(VcDialog).dive();
      expect(dialog.prop('open')).toBe(true);
    });

    it('should toggle diagnosis', () => {
      wrapper = shallowWithIntl(
        <VcDiagnosis
          allDiagnoses={allDiagnoses}
          confirmedDiagnoses={confirmedDiagnoses}
          possibleDiagnoses={possibleDiagnoses}
          conceptToObsMap={conceptToObsMap}
          patientDiagnoses={patientDiagnoses}
          saveObservation={saveObservationMock}
          addDiagnosis={addDiagnosisMock}
          removeDiagnosis={removeDiagnosisMock}
          saveDiagnoses={saveDiagnosesMock}
          removedDiagnoses={[validDiagnoses[0].uuid]}
          addedDiagnoses={[validDiagnoses[1].uuid, validDiagnoses[2].uuid]}
        />
      );
      component = wrapper.dive();
      const diagnosisCard = component.find(VcDiagnosisCard).dive();

      const addMoreButton = diagnosisCard.dive().find(VcButton);
      addMoreButton.simulate('click');
      const dialog = component.find(VcDialog).dive();
      expect(dialog.prop('open')).toBe(true);

      const alphaScrollList = dialog
        .dive()
        .find(VcAlphaScrollList)
        .dive()
        .dive()
        .childAt(0);

      const diagnosesList = alphaScrollList
        .dive()
        .childAt(1)
        .dive()
        .childAt(3)
        .dive()
        .childAt(0)
        .dive()
        .children();
      const first = diagnosesList.at(0);
      const second = diagnosesList.at(1);
      const third = diagnosesList.at(2);
      first.simulate('click');
      expect(removeDiagnosisMock.mock.calls.length).toEqual(1);

      second.simulate('click');
      expect(addDiagnosisMock.mock.calls.length).toEqual(1);

      third.simulate('click');
      expect(addDiagnosisMock.mock.calls.length).toEqual(2);

      const closeButton = alphaScrollList
        .dive()
        .childAt(2)
        .dive()
        .childAt(0);
      closeButton.simulate('click');
      expect(saveDiagnosesMock.mock.calls.length).toEqual(1);
    });
  });
});
