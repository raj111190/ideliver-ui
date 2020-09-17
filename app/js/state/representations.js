import { schema } from 'normalizr';

export const ENCOUNTER_TYPE_REP = '(uuid,display)';
export const encounterTypeSchema = new schema.Entity(
  'encounterTypes',
  {},
  { idAttribute: 'uuid' }
);

export const VISIT_TYPE_REP = '(uuid,display)';
export const visitTypeSchema = new schema.Entity(
  'visitTypes',
  {},
  { idAttribute: 'uuid' }
);

export const IDENTIFIER_TYPE_REP = '(uuid,display)';
export const identifierTypeSchema = new schema.Entity(
  'identifierTypes',
  {},
  { idAttribute: 'uuid' }
);

export const IDENTIFIER_REP = `(uuid,display,identifier,preferred,voided,identifierType:${IDENTIFIER_TYPE_REP})`;
export const identifierSchema = new schema.Entity(
  'identifierTypes',
  {
    identifierType: identifierTypeSchema,
  },
  { idAttribute: 'uuid' }
);

export const ATTRIBUTE_TYPE_REP = '(uuid,display)';
const attributeTypeSchema = new schema.Entity(
  'attributeType',
  {},
  { idAttribute: 'uuid' }
);

export const ATTRIBUTE_REP = `(uuid,display,value,attributeType:${ATTRIBUTE_TYPE_REP},voided)`;

export const PERSON_REP = `(uuid,display,gender,age,birthdate,preferredName,preferredAddress,attributes:${ATTRIBUTE_REP},voided)`;
export const personSchema = new schema.Entity(
  'persons',
  {
    attributes: [
      {
        attributeType: attributeTypeSchema,
      },
    ],
  },
  { idAttribute: 'uuid' }
);

export const PATIENT_REP = `(uuid,display,identifiers:${IDENTIFIER_REP},person:${PERSON_REP},voided)`;
export const patientSchema = new schema.Entity(
  'patients',
  {
    identifier: [identifierSchema],
    person: personSchema,
  },
  { idAttribute: 'uuid' }
);

export const CONCEPT_DATA_TYPE_REP = '(uuid,display)';
export const conceptDataTypeSchema = new schema.Entity(
  'conceptDataTypes',
  {},
  { idAttribute: 'uuid' }
);
export const CONCEPT_CLASS_REP = '(uuid,display)';
export const conceptDataClassSchema = new schema.Entity(
  'conceptDataClasses',
  {},
  { idAttribute: 'uuid' }
);
export const CONCEPT_REP_1 = `(uuid,display,description:(uuid,display),datatype:${CONCEPT_DATA_TYPE_REP},conceptClass:${CONCEPT_CLASS_REP},attributes:${ATTRIBUTE_REP},set`;
export const CONCEPT_REP = `${CONCEPT_REP_1},answers:${CONCEPT_REP_1}),setMembers:${CONCEPT_REP_1},answers:${CONCEPT_REP_1})))`;
export const conceptSchema = new schema.Entity(
  'concepts',
  {
    datatype: conceptDataTypeSchema,
    conceptClass: conceptDataClassSchema,
    attributes: [
      {
        attributeType: attributeTypeSchema,
      },
    ],
  },
  { idAttribute: 'uuid' }
);

conceptSchema.define({ setMembers: [conceptSchema], answers: [conceptSchema] });

// group members obs are self referencing to obs.
// Diagnosis uses group members. Fortunately, it's only one level deep
// so we just hard code it here.
const OBS_REP_1 = `(uuid,display,comment,voided,obsDatetime,concept:${CONCEPT_REP},value:full`;
export const OBS_REP = `${OBS_REP_1},groupMembers:${OBS_REP_1}))`;
export const obsSchema = new schema.Entity(
  'observations',
  {
    concept: conceptSchema,
  },
  {
    idAttribute: 'uuid',
    processStrategy: (value, parent, key) => {
      if (key === 'obs') {
        return { ...value, encounter: parent.uuid };
      } else if (key === 'groupMembers') {
        return { ...value, encounter: parent.encounter };
      }
      return { ...value };
    },
  }
);
// group members are self referencing, so we need to define it here
obsSchema.define({ groupMembers: [obsSchema] });

export const visitAttributeSchema = new schema.Entity(
  'visitAttributes',
  {
    attributeType: attributeTypeSchema,
  },
  { idAttribute: 'uuid' }
);

const LOCATION_REP = `(uuid,display)`;
export const VISIT_REP = `(uuid,display,voided,startDatetime,stopDatetime,location:${LOCATION_REP},visitType:${VISIT_TYPE_REP},indication:${CONCEPT_REP},attributes:${ATTRIBUTE_REP})`;
export const visitSchema = new schema.Entity(
  'visits',
  {
    visitType: visitTypeSchema,
    indication: conceptSchema,
    attributes: [visitAttributeSchema],
  },
  {
    idAttribute: 'uuid',
    mergeStrategy: (entityA, entityB) => {
      return {
        ...entityA,
        ...entityB,
        encounters: [
          ...(entityA.encounters || []),
          ...(entityB.encounters || []),
        ],
      };
    },
    processStrategy: (value, parent, key) => {
      if (key === 'visit') {
        return { ...value, encounters: [parent.uuid] };
      }
      return { ...value };
    },
  }
);

export const ENCOUNTER_REP = `(uuid,display,encounterDatetime,auditInfo,encounterType:${ENCOUNTER_TYPE_REP},patient:${PATIENT_REP},visit:${VISIT_REP},obs:${OBS_REP},form:(uuid),voided)`;
export const encounterSchema = new schema.Entity(
  'encounters',
  {
    encounterType: encounterTypeSchema,
    patient: patientSchema,
    visit: visitSchema,
    obs: [obsSchema],
  },
  { idAttribute: 'uuid' }
);

export const encountersSchema = [encounterSchema];

export const WORKFLOW_STATE = `(uuid,concept:${CONCEPT_REP})`;
export const workflowSchema = new schema.Entity(
  'workflowStates',
  {
    concept: conceptSchema,
  },
  { idAttribute: 'uuid' }
);

export const PROGRAM_WORKFLOW_REP = `(uuid,concept:${CONCEPT_REP},states:${WORKFLOW_STATE})`;
export const programWorkflowSchema = new schema.Entity(
  'programWorkflows',
  {
    concept: conceptSchema,
    states: [workflowSchema],
  },
  { idAttribute: 'uuid' }
);

export const PROGRAM_REP = `(uuid,name,description,concept:${CONCEPT_REP},outcomesConcept:${CONCEPT_REP},allWorkflows:${PROGRAM_WORKFLOW_REP})`;
export const programSchema = new schema.Entity(
  'programs',
  {
    concept: conceptSchema,
    outcomesConcept: conceptSchema,
    allWorkflows: [programWorkflowSchema],
  },
  { idAttribute: 'uuid' }
);

export const PATIENT_STATE = `(uuid,state:${WORKFLOW_STATE},startDate,endDate)`;
export const programStateSchema = new schema.Entity(
  'programStates',
  {
    state: workflowSchema,
  },
  { idAttribute: 'uuid' }
);

export const PROGRAM_ENROLLMENT_REP = `(uuid,dateEnrolled,dateCompleted,patient:${PATIENT_REP},program:${PROGRAM_REP},states:${PATIENT_STATE})`;
export const programEnrollmentSchema = new schema.Entity(
  'programEnrollments',
  {
    patient: patientSchema,
    program: programSchema,
    states: [programStateSchema],
  },
  { idAttribute: 'uuid' }
);

export const EPISODE_REP = `(uuid,encounters:${ENCOUNTER_REP},patientPrograms:${PROGRAM_ENROLLMENT_REP})`;
export const episodeSchema = new schema.Entity(
  'episodes',
  {
    encounters: [encounterSchema],
    patientPrograms: [programEnrollmentSchema],
  },
  { idAttribute: 'uuid' }
);

export const episodesSchema = [episodeSchema];

export const FIELD_TYPE_REP = `(uuid,display)`;
export const fieldTypeSchema = new schema.Entity(
  'fieldTypes',
  {},
  { idAttribute: 'uuid' }
);

export const FIELD_REP = `(uuid,name,description,fieldType:${FIELD_TYPE_REP},concept:${CONCEPT_REP},tableName,attributeName,defaultValue,selectMultiple)`;
export const fieldSchema = new schema.Entity(
  'fields',
  {
    fieldType: fieldTypeSchema,
    concept: conceptSchema,
  },
  { idAttribute: 'uuid' }
);

export const FORM_FIELD_REP = `(uuid,description,parent:(uuid),field:${FIELD_REP},fieldNumber,pageNumber)`;
export const formFieldSchema = new schema.Entity(
  'formFields',
  {
    field: fieldSchema,
  },
  { idAttribute: 'uuid' }
);

export const FORM_REP = `(uuid,name,description,retired,encounterType:${ENCOUNTER_TYPE_REP},formFields:${FORM_FIELD_REP})`;
export const formSchema = new schema.Entity(
  'forms',
  {
    encounterType: encounterTypeSchema,
    formFields: [formFieldSchema],
  },
  { idAttribute: 'uuid' }
);

export const FORM_RESOURCE = `(uuid,name,valueReference,formUuid,retired)`;
export const formResourceSchema = new schema.Entity(
  'formsResource',
  { formsResource: formResourceSchema },
  { idAttribute: 'uuid' }
);
