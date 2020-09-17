import React from 'react';
import { concept } from '../../../js/uuid';
import { mountWithIntl } from '../../enzyme-test-helpers';
import moment from 'moment-timezone';
import {
  VcCardexTabs,
  VcCardexWindow,
  VcButton,
  VcTimeInput,
} from '@vecnacares/vc-ui';
import VcPatientNotes from '../../../js/features/VcPatientNotes/vcPatientNotes';
import VcTextField from '../../../js/components/vcTextField/vcTextField';

describe('VcPatientNotes', () => {
  let mockFunc;
  let wrapper;
  const currentDateTime = moment().toString();

  const editObs = {
    concept: concept.DOCTOR_NOTES,
    uuid: '987654321',
    notesValue: 'notesValue',
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
        uuid: '987654321',
        obsDatetime: currentDateTime,
        voided: false,
        encounter: {
          uuid: 'encounter123',
        },
        value: 'notesValue',
        display: 'Notes: notesValue',
      },
      {
        concept: {
          uuid: concept.CARDEX_TIME,
          display: 'Cardex Time',
        },
        uuid: 'timeObs123',
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

  const patientNotes = [
    {
      concept: concept.DOCTOR_NOTES,
      uuid: '987654321',
      notesValue: 'notesValue',
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
          uuid: '987654321',
          obsDatetime: currentDateTime,
          voided: false,
          encounter: {
            uuid: 'encounter123',
          },
          value: 'notesValue',
          display: 'Notes: notesValue',
        },
        {
          concept: {
            uuid: concept.CARDEX_TIME,
            display: 'Cardex Time',
          },
          uuid: 'timeObs123',
          value: currentDateTime,
          obsDatetime: currentDateTime,
          voided: false,
          encounter: {
            uuid: 'encounter123',
          },
          display: `Cardex Time: ${currentDateTime}`,
        },
      ],
    },
    {
      concept: concept.DOCTOR_NOTES,
      uuid: '987654331',
      notesValue: 'notesValue2',
      timeValue: currentDateTime,
      hasEdit: false,
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
    },
  ];

  beforeEach(() => {
    mockFunc = jest.fn();
    wrapper = mountWithIntl(
      <VcPatientNotes patientNotes={patientNotes} onSubmit={mockFunc} />
    );
  });

  it('should render', () => {
    expect(wrapper).toBeDefined();

    const tabChange = wrapper.find(VcCardexTabs).at(0);
    tabChange.props().onTabChange('Doctor');

    const newTab = wrapper
      .find(VcCardexTabs)
      .at(0)
      .find('Button')
      .at(0);
    newTab.simulate('click');

    const select = wrapper.find(VcButton).at(0);
    select.props().onClick();

    const dateTime = wrapper.find(VcTimeInput).at(0);
    dateTime.props().onHourChange(moment(currentDateTime).hours());
    dateTime.props().onMinuteChange(moment(currentDateTime).minutes());

    const textField = wrapper.find(VcTextField).at(0);
    textField.props().onChange('newText');

    expect(mockFunc.mock.calls.length).toBe(0);

    const submit = wrapper.find(VcButton).at(0);
    submit.props().onClick('value');

    expect(mockFunc.mock.calls.length).toBe(1);

    tabChange.props().onEditRow(editObs);
    textField.props().onChange('newText2');
    submit.props().onClick('value');

    const window = wrapper.find(VcCardexWindow).at(0);
    const buttons = window.props().buttons;
    buttons.forEach(button => button.callBack);
  });
});
