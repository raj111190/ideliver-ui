import React from 'react';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import { createMockStore } from 'redux-test-utils';
import { mountWithRouterAndIntl } from '../../enzyme-test-helpers';
import VcDialog from '../../../js/components/vcDialog/vcDialog';
import VcDialogContentDiagnosis from '../../../js/components/vcDialogContentDiagnosis/vcDialogContentDiagnosis';
import VcFormContainer from '../../../js/features/vcForm/vcFormContainer';
import { form } from '../../../js/uuid';
import { MemoryRouter } from 'react-router-dom';
describe('VcDialog', () => {
  let store;
  let testState;
  let mockFunc;
  beforeEach(() => {
    mockFunc = jest.fn();
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
      ui: {
        form: fromJS({}),
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
      entities: fromJS({
        forms: {},
      }),
    };
    store = createMockStore(testState);
  });

  it('renders without crashing', () => {
    const component = mountWithRouterAndIntl(
      <MemoryRouter initialEntries={['/']}>
        <VcDialog
          title="Add diagnosis"
          type="Diagnosis"
          onToggle={mockFunc}
          dialogContent={
            <VcDialogContentDiagnosis
              type="Diagnosis"
              filtersSelected={[]}
              filterOptions={['Intact', 'Clear', 'Meconium', 'Bloody']}
              onSelection={mockFunc}
            />
          }
        />
      </MemoryRouter>
    );
    expect(component).toBeDefined();
  });

  it('renders without crashing', () => {
    const component = mountWithRouterAndIntl(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <VcDialog
            title="Add summary"
            type="Summary"
            onToggle={mockFunc}
            dialogContent={
              <VcFormContainer
                uuid={form.VISIT_SUMMARY_FORM_UUID}
                location={{
                  pathname: '01234567DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD89',
                }}
              />
            }
          />
        </Provider>
      </MemoryRouter>
    );
    expect(component.find('VcDialog').at(0)).toBeDefined();
  });
});
