import { put, call } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { normalize } from 'normalizr';
import { getData } from '../../../../js/api';
import {
  fetchFormResourceFailAction,
  fetchFormResourceSuccessAction,
  fetchFormResourceAction,
} from '../../../../js/state/ui/formResource/actions';
import {
  getFormResourceUrl,
  fetchFormResource,
} from '../../../../js/state/ui/formResource/sagas';
import {
  FORM_RESOURCE,
  formResourceSchema,
} from '../../../../js/state/representations';
import { updateEntitiesDataAction } from '../../../../js/state/entities/actions';

describe('formResource sagas', () => {
  describe('fetch formResource saga', () => {
    test('fetchFormResource ', () => {
      const action = fetchFormResourceAction('test', undefined);
      const generator = cloneableGenerator(fetchFormResource)(action);
      const clone = generator.clone();
      expect(clone.next().value).toEqual(
        put(
          fetchFormResourceFailAction(
            undefined,
            'FormResource uuid is required'
          )
        )
      );
      expect(clone.next().done).toEqual(true);
    });
  });
  describe('fetch formResource saga', () => {
    test('fetch formResource success', () => {
      const action = fetchFormResourceAction('test', '123');

      const generator = cloneableGenerator(fetchFormResource)(action);
      const clone = generator.clone();
      const expected = call(getData, getFormResourceUrl(action));
      expect(clone.next().value).toEqual(expected);
      const formResource = {
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
        selectedFormResource: '1',
      };
      // const normalized = normalize({ ...formResource.formResourceData.results[0] }, formResourceSchema);
      // expect(clone.next(formResource).value).toEqual(
      //   put(updateEntitiesDataAction(normalized))
      // );
      // expect(clone.next(formResource).value).toEqual(
      //   put(fetchFormResourceSuccessAction('123', formResource))
      // );
      // expect(clone.next().done).toEqual(true);
    });
  });
});
