import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import VcForm from '../../../js/features/vcForm/vcForm';
import VcDateTime from '../../../js/components/vcDateTime/vcDateTime';
import { mountWithRouterAndIntl } from '../../enzyme-test-helpers';

describe('VcForm', () => {
  let mockFunc1;
  let mockFunc2;
  let mockFunc3;
  beforeEach(() => {
    mockFunc1 = jest.fn();
    mockFunc2 = jest.fn();
    mockFunc3 = jest.fn();
  });

  it('should render', () => {
    const result = [];
    const component = mountWithRouterAndIntl(
      <MemoryRouter initialEntries={['/']}>
        <VcForm
          onChange={mockFunc2}
          onSubmit={mockFunc1}
          formResourceData={{
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
          }}
          metadata={{
            uuid: '71a643f5-63e1-439f-a8a6-cb4f2bced721',
            name: 'General Information',
            description:
              "Used to confirm/add/edit client's general information like: file #, address, telephone, education, last period, referrals, etc.",
            encounterType: {
              uuid: '1ac91513-aba9-4b88-b627-f0489dbfbcdc',
            },
            formFields: [
              {
                uuid: 'a8226268-25f7-4796-a02d-1bba1908f54f',
                description: null,
                parent: {
                  uuid: '245f831d-46c5-4027-bc50-ba97c2d2c41b',
                },
                field: {
                  attributeName: null,
                  concept: {
                    uuid: '200091DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    answers: [],
                  },
                  name: 'Health Facility Referred From',
                  selectMultiple: false,
                  defaultValue: null,
                  fieldType: {
                    uuid: '8d5e7d7c-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Concept',
                  },
                  tableName: null,
                  uuid: '7feba621-3dfe-437c-9203-60745cfef39a',
                  description:
                    '{"name":"VcTextField","props":{"vType":"text"},"validation":{}}',
                },
                fieldNumber: 12,
                pageNumber: 1,
              },
              {
                uuid: '245f831d-46c5-4027-bc50-ba97c2d2c41b',
                description: null,
                parent: null,
                field: {
                  attributeName: null,
                  concept: {
                    uuid: '200090DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    answers: [],
                  },
                  name: 'Referral In from Health Facility',
                  selectMultiple: false,
                  defaultValue: null,
                  fieldType: {
                    uuid: '8d5e836c-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Set of Concepts',
                  },
                  tableName: null,
                  uuid: 'd98dd460-e9e7-40d7-b401-709a1f8f4505',
                  description:
                    '{"name":"VcGenericSwitch","props":{},"validation":{}}',
                },
                fieldNumber: 11,
                pageNumber: 1,
              },
              {
                uuid: '63b79a7f-068f-4677-9185-13c44c5a5934',
                description: null,
                parent: null,
                field: {
                  attributeName: null,
                  concept: {
                    uuid: '200084DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    answers: [
                      {
                        uuid: '159943AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                        display: 'Primary',
                      },
                      {
                        uuid: '159944AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                        display: 'Secondary',
                      },
                      {
                        uuid: '180046DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        display: 'University',
                      },
                      {
                        uuid: '5622AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                        display: 'Other',
                      },
                    ],
                  },
                  name: 'Education Level',
                  selectMultiple: false,
                  defaultValue: null,
                  fieldType: {
                    uuid: '8d5e7d7c-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Concept',
                  },
                  tableName: null,
                  uuid: 'eb1499bd-fe91-4cb2-993e-3cd44f984e44',
                  description:
                    '{"name":"VcDropDown","props":{},"validation":{}}',
                },
                fieldNumber: 5,
                pageNumber: 1,
              },
              {
                uuid: '200117DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                description: null,
                parent: null,
                field: {
                  attributeName: null,
                  concept: {
                    uuid: '200113DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    answers: [],
                    set: true,
                    setMembers: [
                      {
                        uuid: '200105DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        display: 'Lab Date',
                      },
                      {
                        uuid: '200106DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        display: 'Lab Test',
                        answers: [
                          {
                            uuid: '200082DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                            display: 'Mothers HIV status',
                          },
                          {
                            uuid: '200109DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                            display: 'Hgb (g/dL)',
                          },
                        ],
                      },
                      {
                        uuid: '200082DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        display: 'Mothers HIV status',
                        answers: [
                          {
                            uuid: '180040DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                            display: 'Positive',
                          },
                          {
                            uuid: '180041DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                            display: 'Negative',
                          },
                          {
                            uuid: '180042DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                            display: 'Inconclusive',
                          },
                          {
                            uuid: '180043DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                            display: 'Not tested',
                          },
                        ],
                      },
                      {
                        uuid: '200109DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        display: 'Hgb (g/dL)',
                      },
                    ],
                  },
                  name: 'Labs',
                  selectMultiple: false,
                  defaultValue: null,
                  fieldType: {
                    uuid: '8d5e7d7c-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Concept',
                  },
                  tableName: null,
                  uuid: '200114DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  description:
                    '{"name":"VcFieldsSet","props":{"fields":{"200105DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD":{"name":"VcDateTime","props":{"hasTime":false},"validation":{}},"200106DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD":{"name":"VcDropDownSet","props":{"fields":{"200082DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD":{"name":"VcDropDown","props":{}},"200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD":{"name":"VcDropDown","props":{}},"200108DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD":{"name":"VcDropDown","props":{}},"200109DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD":{"name":"VcTextField","props":{"vType":"number"}},"200110DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD":{"name":"VcDropDown","props":{}},"200111DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD":{"name":"VcDropDown","props":{}},"200112DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD":{"name":"VcDropDown","props":{}}}},"validation":{}}}},"validation":{}}',
                },
                fieldNumber: 6,
                pageNumber: 1,
              },
            ],
          }}
        />
      </MemoryRouter>
    );

    expect(component).toBeDefined();
    expect(mockFunc2.mock.calls.length).toBe(0);

    const button = component.find('VcButton').at(0);
    button.simulate('click');
    expect(mockFunc1.mock.calls.length).toBe(1);

    button.props().onMouseEnter({ currentTarget: { focus: mockFunc3 } });
    expect(mockFunc3.mock.calls.length).toBe(1);

    const dateTime = component.find(VcDateTime).at(0);
    console.log(dateTime);
    dateTime.props().onChange('value');

    const dateTime2 = component
      .find(VcDateTime)
      .at(component.find(VcDateTime).length - 1);
    console.log(dateTime);
    dateTime2.props().onChange('2018-01-13');

    const genericSwitch = component.find('VcGenericSwitch').getElements()[0];
    genericSwitch.props.onChange(true);
    expect(mockFunc2.mock.calls.length).toBe(2);

    const textField = genericSwitch.props.children[0];
    textField.props.onChange('value', {});
    expect(mockFunc2.mock.calls.length).toBe(3);
  });
});
