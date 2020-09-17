import React from 'react';
import { concept } from '../../../js/uuid';
import { mountWithIntl } from '../../enzyme-test-helpers';
import moment from 'moment-timezone';
import { VcCardexTabs, VcButton, VcTimeInput } from '@vecnacares/vc-ui';
import VcDischargePatient from '../../../js/features/VcDischargePatient/vcDischargePatient';
import VcCheckBoxGroup from '../../../js/components/vcCheckBoxGroup/vcCheckBoxGroup';
import VcTextField from '../../../js/components/vcTextField/vcTextField';

describe('VcDischargePatient', () => {
  let mockFunc;
  let wrapper;
  const currentDateTime = moment().toString();
  const patientNotes = [
    {
      concept: concept.DISCHARGE_NOTES,
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
            uuid: concept.DISCHARGE_TIME,
            display: 'Discharge Time',
          },
          uuid: 'timeObs123',
          value: currentDateTime,
          obsDatetime: currentDateTime,
          voided: false,
          encounter: {
            uuid: 'encounter123',
          },
          display: `Discharge Time: ${currentDateTime}`,
        },
      ],
    },
    {
      concept: concept.DISCHARGE_NOTES,
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
    },
  ];

  beforeEach(() => {
    mockFunc = jest.fn();
    wrapper = mountWithIntl(
      <VcDischargePatient
        onClose={mockFunc}
        onDischarge={mockFunc}
        patientNotes={patientNotes}
        onSubmit={mockFunc}
      />
    );
  });

  it('should render', () => {
    expect(wrapper).toBeDefined();

    const checkBox = wrapper.find(VcCheckBoxGroup).at(0);
    checkBox.props().onChange('change');

    const dateTime = wrapper.find(VcTimeInput).at(0);
    dateTime.props().onHourChange(moment(currentDateTime).hours());
    dateTime.props().onMinuteChange(moment(currentDateTime).minutes());

    const textField = wrapper.find(VcTextField).at(0);
    textField.props().onChange('newText');

    expect(mockFunc.mock.calls.length).toBe(0);

    const submit = wrapper.find(VcButton).at(1);
    submit.props().onClick();
  });
});
