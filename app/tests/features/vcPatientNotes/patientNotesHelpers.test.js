import {
  createObservation,
  createVoidedObservation,
  createNotesObservation,
  createVoidedNotesObservation,
  createPatientNotesEncounter,
} from '../../../js/features/VcPatientNotes/patientNotesHelpers';
import { encounterType } from '../../../js/uuid';

describe('Visit Note helpers', () => {
  it('should create visit note observation', () => {
    const visitNoteObs = createObservation('12', '123', '1234', '12345');
    expect(visitNoteObs.value).toEqual('12');
    expect(visitNoteObs.encounter.uuid).toEqual('1234');
    expect(visitNoteObs.person.uuid).toEqual('12345');
    expect(visitNoteObs.concept.uuid).toEqual('123');
  });

  it('should void observation', () => {
    const voidedObs = createVoidedObservation(
      '1',
      '12',
      '123',
      '1234',
      '12345',
      '123456'
    );
    expect(voidedObs.value).toEqual('1');
    expect(voidedObs.encounter.uuid).toEqual('123');
    expect(voidedObs.person.uuid).toEqual('1234');
    expect(voidedObs.concept.uuid).toEqual('12');
    expect(voidedObs.obsDatetime).toEqual('12345');
    expect(voidedObs.uuid).toEqual('123456');
    expect(voidedObs.voided).toEqual(true);
  });

  it('should create visit note observation with group members', () => {
    const visitNoteObs = createNotesObservation('12', '123', '1234', '12345');
    expect(visitNoteObs.groupMembers).toEqual('12');
    expect(visitNoteObs.encounter.uuid).toEqual('1234');
    expect(visitNoteObs.person.uuid).toEqual('12345');
    expect(visitNoteObs.concept.uuid).toEqual('123');
  });

  it('should void visit note observation', () => {
    const voidedObs = createVoidedNotesObservation(
      '1',
      '12',
      '123',
      '1234',
      '12345',
      '123456'
    );
    expect(voidedObs.groupMembers).toEqual('1');
    expect(voidedObs.encounter.uuid).toEqual('123');
    expect(voidedObs.person.uuid).toEqual('1234');
    expect(voidedObs.concept.uuid).toEqual('12');
    expect(voidedObs.obsDatetime).toEqual('12345');
    expect(voidedObs.uuid).toEqual('123456');
    expect(voidedObs.voided).toEqual(true);
  });

  it('should create visit note encounter', () => {
    const voidedObs = createPatientNotesEncounter(
      {
        encounterUuid: '1',
        patientUuid: '12',
        visitUuid: '123',
      },
      '1234'
    );
    expect(voidedObs.uuid).toEqual('1');
    expect(voidedObs.patient).toEqual('12');
    expect(voidedObs.visit).toEqual('123');
    expect(voidedObs.obs).toEqual(['1234']);
    expect(voidedObs.encounterType).toEqual(
      encounterType.VISIT_NOTES_ENCOUNTER_TYPE_UUID
    );
  });
});
