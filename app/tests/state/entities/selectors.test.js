import { fromJS } from 'immutable';
import { normalize } from 'normalizr';
import { encounterType } from '../../../js/uuid';
import entitiesReducer, {
  defaultState,
} from '../../../js/state/entities/entitiesReducer';
import { updateEntitiesDataAction } from '../../../js/state/entities/actions';
import { episodesSchema, formSchema } from '../../../js/state/representations';
import {
  getEncounters,
  getEntities,
  getEpisodes,
  getObservations,
  getPatients,
  getVisits,
  getForms,
} from '../../../js/state/entities/selectors';

describe('entities selectors', () => {
  let state;
  let allEntities;
  beforeEach(() => {
    allEntities = [
      {
        uuid: 'ep123',
        encounters: [
          {
            uuid: '123',
            display: 'test 1',
            patient: { uuid: '123', display: 'patient 123' },
            encounterType: {
              uuid: encounterType.DIAGNOSIS_ENCOUNTER_TYPE_UUID,
              display: 'diagnosis encounter',
            },
            visit: {
              uuid: 'visit_123',
              startDatetime: 'currentDate',
              visitType: {
                uuid: 'uuidVisitType',
                display: 'ideliver visit type',
              },
            },
            obs: [
              { uuid: '456', display: 'obs1' },
              { uuid: '789', display: 'obs2' },
            ],
          },
          {
            uuid: '124',
            display: 'test 2',
            patient: { uuid: '123', display: 'patient 123' },
            encounterType: {
              uuid: encounterType.DIAGNOSIS_ENCOUNTER_TYPE_UUID,
              display: 'diagnosis encounter',
            },
            visit: {
              uuid: 'visit_123',
              startDatetime: 'currentDate',
              visitType: {
                uuid: 'uuidVisitType',
                display: 'ideliver visit type',
              },
            },
            obs: [
              { uuid: '556', display: 'obs1' },
              { uuid: '589', display: 'obs2' },
            ],
          },
        ],
        patientPrograms: [],
      },
    ];

    const entitiesState = entitiesReducer(
      fromJS(defaultState),
      updateEntitiesDataAction(normalize(allEntities, episodesSchema))
    );
    state = {
      entities: entitiesState,
    };
  });
  it('should select entities', () => {
    const entities = getEntities(state);
    expect(entities).toEqual(
      fromJS(normalize(allEntities, episodesSchema).entities)
    );
  });

  it('should select episodes', () => {
    const entities = getEpisodes(state);
    expect(entities).toEqual(
      fromJS(normalize(allEntities, episodesSchema).entities.episodes)
    );
  });

  it('should select encounters', () => {
    const observations = getEncounters(state);
    expect(observations).toEqual(
      fromJS(normalize(allEntities, episodesSchema).entities.encounters)
    );
  });

  it('should select observations', () => {
    const observations = getObservations(state);
    expect(observations).toEqual(
      fromJS(normalize(allEntities, episodesSchema).entities.observations)
    );
  });

  it('should select visits', () => {
    const observations = getVisits(state);
    expect(observations).toEqual(
      fromJS(normalize(allEntities, episodesSchema).entities.visits)
    );
  });

  it('should select patients', () => {
    const observations = getPatients(state);
    expect(observations).toEqual(
      fromJS(normalize(allEntities, episodesSchema).entities.patients)
    );
  });

  it('should select forms', () => {
    const formData = [
      { uuid: '123', name: 'form one' },
      { uuid: '124', name: 'form two' },
    ];
    const entitiesState = entitiesReducer(
      fromJS(defaultState),
      updateEntitiesDataAction(normalize(formData, [formSchema]))
    );
    state = {
      entities: entitiesState,
    };
    const forms = getForms(state);
    expect(forms).toEqual(
      fromJS(normalize(formData, [formSchema]).entities.forms)
    );
  });
});
