import { cloneableGenerator } from '@redux-saga/testing-utils';
import { call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { postData } from '../../../../js/api';
import {
  visitAttributeSchema,
  visitSchema,
} from '../../../../js/state/representations';
import { updateEntitiesDataAction } from '../../../../js/state/entities/actions';
import {
  saveVisitAction,
  saveVisitFailAction,
  saveVisitSuccessAction,
  saveVisitAttributeAction,
  saveVisitAttributeFailAction,
  saveVisitAttributeSuccessAction,
} from '../../../../js/state/ui/visit/actions';
import {
  getSaveVisitUrl,
  saveVisit,
  getVisitAttributeUrl,
  saveVisitAttribute,
} from '../../../../js/state/ui/visit/sagas';

describe('save visit saga', () => {
  test('missing required argument', () => {
    const action = saveVisitAction('test', undefined);
    const generator = cloneableGenerator(saveVisit)(action);
    const clone = generator.clone();
    expect(clone.next().value).toEqual(
      put(saveVisitFailAction(undefined, 'Visit is required'))
    );
  });
  test('save visit success', () => {
    const newVisit = {
      concept: 'test',
      value: '123',
    };
    const action = saveVisitAction('test', newVisit);

    const generator = cloneableGenerator(saveVisit)(action);
    const clone = generator.clone();
    const expected = call(postData, getSaveVisitUrl(action), newVisit);
    expect(clone.next().value).toEqual(expected);
    const visit = {
      uuid: '123',
      concept: 'test',
      value: '123',
    };
    const normalized = normalize(visit, visitSchema);
    expect(clone.next(visit).value).toEqual(
      put(updateEntitiesDataAction(normalized))
    );
    expect(clone.next(visit).value).toEqual(
      put(saveVisitSuccessAction(visit.uuid, visit))
    );
    expect(clone.next().done).toEqual(true);
  });

  test('save visit failure', () => {
    const newVisit = {
      concept: 'test',
      value: '123',
    };
    let action = saveVisitAction('test', newVisit);
    let generator = cloneableGenerator(saveVisit)(action);
    let clone = generator.clone();
    clone.next();
    expect(clone.throw(new Error('fetch visit failed')).value).toEqual(
      put(saveVisitFailAction(undefined, 'fetch visit failed'))
    );

    action = saveVisitAction('test', newVisit);
    generator = cloneableGenerator(saveVisit)(action);
    clone = generator.clone();
    clone.next();
    const error = { statusCode: 500, message: 'server error occurred' };
    expect(
      clone.throw({
        error,
      }).value
    ).toEqual(put(saveVisitFailAction(undefined, error)));

    const existingVisit = {
      uuid: '123',
      concept: 'test',
      value: '123',
    };
    action = saveVisitAction('test', existingVisit);
    generator = cloneableGenerator(saveVisit)(action);
    clone = generator.clone();
    clone.next();
    expect(clone.throw(new Error('save visit failed')).value).toEqual(
      put(saveVisitFailAction(existingVisit.uuid, 'save visit failed'))
    );
  });
});

describe('Visit attribute', () => {
  test('missing required argument', () => {
    const action = saveVisitAttributeAction('test', undefined);
    const generator = cloneableGenerator(saveVisitAttribute)(action);
    const clone = generator.clone();
    expect(clone.next().value).toEqual(
      put(
        saveVisitAttributeFailAction(undefined, 'Visit Attribute is required')
      )
    );
  });
  test('save visit attribute success', () => {
    const newVisitAttribute = {
      value: '123',
      attributeType: 'uuid',
    };
    const action = saveVisitAttributeAction(
      'test',
      newVisitAttribute,
      'visitUuid'
    );

    const generator = cloneableGenerator(saveVisitAttribute)(action);
    const clone = generator.clone();
    const expected = call(
      postData,
      getVisitAttributeUrl(action),
      newVisitAttribute
    );
    expect(clone.next().value).toEqual(expected);

    const visitAttribute = {
      uuid: '123',
      value: '123',
      attributeType: 'uuid',
    };
    const normalized = normalize({ ...visitAttribute }, visitAttributeSchema);
    expect(clone.next(visitAttribute).value).toEqual(
      put(updateEntitiesDataAction(normalized))
    );
    expect(clone.next(visitAttribute).value).toEqual(
      put(saveVisitAttributeSuccessAction(visitAttribute.uuid, visitAttribute))
    );
    expect(clone.next().done).toEqual(true);
  });

  test('save visit attribute with encounter success', () => {
    const newVisitAttribute = {
      uuid: '123',
      value: '123',
      attributeType: 'uuid',
    };
    const action = saveVisitAttributeAction(
      'test',
      newVisitAttribute,
      'visitUuid'
    );

    const generator = cloneableGenerator(saveVisitAttribute)(action);
    const clone = generator.clone();
    const expected = call(
      postData,
      getVisitAttributeUrl(action),
      newVisitAttribute
    );
    expect(clone.next().value).toEqual(expected);
    const visitAttribute = {
      uuid: '123',
      value: '123',
      attributeType: 'uuid',
    };

    const normalized = normalize({ ...visitAttribute }, visitAttributeSchema);
    expect(clone.next(visitAttribute).value).toEqual(
      put(updateEntitiesDataAction(normalized))
    );
    expect(clone.next(visitAttribute).value).toEqual(
      put(saveVisitAttributeSuccessAction(visitAttribute.uuid, visitAttribute))
    );
    expect(clone.next().done).toEqual(true);
  });

  test('save visit attribute failure', () => {
    const newVisitAttribute = {
      value: '123',
      attributeType: 'uuid',
    };
    let action = saveVisitAttributeAction('test', newVisitAttribute, '123');
    let generator = cloneableGenerator(saveVisitAttribute)(action);
    let clone = generator.clone();
    clone.next();
    expect(
      clone.throw(new Error('fetch visit attribute failed')).value
    ).toEqual(
      put(
        saveVisitAttributeFailAction(undefined, 'fetch visit attribute failed')
      )
    );

    action = saveVisitAttributeAction('test', newVisitAttribute);
    generator = cloneableGenerator(saveVisitAttribute)(action);
    clone = generator.clone();
    clone.next();
    const error = { statusCode: 500, message: 'server error occurred' };
    expect(
      clone.throw({
        error,
      }).value
    ).toEqual(put(saveVisitAttributeFailAction(undefined, error)));

    const existingVisitAttribute = {
      uuid: '123',
      concept: 'test',
      value: '123',
    };
    action = saveVisitAttributeAction('test', existingVisitAttribute);
    generator = cloneableGenerator(saveVisitAttribute)(action);
    clone = generator.clone();
    clone.next();
    expect(clone.throw(new Error('save visit attribute failed')).value).toEqual(
      put(
        saveVisitAttributeFailAction(
          existingVisitAttribute.uuid,
          'save visit attribute failed'
        )
      )
    );
  });
});
