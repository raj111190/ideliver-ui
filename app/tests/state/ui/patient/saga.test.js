import { cloneableGenerator } from '@redux-saga/testing-utils';
import { call, put } from 'redux-saga/effects';
import { postData } from '../../../../js/api';
import {
  savePatientAttributeAction,
  savePatientAttributeFailAction,
  savePatientAttributeSuccessAction,
  savePatientIdentifierAction,
  savePatientIdentifierFailAction,
  savePatientIdentifierSuccessAction,
  savePatientImageAction,
  savePatientImageFailAction,
  savePatientImageSuccessAction,
} from '../../../../js/state/ui/patient/actions';
import {
  getPatientAttributeUrl,
  getPatientIdentifierUrl,
  getPersonImageUrl,
  savePatientAttribute,
  savePatientIdentifier,
  savePatientImage,
} from '../../../../js/state/ui/patient/sagas';

describe('Patient sagas', () => {
  describe('Patient attribute', () => {
    test('missing required argument', () => {
      const action = savePatientAttributeAction('test', undefined);
      const generator = cloneableGenerator(savePatientAttribute)(action);
      const clone = generator.clone();
      expect(clone.next().value).toEqual(
        put(
          savePatientAttributeFailAction(
            undefined,
            'Patient Attribute is required'
          )
        )
      );
    });
    test('save patient attribute success', () => {
      const newPatientAttribute = {
        value: '123',
        attributeType: 'uuid',
      };
      const action = savePatientAttributeAction(
        'test',
        newPatientAttribute,
        'personUuid'
      );

      const generator = cloneableGenerator(savePatientAttribute)(action);
      const clone = generator.clone();
      const expected = call(
        postData,
        getPatientAttributeUrl(action),
        newPatientAttribute
      );
      expect(clone.next().value).toEqual(expected);

      const patientAttribute = {
        uuid: '123',
        value: '123',
        attributeType: 'uuid',
      };
      expect(clone.next(patientAttribute).value).toEqual(
        put(
          savePatientAttributeSuccessAction(
            patientAttribute.uuid,
            patientAttribute
          )
        )
      );
      expect(clone.next().done).toEqual(true);
    });

    test('save patient attribute with encounter success', () => {
      const newPatientAttribute = {
        uuid: '123',
        value: '123',
        attributeType: 'uuid',
      };
      const action = savePatientAttributeAction(
        'test',
        newPatientAttribute,
        'personUuid'
      );

      const generator = cloneableGenerator(savePatientAttribute)(action);
      const clone = generator.clone();
      const expected = call(
        postData,
        getPatientAttributeUrl(action),
        newPatientAttribute
      );
      expect(clone.next().value).toEqual(expected);
      const patientAttribute = {
        uuid: '123',
        value: '123',
        attributeType: 'uuid',
      };

      expect(clone.next(patientAttribute).value).toEqual(
        put(
          savePatientAttributeSuccessAction(
            patientAttribute.uuid,
            patientAttribute
          )
        )
      );
      expect(clone.next().done).toEqual(true);
    });

    test('save patient attribute failure', () => {
      const newPatientAttribute = {
        value: '123',
        attributeType: 'uuid',
      };
      let action = savePatientAttributeAction(
        'test',
        newPatientAttribute,
        '123'
      );
      let generator = cloneableGenerator(savePatientAttribute)(action);
      let clone = generator.clone();
      clone.next();
      expect(
        clone.throw(new Error('fetch patient attribute failed')).value
      ).toEqual(
        put(
          savePatientAttributeFailAction(
            undefined,
            'fetch patient attribute failed'
          )
        )
      );

      action = savePatientAttributeAction('test', newPatientAttribute);
      generator = cloneableGenerator(savePatientAttribute)(action);
      clone = generator.clone();
      clone.next();
      const error = { statusCode: 500, message: 'server error occurred' };
      expect(
        clone.throw({
          error,
        }).value
      ).toEqual(put(savePatientAttributeFailAction(undefined, error)));

      const existingPatientAttribute = {
        uuid: '123',
        concept: 'test',
        value: '123',
      };
      action = savePatientAttributeAction('test', existingPatientAttribute);
      generator = cloneableGenerator(savePatientAttribute)(action);
      clone = generator.clone();
      clone.next();
      expect(
        clone.throw(new Error('save patient attribute failed')).value
      ).toEqual(
        put(
          savePatientAttributeFailAction(
            existingPatientAttribute.uuid,
            'save patient attribute failed'
          )
        )
      );
    });
  });
  describe('Patient identifier', () => {
    test('missing required argument', () => {
      const action = savePatientIdentifierAction('test', undefined);
      const generator = cloneableGenerator(savePatientIdentifier)(action);
      const clone = generator.clone();
      expect(clone.next().value).toEqual(
        put(
          savePatientIdentifierFailAction(
            undefined,
            'Patient Identifier is required'
          )
        )
      );
    });
    test('save patient Identifier success', () => {
      const newPatientIdentifier = {
        value: '123',
        identifierType: 'uuid',
      };
      const action = savePatientIdentifierAction(
        'test',
        newPatientIdentifier,
        'personUuid'
      );

      const generator = cloneableGenerator(savePatientIdentifier)(action);
      const clone = generator.clone();
      const expected = call(
        postData,
        getPatientIdentifierUrl(action),
        newPatientIdentifier
      );
      expect(clone.next().value).toEqual(expected);

      const patientIdentifier = {
        uuid: '123',
        value: '123',
        identifierType: 'uuid',
      };
      expect(clone.next(patientIdentifier).value).toEqual(
        put(
          savePatientIdentifierSuccessAction(
            patientIdentifier.uuid,
            patientIdentifier
          )
        )
      );
      expect(clone.next().done).toEqual(true);
    });

    test('save patient identifier with encounter success', () => {
      const newPatientIdentifier = {
        uuid: '123',
        value: '123',
        identifierType: 'uuid',
      };
      const action = savePatientIdentifierAction(
        'test',
        newPatientIdentifier,
        'personUuid'
      );

      const generator = cloneableGenerator(savePatientIdentifier)(action);
      const clone = generator.clone();
      const expected = call(
        postData,
        getPatientIdentifierUrl(action),
        newPatientIdentifier
      );
      expect(clone.next().value).toEqual(expected);
      const patientIdentifier = {
        uuid: '123',
        value: '123',
        identifierType: 'uuid',
      };

      expect(clone.next(patientIdentifier).value).toEqual(
        put(
          savePatientIdentifierSuccessAction(
            patientIdentifier.uuid,
            patientIdentifier
          )
        )
      );
      expect(clone.next().done).toEqual(true);
    });

    test('save patient identifier failure', () => {
      const newPatientIdentifier = {
        value: '123',
        identifierType: 'uuid',
      };
      let action = savePatientIdentifierAction(
        'test',
        newPatientIdentifier,
        '123'
      );
      let generator = cloneableGenerator(savePatientIdentifier)(action);
      let clone = generator.clone();
      clone.next();
      expect(
        clone.throw(new Error('save patient identifier attribute failed')).value
      ).toEqual(
        put(
          savePatientIdentifierFailAction(
            undefined,
            'save patient identifier attribute failed'
          )
        )
      );

      action = savePatientIdentifierAction('test', newPatientIdentifier);
      generator = cloneableGenerator(savePatientIdentifier)(action);
      clone = generator.clone();
      clone.next();
      const error = { statusCode: 500, message: 'server error occurred' };
      expect(
        clone.throw({
          error,
        }).value
      ).toEqual(put(savePatientIdentifierFailAction(undefined, error)));

      const existingPatientIdentifier = {
        uuid: '123',
        identifierType: 'test',
        value: '123',
      };
      action = savePatientIdentifierAction('test', existingPatientIdentifier);
      generator = cloneableGenerator(savePatientIdentifier)(action);
      clone = generator.clone();
      clone.next();
      expect(
        clone.throw(new Error('save patient identifier failed')).value
      ).toEqual(
        put(
          savePatientIdentifierFailAction(
            existingPatientIdentifier.uuid,
            'save patient identifier failed'
          )
        )
      );
    });
  });

  describe('Patient image', () => {
    test('missing required argument', () => {
      const action = savePatientImageAction('test', undefined);
      const generator = cloneableGenerator(savePatientImage)(action);
      const clone = generator.clone();
      expect(clone.next().value).toEqual(
        put(savePatientImageFailAction(undefined, 'Person uuid is required'))
      );
    });
    test('save patient Image success', () => {
      const payload = {
        person: '123',
        base64EncodedImage: 'image',
      };
      const action = savePatientImageAction('test', '123', payload);

      const generator = cloneableGenerator(savePatientImage)(action);
      const clone = generator.clone();
      const expected = call(postData, getPersonImageUrl(action), payload);
      expect(clone.next().value).toEqual(expected);

      const result = {
        uuid: '123',
        value: '123',
      };
      expect(clone.next(result).value).toEqual(
        put(savePatientImageSuccessAction('123', result))
      );
      expect(clone.next().done).toEqual(true);
    });

    test('save patient image failure', () => {
      const payload = {
        value: '123',
        identifierType: 'uuid',
      };
      let action = savePatientImageAction('test', '123', payload);
      let generator = cloneableGenerator(savePatientImage)(action);
      let clone = generator.clone();
      clone.next();
      expect(clone.throw(new Error('save patient image failed')).value).toEqual(
        put(savePatientImageFailAction('123', 'save patient image failed'))
      );

      action = savePatientImageAction('test', '123', payload);
      generator = cloneableGenerator(savePatientImage)(action);
      clone = generator.clone();
      clone.next();
      const error = { statusCode: 500, message: 'server error occurred' };
      expect(
        clone.throw({
          error,
        }).value
      ).toEqual(put(savePatientImageFailAction('123', error)));
    });
  });
});
