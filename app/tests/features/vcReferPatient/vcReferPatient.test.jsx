import React from 'react';
import { concept } from '../../../js/uuid';
import { mountWithIntl } from '../../enzyme-test-helpers';
import moment from 'moment-timezone';
import Button from '@material-ui/core/Button';
import {
  VcCardexWindow,
  VcCardexNotes,
  VcButton,
  VcTimeInput,
} from '@vecnacares/vc-ui';
import VcReferPatient from '../../../js/features/VcReferPatient/vcReferPatient';
import VcTextField from '../../../js/components/vcTextField/vcTextField';

describe('VcReferPatient', () => {
  let mockFunc;
  let wrapper;
  const currentDateTime = moment().toString();

  const patientNotes = [
    {
      concept: concept.REFERRAL_NOTES,
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
            uuid: concept.REFERRAL_TIME,
            display: 'Referral Time',
          },
          uuid: 'timeObs123',
          value: currentDateTime,
          obsDatetime: currentDateTime,
          voided: false,
          encounter: {
            uuid: 'encounter123',
          },
          display: `Referral Time: ${currentDateTime}`,
        },
      ],
    },
    {
      concept: concept.REFERRAL_NOTES,
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
            uuid: concept.REFERRAL_TIME,
            display: 'Referral Time',
          },
          uuid: 'timeObs1234',
          value: currentDateTime,
          obsDatetime: currentDateTime,
          voided: false,
          encounter: {
            uuid: 'encounter123',
          },
          display: `Referral Time: ${currentDateTime}`,
        },
      ],
    },
  ];

  beforeEach(() => {
    mockFunc = jest.fn();
    wrapper = mountWithIntl(
      <VcReferPatient
        onClose={mockFunc}
        onRefer={mockFunc}
        patientNotes={patientNotes}
        onSubmit={mockFunc}
      />
    );
  });

  it('should render', () => {
    expect(wrapper).toBeDefined();

    const dateTime = wrapper.find(VcTimeInput).at(0);
    dateTime.props().onHourChange(moment(currentDateTime).hours());
    dateTime.props().onMinuteChange(moment(currentDateTime).minutes());

    const textField = wrapper.find(VcTextField).at(0);
    textField.props().onChange('newText');

    const textField2 = wrapper.find(VcTextField).at(1);
    textField2.props().onChange('newText2');

    const submit = wrapper
      .find(VcCardexWindow)
      .at(0)
      .find(VcButton)
      .at(1);
    submit.props().onClick('value');

    expect(mockFunc.mock.calls.length).toBe(3);
  });
});
