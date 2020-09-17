import React from 'react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { fromJS } from 'immutable';
import { mountWithIntl } from '../../enzyme-test-helpers';
import VcClientCard from '../../../js/components/vcClientCard/vcClientCard';

describe('VcClientCard', () => {
  let store;
  let testState;

  beforeEach(() => {
    testState = {
      Visits: fromJS({
        metadata: {
          forms: {
            mockFormId: {
              encounterType: { uuid: 'mockUuid' },
              formFields: [
                {
                  uuid: 1,
                  field: {
                    description:
                      '{"name":"VcTextField","props":{"vType":"number"},"validation":{}}',
                  },
                  fieldNumber: 1,
                },
                {
                  uuid: 2,
                  field: {
                    description:
                      '{"name":"VcTextField","props":{"vType":"number"},"validation":{}}',
                  },
                  fieldNumber: 2,
                },
              ],
            },
          },
        },
        data: {
          DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD: {
            forms: { mockFormId: { data: 'data' } },
          },
        },
      }),
    };
    store = createMockStore(testState);
  });

  it('renders without crashing', () => {
    const component = mountWithIntl(
      <Provider store={store}>
        <VcClientCard
          img="img/demo_photo.png"
          acuity={1}
          givenName="Caroline"
          familyName="Naisaruru"
          age={28}
          companionGivenName="Joel"
          companionFamilyName="Ntimama"
          weeks={39}
          parity="1+1"
          riskFactors={['Malaria', 'Allergy']}
          task="Give magnesium sulfate"
          patientStatus="Admitted"
          nextCheckUp={15}
        />
      </Provider>
    );
    expect(component).toBeDefined();
  });

  it('renders without crashing with no weeks of pregnancy or parity set', () => {
    const component = mountWithIntl(
      <Provider store={store}>
        <VcClientCard
          img="img/demo_photo.png"
          acuity={1}
          givenName="Caroline"
          familyName="Naisaruru"
          age={28}
          companionGivenName="Joel"
          companionFamilyName="Ntimama"
          riskFactors={['Malaria', 'Allergy']}
          task="Give magnesium sulfate"
          patientStatus="Admitted"
          nextCheckUp={15}
        />
      </Provider>
    );
    expect(component).toBeDefined();
  });

  it('renders without crashing with no riskFactors', () => {
    const component = mountWithIntl(
      <Provider store={store}>
        <VcClientCard
          img="img/demo_photo.png"
          acuity={1}
          givenName="Caroline"
          familyName="Naisaruru"
          age={28}
          companionGivenName="Joel"
          companionFamilyName="Ntimama"
          weeks={39}
          parity="1+1"
          task="Give magnesium sulfate"
          patientStatus="Admitted"
          nextCheckUp={15}
        />
      </Provider>
    );
    expect(component).toBeDefined();
  });
});
