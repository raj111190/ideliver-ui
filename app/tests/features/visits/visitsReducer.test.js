import { fromJS } from 'immutable';
import VisitsReducer from '../../../js/features/visits/visitsReducer';
import fetchVisitsSuccessAction from '../../../js/features/visits/actions/fetchVisitsSuccessAction';
import fetchVisitsFailAction from '../../../js/features/visits/actions/fetchVisitsFailAction';
import {
  submitFormAction,
  submitFormFailAction,
  submitFormSuccessAction,
} from '../../../js/state/ui/form/actions';

describe('VisitsReducer', () => {
  it('should return the initial state', () => {
    expect(VisitsReducer(undefined, {})).toEqual(
      fromJS({
        list: [],
        validation: [],
        data: {},
        metadata: {},
        submittingForm: false,
      })
    );
  });

  it('should handle fetchVisitsSuccessAction', () => {
    expect(
      VisitsReducer(fromJS({}), fetchVisitsSuccessAction([1, 2, 3]))
    ).toEqual(
      fromJS({
        list: [1, 2, 3],
      })
    );
  });

  it('should handle fetchVisitsFailAction', () => {
    expect(VisitsReducer(fromJS({}), fetchVisitsFailAction(['error']))).toEqual(
      fromJS({
        validation: ['error'],
      })
    );
  });

  it('should handle submitFormAction', () => {
    expect(VisitsReducer(fromJS({}), submitFormAction('data'))).toEqual(
      fromJS({
        submittingForm: true,
      })
    );
  });

  it('should handle submitFormFailAction', () => {
    expect(VisitsReducer(fromJS({}), submitFormFailAction('data'))).toEqual(
      fromJS({
        submittingForm: false,
      })
    );
  });

  it('should handle submitFormSuccessAction', () => {
    expect(VisitsReducer(fromJS({}), submitFormSuccessAction('data'))).toEqual(
      fromJS({
        submittingForm: false,
      })
    );
  });
});
