import React from 'react';
import { fromJS } from 'immutable';
import { createMockStore } from 'redux-test-utils';
import { shallowWithIntl } from '../../enzyme-test-helpers';
import { dismissErrorAction } from '../../../js/state/error/actions';
import ErrorMessagesContainer from '../../../js/features/errors/errorMessagesContainer';
import ErrorMessages from '../../../js/features/errors/errorMessages';

describe('errorMessagesContainer', () => {
  let store, component, testState;
  beforeEach(() => {
    testState = {
      Visits: fromJS({ list: [] }),
    };
    store = createMockStore(testState);
    component = shallowWithIntl(<ErrorMessagesContainer store={store} />)
      .find(ErrorMessages)
      .at(0);
  });

  it('should render without throwing an error', () => {
    expect(component).toBeDefined();
  });
});
