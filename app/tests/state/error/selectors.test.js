import { fromJS, List } from 'immutable';
import { getErrorMessages } from '../../../js/state/error/selectors';

describe('Error selectors', () => {
  test('getErrorMessages should return all errors', () => {
    expect(getErrorMessages.resultFunc()).toEqual(List());

    expect(getErrorMessages.resultFunc(fromJS([]))).toEqual(List());

    let mockErrors = [
      {
        type: 'ERROR_TYPE',
        uuid: '123',
        errorMessage: {
          message: 'test Message',
        },
      },
    ];

    expect(getErrorMessages.resultFunc(fromJS(mockErrors))).toEqual(
      fromJS([
        {
          type: 'ERROR_TYPE',
          uuid: '123',
          errorMessage: 'test Message',
          errorDescription: [],
        },
      ])
    );

    mockErrors = [
      {
        type: 'ERROR_TYPE',
        uuid: '123',
        errorMessage: {
          message: 'test Message',
          fieldErrors: {
            key: [
              {
                message: 'Field error message',
              },
            ],
          },
        },
      },
    ];

    expect(getErrorMessages.resultFunc(fromJS(mockErrors))).toEqual(
      fromJS([
        {
          type: 'ERROR_TYPE',
          uuid: '123',
          errorMessage: 'test Message',
          errorDescription: ['Field error message'],
        },
      ])
    );

    mockErrors = [
      {
        type: 'ERROR_TYPE',
        uuid: '123',
        errorMessage: {
          message: 'test Message',
          fieldErrors: {
            key: [
              {
                message: 'Field error message',
              },
            ],
          },
          globalErrors: {
            key: [
              {
                message: 'Global error message',
              },
            ],
          },
        },
      },
    ];

    expect(getErrorMessages.resultFunc(fromJS(mockErrors))).toEqual(
      fromJS([
        {
          type: 'ERROR_TYPE',
          uuid: '123',
          errorMessage: 'test Message',
          errorDescription: ['Field error message', 'Global error message'],
        },
      ])
    );
  });
});
