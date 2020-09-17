import { fromJS, List } from 'immutable';
import { normalize } from 'normalizr';
import {
  getSelectedFormResourceUuid,
  getSelectedFormResourceIndex,
  getAllFormResourceData,
  getSelectedFormResourcePath,
  getSelectedFormResourceData,
  getSelectedResourceForm,
} from '../../../../js/state/ui/formResource/selectors';
import { getForms } from '../../../../js/state/entities/selectors';

describe('formResource selector', () => {
  const state = {
    ui: {
      formResource: fromJS({
        fetching: false,
        requiredFormFields: {},
        formResourceData: {
          results: [
            {
              uuid: 'de5affcd-8881-47ea-8fce-8f0d68696cbf',
              name: 'Demographics',
              valueReference: '{"saveButtons":[{"save":{"label":"Save"}}]}',
              display: 'Demographics',
              resourceVersion: '1.9',
              links: [
                {
                  rel: 'value',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/form/71a643f5-63e1-439f-a8a6-cb4f2bced721/resource/de5affcd-8881-47ea-8fce-8f0d68696cbf?v=full',
                },
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/form/71a643f5-63e1-439f-a8a6-cb4f2bced721/resource/de5affcd-8881-47ea-8fce-8f0d68696cbf?v=full',
                },
                {
                  rel: 'full',
                  uri:
                    'http://localhost:8080/openmrs/ws/rest/v1/form/71a643f5-63e1-439f-a8a6-cb4f2bced721/resource/de5affcd-8881-47ea-8fce-8f0d68696cbf?v=full',
                },
              ],
            },
          ],
        },
        selectedFormResource: '71a643f5-63e1-439f-a8a6-cb4f2bced721',
      }),
    },
  };
  it('getSelectedFormResourceUuid', () => {
    expect(getSelectedFormResourceUuid(state)).toEqual(
      '71a643f5-63e1-439f-a8a6-cb4f2bced721'
    );
  });
  it('getSelectedFormResourceIndex', () => {
    expect(getSelectedFormResourceIndex(state)).toEqual(undefined);
  });
  it('getAllFormResourceData', () => {
    expect(getAllFormResourceData(state)).toEqual(
      fromJS({
        results: fromJS([
          fromJS({
            uuid: 'de5affcd-8881-47ea-8fce-8f0d68696cbf',
            name: 'Demographics',
            valueReference: '{"saveButtons":[{"save":{"label":"Save"}}]}',
            display: 'Demographics',
            resourceVersion: '1.9',
            links: fromJS([
              fromJS({
                rel: 'value',
                uri:
                  'http://localhost:8080/openmrs/ws/rest/v1/form/71a643f5-63e1-439f-a8a6-cb4f2bced721/resource/de5affcd-8881-47ea-8fce-8f0d68696cbf?v=full',
              }),
              fromJS({
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrs/ws/rest/v1/form/71a643f5-63e1-439f-a8a6-cb4f2bced721/resource/de5affcd-8881-47ea-8fce-8f0d68696cbf?v=full',
              }),
              fromJS({
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrs/ws/rest/v1/form/71a643f5-63e1-439f-a8a6-cb4f2bced721/resource/de5affcd-8881-47ea-8fce-8f0d68696cbf?v=full',
              }),
            ]),
          }),
        ]),
      })
    );
  });
  it('getSelectedFormResourceData', () => {
    expect(getSelectedFormResourceData(state)).toEqual(
      fromJS({
        results: fromJS([
          fromJS({
            uuid: 'de5affcd-8881-47ea-8fce-8f0d68696cbf',
            name: 'Demographics',
            valueReference: '{"saveButtons":[{"save":{"label":"Save"}}]}',
            display: 'Demographics',
            resourceVersion: '1.9',
            links: fromJS([
              fromJS({
                rel: 'value',
                uri:
                  'http://localhost:8080/openmrs/ws/rest/v1/form/71a643f5-63e1-439f-a8a6-cb4f2bced721/resource/de5affcd-8881-47ea-8fce-8f0d68696cbf?v=full',
              }),
              fromJS({
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrs/ws/rest/v1/form/71a643f5-63e1-439f-a8a6-cb4f2bced721/resource/de5affcd-8881-47ea-8fce-8f0d68696cbf?v=full',
              }),
              fromJS({
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrs/ws/rest/v1/form/71a643f5-63e1-439f-a8a6-cb4f2bced721/resource/de5affcd-8881-47ea-8fce-8f0d68696cbf?v=full',
              }),
            ]),
          }),
        ]),
      })
    );
  });
});

// export const getSelectedFormResourceIndex = state =>
//   state.ui.formResource.get('selectedFormResourceIndex');

// export const getAllFormResourceData = state => state.ui.formResource.get('formResourceData');

// export const getSelectedFormResourcePath = createSelector(
//   [getSelectedFormResourceUuid, getSelectedFormResourceIndex],
//   (formResourceUuid, formResourceIndex) => {
//     if (!formResourceUuid) return [];
//     return formResourceIndex === undefined ? [formResourceUuid] : [formResourceUuid, formResourceIndex];
//   }
// );

// export const getSelectedFormResourceData = createSelector(
//   [getAllFormResourceData, getSelectedFormResourcePath],
//   (formResourceData, formResourcePath) => {
//     if (!formResourceData || !formResourcePath) return undefined;
//     return formResourceData;
//   }
// );

// export const getSelectedResourceForm = createSelector(
//   [getForms, getSelectedFormResourceUuid],
//   (forms, selectedFormResourceUuid) => {
//     if (!forms || !selectedFormResourceUuid) return undefined;
//     return formResource;
//   }
// );
