import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { createMockStore } from 'redux-test-utils';

import VitalsContainer from '../../../js/features/vitals/vitalsContainer';
import { selectFormAction } from '../../../js/state/ui/form/actions';

describe('VitalsContainer', () => {
  let store, component, testState;

  beforeEach(() => {
    testState = {
      Visits: fromJS({
        metadata: { forms: { mockFormId: { schema: 'schema' } } },
        data: {
          DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD: {
            forms: { mockFormId: { data: 'data' } },
          },
        },
      }),
      ui: {
        episode: fromJS({
          currentEpisode: '123',
        }),
        form: fromJS({
          selectedForm: '123',
          formData: {
            DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD: {
              mockFormId: { data: 'data' },
            },
          },
        }),
        formResource: fromJS({
          fetching: false,
          requiredFormFields: {},
          formResourceData: {
            results: [
              {
                uuid: 'de5affcd-8881-47ea-8fce-8f0d68696cbf',
                name: 'Demographics',
                valueReference: '{"saveButtons":[{"save":{"label":"Save"}}]}',
                display: 'Demographics',
                resourceVersion: '1.9',
                links: [
                  {
                    rel: 'value',
                    uri:
                      'http://localhost:8080/openmrs/ws/rest/v1/form/71a643f5-63e1-439f-a8a6-cb4f2bced721/resource/de5affcd-8881-47ea-8fce-8f0d68696cbf?v=full',
                  },
                  {
                    rel: 'self',
                    uri:
                      'http://localhost:8080/openmrs/ws/rest/v1/form/71a643f5-63e1-439f-a8a6-cb4f2bced721/resource/de5affcd-8881-47ea-8fce-8f0d68696cbf?v=full',
                  },
                  {
                    rel: 'full',
                    uri:
                      'http://localhost:8080/openmrs/ws/rest/v1/form/71a643f5-63e1-439f-a8a6-cb4f2bced721/resource/de5affcd-8881-47ea-8fce-8f0d68696cbf?v=full',
                  },
                ],
              },
            ],
          },
          selectedFormResource: '71a643f5-63e1-439f-a8a6-cb4f2bced721',
        }),
      },
    };
    store = createMockStore(testState);
    component = shallow(
      <VitalsContainer
        store={store}
        location={{
          pathname: '01234567DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD89',
        }}
        uuid="mockFormId"
      />
    );
  });

  it('should pass props defined in mapStateToProps', () => {
    expect(component).toBeDefined();
    const vitals = component.dive();
    const componentProps = ['data'];
    expect(Object.keys(vitals.props())).toEqual(
      expect.arrayContaining(componentProps)
    );
  });

  it('should pass props defined in mapDispatchToProps', () => {
    const vitals = component.dive();
    const componentProps = ['selectForm'];
    expect(Object.keys(vitals.props())).toEqual(
      expect.arrayContaining(componentProps)
    );
  });

  it('should dispatch selectFormAction', () => {
    const vitals = component.dive();
    vitals.props().selectForm('formId', 'formIndex');
    const isActionDispatched = store.isActionDispatched(
      selectFormAction('formId', 'formIndex')
    );
    expect(isActionDispatched).toBe(true);
  });
});
