import {
  FETCH_FORM_ACTION,
  FETCH_FORM_FAIL_ACTION,
  FETCH_FORM_SUCCESS_ACTION,
  fetchFormAction,
  fetchFormFailAction,
  fetchFormSuccessAction,
  SET_FORM_DATA_ACTION,
  setFormDataAction,
} from '../../../../js/state/ui/form/actions';

describe('Form action', () => {
  describe('fetch form', () => {
    it('fetch form action', () => {
      const result = fetchFormAction('test', '123');
      expect(result).toEqual({
        type: FETCH_FORM_ACTION,
        url: 'test',
        uuid: '123',
      });
    });

    it('fetch form success action', () => {
      const form = [
        {
          uuid: '123',
          formFields: [],
        },
      ];
      const result = fetchFormSuccessAction('123', form);
      expect(result).toEqual({
        type: FETCH_FORM_SUCCESS_ACTION,
        uuid: '123',
        form,
      });
    });

    it('fetch form fail action', () => {
      const error = 'form error';
      const result = fetchFormFailAction('123', error);
      expect(result).toEqual({
        type: FETCH_FORM_FAIL_ACTION,
        uuid: '123',
        error,
      });
    });

    it('set form Data action', () => {
      const result = setFormDataAction(['123', '124'], 'value');
      expect(result).toEqual({
        type: SET_FORM_DATA_ACTION,
        path: ['123', '124'],
        value: 'value',
      });
    });
  });
});
