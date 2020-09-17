import React from 'react';
import { fromJS } from 'immutable';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { mountWithIntl } from '../../enzyme-test-helpers';

import VcImageContainer from '../../../js/features/vcImage/vcImageContainer';
import { savePatientImageAction } from '../../../js/state/ui/patient/actions';
import { REST_API_PATHNAME } from '../../../js/paths';

describe('vcImageContainer', () => {
  // Construct a new `IntlProvider` instance by passing `props` and
  // `context` as React would, then call `getChildContext()` to get the
  // React Intl API, complete with the `format*()` functions.
  const intlProvider = new IntlProvider({ locale: 'en' }, {});
  const { intl } = intlProvider.getChildContext();

  let store, component, testState;

  beforeEach(() => {
    testState = {
      Visits: fromJS({ data: { 89: { image: 'test' } } }),
    };
    store = createMockStore(testState);
    component = mountWithIntl(
      <Provider store={store}>
        <VcImageContainer intl={intl} visitId={89} personId={1} />
      </Provider>
    )
      .find('VcImage')
      .get(0);
  });

  it('should render without throwing an error', () => {
    expect(component).toBeDefined();
  });

  it('post action should get dispatched', () => {
    component.props.onChange('image');

    const actions = store.getActions();
    expect(actions).toEqual([
      savePatientImageAction(REST_API_PATHNAME, 1, {
        person: 1,
        base64EncodedImage: 'image',
      }),
    ]);
  });
});
