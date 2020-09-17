import React from 'react';
import { fromJS } from 'immutable';
import { createMockStore } from 'redux-test-utils';
import { shallowWithIntl } from '../../enzyme-test-helpers';
import { REST_API_PATHNAME } from '../../../js/paths';
import vcFormContainer from '../../../js/features/vcForm/vcFormContainer';
import vcForm from '../../../js/features/vcForm/vcForm';

describe('vcFormContainer', () => {
  let store, component, testState;
  beforeEach(() => {
    testState = {
      Visits: fromJS({ list: [] }),
    };
    store = createMockStore(testState);
    component = shallowWithIntl(<vcFormContainer store={store} />)
      .find(vcForm)
      .at(0);
  });

  it('should render without throwing an error', () => {
    expect(component).toBeDefined();
  });
});
