import {
  FETCH_FORM_RESOURCE_ACTION,
  FETCH_FORM_RESOURCE_SUCCESS_ACTION,
  FETCH_FORM_RESOURCE_FAIL_ACTION,
  SELECT_FORM_RESOURCE_ACTION,
  fetchFormResourceAction,
  fetchFormResourceSuccessAction,
  fetchFormResourceFailAction,
  selectFormResourceAction,
} from '../../../../js/state/ui/formResource/actions';

describe('formResource actions', () => {
  describe('FETCH_FORM_RESOURCE_ACTION', () => {
    it('FETCH_FORM_RESOURCE_ACTION', () => {
      const result = fetchFormResourceAction('test', '123');
      expect(result).toEqual({
        type: FETCH_FORM_RESOURCE_ACTION,
        url: 'test',
        uuid: '123',
      });
    });
  });
  describe('FETCH_FORM_RESOURCE_SUCCESS_ACTION', () => {
    it('FETCH_FORM_RESOURCE_SUCCESS_ACTION', () => {
      const result = fetchFormResourceSuccessAction('test', '123');
      expect(result).toEqual({
        type: FETCH_FORM_RESOURCE_SUCCESS_ACTION,
        uuid: 'test',
        formResource: '123',
      });
    });
  });
  describe('FETCH_FORM_RESOURCE_FAIL_ACTION', () => {
    it('FETCH_FORM_RESOURCE_FAIL_ACTION', () => {
      const result = fetchFormResourceFailAction('test', '123');
      expect(result).toEqual({
        type: FETCH_FORM_RESOURCE_FAIL_ACTION,
        uuid: 'test',
        error: '123',
      });
    });
  });
  describe('SELECT_FORM_RESOURCE_ACTION', () => {
    it('SELECT_FORM_RESOURCE_ACTION', () => {
      const result = selectFormResourceAction('test', '123');
      expect(result).toEqual({
        type: SELECT_FORM_RESOURCE_ACTION,
        formResourceId: 'test',
        formResourceIndex: '123',
      });
    });
  });
});
