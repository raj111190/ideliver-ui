export const concept = {
  true: 'd57ee217-fabe-4577-bf8f-285fb6120e21',
  false: '9e43bcca-66e7-4ecb-b1b6-75d2d5cc271c',
  'd57ee217-fabe-4577-bf8f-285fb6120e21': true,
  '9e43bcca-66e7-4ecb-b1b6-75d2d5cc271c': false,
  DRUG_NAME: '200100DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
  DRUG_UNIT: '200101DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
  DRUG_DOSAGE: '200102DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
  LAB_DATE: '200105DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
  VISIT_SUMMARY: '200121DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
  FORM_METADATA: '200139DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
  LMP_DATE: 'f05edc5c-c9c1-4574-80b0-032e8e14ee02',
  NURSE_NOTES: 'b38736be-c8e4-4123-a019-324853467337',
  DOCTOR_NOTES: '36cfb426-a0a3-426d-a3d7-474cdd560ec7',
  NOTES: '200030DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
  CARDEX_TIME: '3b44f577-a574-4a49-9b67-37cc79e5b376',
  REFERRAL_NOTES: 'bffcc1a1-0136-4ab3-9cbc-2be064b3f1ed',
  REFERRAL_TIME: 'ed82f3bb-bb3c-4e38-b499-851859b7cde2',
  REASON_FOR_REFERRAL: '75e63a3e-9535-4204-bff7-6ce1f07cd472',
  REFERRAL_FACILITY: '0ab15df9-c284-4837-bab9-4e76d25d87b4',
  DISCHARGE_TIME: '59c05758-1eba-45d6-b240-a5d31baeea9a',
  DISCHARGE_NOTES: '200083DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
  CONCEPT: '8d5e7d7c-c2cc-11de-8d13-0010c6dffd0f',
  DATABASE_ELEMENT: '8d5e8196-c2cc-11de-8d13-0010c6dffd0f',
};

export const conceptDataType = {
  NA: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
};

export const field = {
  COVID_TEMPREATURE_SCREENING_UUID: 'dcf6c7a9-309a-4592-bba9-6dae4abaa5f6',
};

export const formField = {
  VISIT_SUMMARY_UUID: '200122DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
  FILE_NUMBER_UUID: '2cdcbfb0-0c35-489f-bdb2-53a3ac3dd6a8',
  ADDRESS_UUID: '1b80414c-3ef8-4548-b0d1-cd533d02e1e3',
  PHONE_UUID: '770e1eb5-e4d7-4749-8940-c17fde1b3ef7',
  EXISTING_CONDITIONS_UUID: '801ba59d-56a3-4c81-bd01-23daf6f23cc4',
  GI_EDUCATION_LEVEL_UUID: '63b79a7f-068f-4677-9185-13c44c5a5934',
  GI_BIRTH_COMPANION_NAME_UUID: 'eb569d3b-1441-46f2-9f31-2230f040bef1',
  OB_GRAVIDITY_UUID: 'ee038cc4-1a53-4738-8967-aaa000000058',
  OB_PRETERM_UUID: 'ee038cc4-1a53-4738-8967-aaa000000059',
  OB_LAST_MENSTRUAL_PERIOD_UUID: 'ee038cc4-1a53-4738-8967-aaa000000106',
  OB_GESTATIONAL_AGE_UUID: 'ee038cc4-1a53-4738-8967-aaa000000055',
  OB_TERM_UUID: 'ee038cc4-1a53-4738-8967-aaa000000060',
  OB_ABORTION_UUID: 'ee038cc4-1a53-4738-8967-aaa000000061',
  OB_LIVE_UUID: 'ee038cc4-1a53-4738-8967-aaa000000062',
  // These are the formField id from the Active Labour Form, NOT from other ones like Vitals
  AL_FETAL_HEART_RATE_UUID: 'ee038cc4-1a53-4738-8967-aaa000000088',
  AL_LIQUOR_UUID: 'ee038cc4-1a53-4738-8967-aaa000000089',
  AL_LIQUOR_COLOR_UUID: 'ee038cc4-1a53-4738-8967-aaa000000090',
  AL_MOULDING_UUID: 'ee038cc4-1a53-4738-8967-aaa000000091',
  AL_DEGREES_OF_MOULDING_UUID: 'ee038cc4-1a53-4738-8967-aaa000000092',
  AL_CERVIX_UUID: 'ee038cc4-1a53-4738-8967-aaa000000093',
  AL_DESCENT_UUID: 'ee038cc4-1a53-4738-8967-aaa000000094',
  AL_DESCENT_UNIT_UUID: 'ee038cc4-1a53-4738-8967-aaa111000094',
  AL_CONTRACTIONS_UUID: 'ee038cc4-1a53-4738-8967-aaa000000095',
  AL_CONTRACTIONS_STRENGTH_UUID: 'ee038cc4-1a53-4738-8967-aaa000000096',
  AL_INTERVENTIONS_UUID: 'ee038cc4-1a53-4738-8967-aaa000000104',
  AL_PULSE_UUID: 'ee038cc4-1a53-4738-8967-aaa000000097',
  AL_TEMPERATURE_UUID: 'ee038cc4-1a53-4738-8967-aaa000000100',
  AL_URINE_PROTEIN_UUID: 'ee038cc4-1a53-4738-8967-aaa000000101',
  AL_URINE_ACETONE_UUID: 'ee038cc4-1a53-4738-8967-aaa000000102',
  AL_URINE_VOLUME_UUID: 'ee038cc4-1a53-4738-8967-aaa000000103',
  AL_Systolic_Blood_Pressure_UUID: 'ee038cc4-1a53-4738-8967-aaa000000098',
  AL_Diastolic_Blood_Pressure_UUID: 'ee038cc4-1a53-4738-8967-aaa000000099',
  // These are the formField id need to populate in Post Delivery Form
  PD_DURATION_PREGNANCY_WEEKS_UUID: '4ce2c685-32d5-499b-b044-982c7e73fe3b',
  PD_BABY_WEIGHT_UUID: 'ee038cc4-1a53-4738-8967-aaa000000083',
  PD_MODE_OF_DELIVERY_UUID: 'ee038cc4-1a53-4738-8967-aaa000000067',
  PD_RESUSCITATION_UUID: 'cfa8f5ce-6dcc-4c27-b12f-994ac4e54f09',
  LS_BABY_WEIGHT_UUID: 'dd038cc4-1a53-4738-8967-aaa000000030',
  LS_RESUSCITATION_UUID: 'dd038cc4-1a53-4738-8967-aaa000000012',
  AS_MODE_OF_DELIVERY_UUID: '1352407e-398b-4d65-aade-438bcaecddd3',
  PNC_SCHEDULE_NEXT_APPOINTMENT: '967d1572-0df9-426e-92fe-2edc21490afb',
  COVID_FEVER_UUID: '4f9d181f-7dda-48a9-b58e-16e1d2069832',
};

export const form = {
  GENERAL_INFO_FORM_UUID: '71a643f5-63e1-439f-a8a6-cb4f2bced721',
  VITALS_FORM_UUID: 'a000cb34-9ec1-4344-a1c8-f692232f6edd',
  LAB_RESULTS_FORM_UUID: '200115DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
  MEDICAL_HISTORY_FORM_UUID: 'cabbcdd0-cb6d-4352-b2f1-20a7616ea8ca',
  OB_HISTORY_FORM_UUID: '138e073f-6c0d-4aa8-a91c-b5ec4f99715b',
  REFERRAL_FORM_UUID: 'cedc221c-0631-4fd1-8dbc-b430a9e69adf',
  FETUS_ASSESSMENT_FORM_UUID: 'daa73843-f6ae-4fed-bff7-39a2c080b691',
  LABOUR_SIGNS_FORM_UUID: '388a0891-3a1d-44aa-a8d9-67c5f4e26abc',
  COMPLAINTS_FORM_UUID: '7ae516ff-2f15-46e3-8ff2-8187c4ee7e3e',
  ADMISSION_FORM_UUID: 'd2c7532c-fb01-11e2-8ff2-fd54ab5fdb2a',
  DISCHARGE_FORM_UUID: 'b5f8ffd8-fbde-11e2-8ff2-fd54ab5fdb2a',
  ACTIVE_LABOUR_FORM_UUID: '5c448620-4d24-447c-abe6-4541023f3b7d',
  VISIT_SUMMARY_FORM_UUID: '2f9e4157-a6ef-461f-98ae-94df363c924d',
  LABOUR_SUMMARY_FORM_UUID: '200BADDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
  PNC_FORM_UUID: '23b2cab3-da98-4469-b7c9-3b2e77869e1b',
  ANC_SUMMARY_FORM_UUID: 'fef51055-2837-4470-8abd-5ee246040108',
  ANC_FORM_UUID: 'b444eb49-3c29-4d98-8dc6-a545810b5df7',
};

export const vitalsFormField = {
  VTL_ENCNTR_DATE_UUID: 'encounterDatetime',
  VTL_O2_UUID: 'ee038cc4-1a53-4738-8967-f8fedc8cdaa1',
  VTL_PULSE_UUID: '0c14bfb6-4782-4846-9b9b-476ef6f2a470',
  VTL_RESP_UUID: 'ff516a4c-3d9b-42e1-a2af-2d8f29b3a79c',
  VTL_TEMP_UUID: '9115c83c-a0a5-4708-bc73-e21f1e300d47',
  VTL_SYSTOLIC_UUID: 'c3459bc7-aa61-4c84-ac43-f861ab5e673c',
  VTL_DIASTOLIC_UUID: '2ccfdeb7-0d2c-4a83-941b-b4ca812608c8',
};

export const vitalsTableHeading = [
  {
    id: 'encounterDatetime',
    label: '',
  },
  {
    id: 'ee038cc4-1a53-4738-8967-f8fedc8cdaa1',
    label: 'O2',
  },
  {
    id: '0c14bfb6-4782-4846-9b9b-476ef6f2a470',
    label: 'Pulse',
  },
  {
    id: 'ff516a4c-3d9b-42e1-a2af-2d8f29b3a79c',
    label: 'Resp',
  },
  {
    id: '9115c83c-a0a5-4708-bc73-e21f1e300d47',
    label: 'Temp C',
  },
  {
    id: 'c3459bc7-aa61-4c84-ac43-f861ab5e673c',
    label: 'Systolic',
  },
  {
    id: '2ccfdeb7-0d2c-4a83-941b-b4ca812608c8',
    label: 'Diastolic',
  },
];
/**
 * Forms on which we want to collect multiple encounters
 * @type {Array}
 */
export const MULTIPLE_ENCOUNTER_FORMS = [
  form.ACTIVE_LABOUR_FORM_UUID,
  form.PNC_FORM_UUID,
  form.VITALS_FORM_UUID,
];

export const managementPlanForms = {
  PPH_FORM_UUID: '200135DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
};

export const allForms = { ...form, ...managementPlanForms };

export const diagToForm = {
  '230AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': managementPlanForms.PPH_FORM_UUID,
};

export const location = {
  INPATIENT_WARD: 'b1a8b05e-3542-4037-bbd3-998ee9c40574',
};
export const identifierType = {
  FILE_NUMBER_TYPE_UUID: 'efe0ed55-430c-4047-b2fb-2fe1a0b498b3',
};
export const attributeType = {
  PHONE_UUID: '14d4f066-15f5-102d-96e4-000c29c2a5d7',
  PERSON_STATUS_UUID: '204c7234-88fb-4bb0-ae97-df6fd52de05f',
};
export const visitAttributeType = {
  PATIENT_STATUS: '4402828d-2b88-48f6-ba25-1ba866aa11e2',
};
export const conceptAttributeType = {
  DIAGNOSIS_ACUITY_UUID: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
};
export const encounterType = {
  ACUITY_ENCOUNTER_TYPE_UUID: '92f48d4d-01f5-426d-a7e9-fae8047e257d',
  DIAGNOSIS_ENCOUNTER_TYPE_UUID: '698b3ab5-ff32-4120-a1fd-7375748ea3a1',
  VISIT_SUMMARY_ENCOUNTER_TYPE_UUID: '327ce294-9421-44d5-883a-c006ff250e95',
  OB_HISTORY_ENCOUNTER_TYPE_UUID: '9e846e8b-e685-484c-b999-fadc73bf9242',
  VISIT_NOTES_ENCOUNTER_TYPE_UUID: 'd7151f82-c1f3-4152-a605-2f9ea7414a79',
  REFERRAL_ENCOUNTER_TYPE_UUID: '1090407f-fc73-46c9-9311-2bd16b0d6742',
  DISCHARGE_ENCOUNTER_TYPE_UUID: '181820aa-88c9-479b-9077-af92f5364329',
  PPH_ENCOUNTER_TYPE_UUID: '200136DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
  PNC_ENCOUNTER_TYPE_UUID: '6f079c44-7aff-453e-8e69-92bbf83a84a3',
  ACTIVE_LABOR_ENCOUNTER_TYPE_UUID: 'db96b334-4362-489b-8c70-30fd6f393709',
  GENERAL_ASSESSMENT_ENCOUNTER_TYPE_UUID:
    '46f8f935-554d-4152-aceb-40660d4e3cc1',
  FETUS_ASSESSMENT_ENCOUNTER_TYPE_UUID: '6ffeeb00-0366-4f48-b3da-98f7b0c14b48',
  LABOR_SIGNS_ENCOUNTER_TYPE_UUID: '4b57fd49-05c5-4241-aad8-21f00876dce0',
  VITALS_ENCOUNTER_TYPE_UUID: '67a71486-1a54-468f-ac3e-7091a9a79584',
  ANC_SUMMARY_ENCOUNTER_TYPE_UUID: 'd4a1ae22-3f6e-4320-960f-0b8b6a4363a4',
  ANC_ENCOUNTER_TYPE_UUID: 'c5f0ab68-00a3-4de5-813e-5d09180f593c',
  LABOUR_SUMMARY_ENCOUNTER_TYPE_UUID: '200CBEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
};

export const userType = {
  ADMIN_USER_UUID: '1c3db49d-440a-11e6-a65c-00e04c680037',
};
export const conceptClass = {
  MULTI_SELECT_SET_UUID: 'e15d75da-272f-46d5-9314-be19bf92de9d',
  VISIT_DIAGNOSIS_CONCEPT_UUID: '159947AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  DIAGNOSIS_CERTAINTY_UUID: '159394AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  PRESUMED_DIAGNOSIS_UUID: '159393AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  CONFIRMED_DIAGNOSIS_UUID: '159392AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  RESOLVED_DIAGNOSIS_UUID: 'f2b20b71-f2a1-4e39-9e88-cb18ed44ff1b',
  DIAGNOSIS_PROBLEM_LIST_UUID: '1284AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  DIAGNOSIS_ORDER_CONCEPT_UUID: '159946AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  PRIMARY_DIAGNOSIS_VALUE_UUID: '159943AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  MISC: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
};
// Here until remove diagnoses included by reference application that we don't plan to use / or if decide those ones showing up is acceptable
export const validDiagnoses = [
  { uuid: '190001DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', display: 'Fetal Distress' },
  {
    uuid: '190002DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Antepartum Haemorrhage',
  },
  {
    uuid: '190015DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Severe Respiratory Distress',
  },
  { uuid: 'd05fb840-042d-49eb-b9a7-d6067f20e709', display: 'Transverse Lie' },
  {
    uuid: '190028DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Cardio-pulmonary disease',
  },
  { uuid: '190036DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', display: 'Asphyxia' },
  { uuid: '190037DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', display: 'LBW' },
  { uuid: '190038DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', display: 'Pre-maturity' },
  { uuid: '130AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', display: 'Puerperal sepsis' },
  { uuid: '190042DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', display: 'Eclampsia' },
  { uuid: '112989AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', display: 'Shock' },
  {
    uuid: '180039DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Obstructed labour',
  },
  {
    uuid: '190043DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Cephalo-pelvic disproportion',
  },
  { uuid: '190053DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', display: 'Malpositions' },
  {
    uuid: '190044DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Shoulder Dystocia',
  },
  {
    uuid: '190045DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Prolonged Expulsive Phase',
  },
  {
    uuid: '230AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    display: 'Postpartum Hemorrhage',
  },
  { uuid: '57da0d55-7549-46cd-8e2a-1321ade29595', display: 'Sepsis' },
  { uuid: '190003DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', display: 'Pre-term birth' },

  {
    uuid: '190011DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Severe Pre-Eclampsia',
  },

  {
    uuid: '1490AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    display: 'Physical trauma',
  },
  { uuid: '190022DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', display: 'Severe Anemia' },
  {
    uuid: '190024DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Suspected chorioamnionitis',
  },
  {
    uuid: '190039DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Birth with deformities',
  },
  {
    uuid: 'c5ad2f29-fb2d-42dc-a210-ce962dd167de',
    display: 'Severe Pregnancy Hypertension',
  },
  {
    uuid: '190047DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Prolonged active phase',
  },
  {
    uuid: 'eaf83dff-1081-43b1-9cf8-50e4a3dcc844',
    display: 'Pre-term Pre-mature Rupture of Membrane',
  },
  {
    uuid: '190016DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Mild Respiratory Distress',
  },

  { uuid: '190013DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', display: 'Pre-Eclampsia' },
  { uuid: '2e5c1066-c25a-4be1-87a0-7290de355dcc', display: 'Breech Delivery' },
  { uuid: '190025DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', display: 'GI Infection' },
  {
    uuid: '190026DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Small for Gestational Age',
  },
  { uuid: '190032DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', display: 'Diabetes' },
  { uuid: '779ebec8-6201-485f-84f6-24aad58e2989', display: 'Pyelonephritis' },
  {
    uuid: '4c38165f-ae70-4b3c-bebf-f85f60737194',
    display: 'Pregnancy Induced Hypertension',
  },
  {
    uuid: '190049DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Gestational Hypertension',
  },
  {
    uuid: '190051DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Prolonged latent phase',
  },
  { uuid: '190005DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', display: 'Fetal Death' },
  { uuid: '190021DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', display: 'Chronic Anemia' },
  {
    uuid: '190052DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Inadequate uterine activity',
  },
  {
    uuid: '190029DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Hepato-bilary disease',
  },
  { uuid: '190030DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', display: 'HIV' },
  { uuid: '190031DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', display: 'Tuberculosis' },
  {
    uuid: '190033DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Gastro-intestinal disease',
  },
  {
    uuid: '190034DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Musculo-skeletal disease',
  },
  {
    uuid: '5eaa2cf2-fd98-46bd-9c4d-703a1e652022',
    display: 'Urinary Track Infection',
  },
  {
    uuid: '140987AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    display: 'Essential Hypertension',
  },
  {
    uuid: '190050DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Chronic Hypertension',
  },
  { uuid: '190004DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', display: 'Prolonged Labor' },
  { uuid: '190006DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', display: 'Stunting' },
  { uuid: '190007DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', display: 'Wasting' },
  { uuid: '190008DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', display: 'Underweight' },
  { uuid: '190019DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', display: 'Active Labor' },
  { uuid: '190023DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', display: 'Erythrocytosis' },
  { uuid: '117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', display: 'Hypertension' },
  { uuid: '116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', display: 'Malaria' },
  { uuid: '03310ac3-58d5-45e5-bda0-002119376528', display: 'Fistula' },
];

export const programs = {
  PREGNANCY_PROGRAM: '19901BBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
};

export const SUPPORTED_OPERATORS = {
  EQUALS: 'EQUALS',
  NOT_EQUALS: 'NOT_EQUALS',
  GREATER: 'GREATER',
  GREATER_THAN: 'GREATER_THAN',
  LESS: 'LESS',
  LESS_THAN: 'LESS_THAN',
  IN: 'IN',
  NOT_IN: 'NOT_IN',
};

export const PATIENT_IDENTIFIERS_FIELD_TO_IDENTIFIER_TYPES = {
  [formField.FILE_NUMBER_UUID]: identifierType.FILE_NUMBER_TYPE_UUID,
};
export const PATIENT_ATTRIBUTES_FIELD_TO_ATTRIBUTE_TYPES = {
  [formField.PHONE_UUID]: attributeType.PHONE_UUID,
};
