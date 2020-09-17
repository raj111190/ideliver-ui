import 'regenerator-runtime/runtime';
import React from 'react';
import { FormattedDate } from 'react-intl';
import { call, put } from 'redux-saga/effects';
import fetchVisitsSuccessAction from '../actions/fetchVisitsSuccessAction';
import fetchVisitsFailAction from '../actions/fetchVisitsFailAction';
import { getData } from '../../../api';
import VcAcuity from '../../../components/vcAcuity/vcAcuity';
import VcDiagnosisDisplay from '../../../components/vcDiagnosisDisplay/vcDiagnosisDisplay';
import {
  encounterType,
  conceptClass,
  visitAttributeType,
  concept,
  attributeType,
} from '../../../uuid';
import moment from 'moment';

export const getAcuityEncounter = encounters =>
  encounters.find(
    encounter =>
      encounter.encounterType.uuid === encounterType.ACUITY_ENCOUNTER_TYPE_UUID
  );

export const getObEncounter = encounters =>
  encounters.find(
    encounter =>
      encounter.encounterType.uuid ===
      encounterType.OB_HISTORY_ENCOUNTER_TYPE_UUID
  );

export const getDiagnosisEncounter = encounters =>
  encounters.find(
    encounter =>
      encounter.encounterType.uuid ===
      encounterType.DIAGNOSIS_ENCOUNTER_TYPE_UUID
  );

export const getAcuityValue = acuityEncounter => {
  if (
    !acuityEncounter ||
    !acuityEncounter.obs ||
    acuityEncounter.obs.length === 0
  ) {
    return null;
  }
  const acuityObs = acuityEncounter.obs[0];
  const acuityDisplay = acuityObs.value.display;
  // acuity is stored as L1,L2,... Instead of numbers
  // We convert that to a number. L1 => 1, L2 => 2,...
  return parseInt(acuityDisplay.slice(-1), 10);
};

export const getLmpValue = obEncounter => {
  if (!obEncounter || !obEncounter.obs || obEncounter.obs.length === 0) {
    return null;
  }
  const lmpValue = obEncounter.obs.find(
    obs => obs.concept.uuid === concept.LMP_DATE
  );
  if (!lmpValue) {
    return undefined;
  }
  const lmpDisplay = lmpValue.value;

  const longDatetimeFormatWithT = 'YYYY-MM-DD[T]HH:mm:ss.SSSZZ';

  const edd = moment(lmpDisplay, longDatetimeFormatWithT, true).isValid()
    ? moment(lmpDisplay)
        .add(280, 'days')
        .format('LL')
    : null;

  return edd;
};

/**
 * Gets confirmed diagnoses for a given patient.
 * @param diagnoses Array a list of the 3 group members that represent a diagnosis
 * @returns A list of the confirmed diagnoses display names
 */
export const getConfirmedDiagnoses = diagnoses => {
  const confirmedDiagnoses = [];
  diagnoses.forEach(diagnosis => {
    const { groupMembers } = diagnosis;
    const certaintyGM =
      groupMembers &&
      groupMembers.find(
        member => member.concept.uuid === conceptClass.DIAGNOSIS_CERTAINTY_UUID
      );
    if (
      certaintyGM &&
      certaintyGM.value.uuid === conceptClass.CONFIRMED_DIAGNOSIS_UUID
    ) {
      const problemListGM = groupMembers.find(
        member =>
          member.concept.uuid === conceptClass.DIAGNOSIS_PROBLEM_LIST_UUID
      );
      confirmedDiagnoses.push(problemListGM.value.display);
    }
  });
  return confirmedDiagnoses;
};

export const getPatientStatus = visitAttributes => {
  if (!visitAttributes || !visitAttributes.length) return null;
  return visitAttributes.find(
    attribute =>
      attribute &&
      attribute.attributeType &&
      attribute.attributeType.uuid === visitAttributeType.PATIENT_STATUS
  );
};
export const getVisitStatus = encounters => {
  if (
    encounters.find(encounter => {
      return (
        encounter.encounterType.uuid ===
          encounterType.PNC_ENCOUNTER_TYPE_UUID ||
        encounter.encounterType.uuid ===
          encounterType.DISCHARGE_ENCOUNTER_TYPE_UUID
      );
    })
  )
    return 'PNC';

  if (
    encounters.find(
      encounter =>
        encounter.encounterType.uuid ===
          encounterType.LABOR_SIGNS_ENCOUNTER_TYPE_UUID ||
        encounter.encounterType.uuid ===
          encounterType.FETUS_ASSESSMENT_ENCOUNTER_TYPE_UUID ||
        encounter.encounterType.uuid ===
          encounterType.GENERAL_ASSESSMENT_ENCOUNTER_TYPE_UUID ||
        encounter.encounterType.uuid ===
          encounterType.ACTIVE_LABOR_ENCOUNTER_TYPE_UUID ||
        encounter.encounterType.uuid ===
          encounterType.LABOUR_SUMMARY_ENCOUNTER_TYPE_UUID
    )
  )
    return 'Labor';

  if (
    encounters.find(
      encounter =>
        encounter.encounterType.uuid ===
          encounterType.ANC_ENCOUNTER_TYPE_UUID ||
        encounter.encounterType.uuid ===
          encounterType.ANC_SUMMARY_ENCOUNTER_TYPE_UUID
    )
  )
    return 'ANC';

  return 'Intake';
};

export const getUrlQuery = action => {
  const { url } = action;
  const {
    pageSize,
    pageIndex,
    searchText,
    sortKey,
    sortOrder,
    filters,
  } = action.options;

  const filterQueryArr = Object.keys(filters).map(key => {
    const indexes = filters[key].selected;
    // we need to add L to acuity as the backend expects L1,L2,... instead of 1,2,..
    // Maybe we should store this as 1,2,3,.. instead
    const labels = indexes.map(index =>
      key === 'acuity'
        ? `L${filters[key].labels[index]}`
        : `${filters[key].labels[index]}`
    );
    return `&${key}=${labels.join(',')}`;
  });
  const filterQuery = filterQueryArr.join('');
  const startIndex = pageIndex * pageSize;
  return `${url}ideliver/visit/?includeInactive=false&totalCount=true&startIndex=${startIndex}&limit=${pageSize}&filterKeys=givenName,familyName,mrn&filterValue=${searchText}${filterQuery}&sortKey=${sortKey}&sortOrder=${sortOrder}&gender=F&v=custom:(uuid,startDatetime,patient:(uuid,patientIdentifier:(identifier),person:(uuid,attributes,personName:(givenName,familyName))),encounters:(uuid,encounterType:(uuid,display),obs:(uuid,concept:(uuid,display),groupMembers:(concept:(uuid),value:(uuid,display)),value:(uuid,display))),attributes:(uuid,display,value,attributeType:(uuid,name)))`;
};

// worker Saga: will be fired on FETCH_VISITS_ACTION actions
export default function* fetchVisits(action) {
  const urlQuery = getUrlQuery(action);
  try {
    const visitsTotal = yield call(getData, urlQuery);
    for (let i = 0; i < visitsTotal.results.length; i++) {
      const visit = visitsTotal.results[i];
      const { patient, encounters, attributes: visitAttributes } = visit;
      let newStatus;
      patient.person.attributes.map((attribute, key) => {
        if (attribute.attributeType.uuid === attributeType.PERSON_STATUS_UUID) {
          newStatus = attribute.value;
        }
      });

      const acuityEncounter = getAcuityEncounter(encounters);
      const obEncounter = getObEncounter(encounters);
      const acuityValue = getAcuityValue(acuityEncounter);
      const lmpValue = getLmpValue(obEncounter);

      const diagnosisEncounter = getDiagnosisEncounter(encounters);
      let confirmedDiagnoses = [];
      if (diagnosisEncounter) {
        confirmedDiagnoses = getConfirmedDiagnoses(diagnosisEncounter.obs);
      }
      const visitStatus = getVisitStatus(encounters);

      visitsTotal.results[i] = {
        id: visit.uuid,
        patient: patient.uuid,
        mrn: patient.patientIdentifier.identifier,
        givenName: patient.person.personName.givenName,
        familyName: patient.person.personName.familyName,
        status: newStatus || null,
        startDatetime: (
          <FormattedDate
            value={visit.startDatetime}
            month="long"
            day="2-digit"
            hour="2-digit"
            minute="2-digit"
            second="2-digit"
          />
        ),
        acuity: <VcAcuity value={acuityValue} />,
        diagnosis: <VcDiagnosisDisplay value={confirmedDiagnoses} />,
        edd: lmpValue || null,
      };
    }
    yield put(fetchVisitsSuccessAction(visitsTotal));
  } catch (e) {
    yield put(fetchVisitsFailAction(e.message));
  }
}
