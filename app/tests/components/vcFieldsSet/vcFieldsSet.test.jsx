import React from 'react';
import { mount } from 'enzyme';
import { mountWithIntl, shallowWithIntl } from '../../enzyme-test-helpers';
import VcFieldsSet from '../../../js/components/vcFieldsSet/vcFieldsSet';
import FormHelperText from '@material-ui/core/FormHelperText';

describe('VcFieldsSet', () => {
  let mockFunc;
  let component;
  const initialState = {
    tempValues: {
      concept: '200103DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      display: 'Labs',
      groupMembers: {},
    },
  };
  beforeEach(() => {
    mockFunc = jest.fn();
    component = mountWithIntl(
      <VcFieldsSet
        label="Labs"
        onChange={mockFunc}
        fieldConcept="200103DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD"
        fields={{
          '200100DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD': {
            name: 'VcTextField',
            props: { vType: 'text' },
            validation: {},
          },
          '200106DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD': {
            name: 'VcDropDownSet',
            props: {
              fields: {
                '200082DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD': {
                  name: 'VcDropDown',
                },
                '200109DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD': {
                  name: 'VcTextField',
                  props: { vType: 'number' },
                },
                '300106DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD': {
                  name: 'VcDropDownSet',
                  props: {
                    fields: {
                      '200082DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD': {
                        name: 'VcDropDown',
                      },
                      '200109DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD': {
                        name: 'VcTextField',
                        props: { vType: 'number' },
                      },
                      '400106DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD': {
                        name: 'VcDropDownSet',
                        props: {
                          fields: {
                            '200082DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD': {
                              name: 'VcDropDown',
                            },
                            '200109DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD': {
                              name: 'VcTextField',
                              props: { vType: 'number' },
                            },
                          },
                          validation: {},
                        },
                      },
                    },
                    validation: {},
                  },
                },
              },
              validation: {},
            },
          },
        }}
        options={[
          {
            uuid: '200100DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
            display: 'Drug Name',
          },
          {
            uuid: '200106DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
            answers: [
              {
                display: "Mother's HIV status",
                uuid: '200082DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              },
              {
                display: 'Hgb (g/dL)',
                uuid: '200109DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              },
            ],
            attributes: [],
            conceptClass: {
              display: 'Question',
              uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
            },
            datatype: {
              display: 'Coded',
              uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
            },
            descriptions: [],
            display: 'Lab Test',
            mappings: [],
            name: {
              conceptNameType: 'FULLY_SPECIFIED',
              display: 'Lab Test',
              locale: 'en',
              localePreferred: true,
              name: 'Lab Test',
              uuid: '200106DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
            },
            names: [
              {
                display: 'Lab Test',
                uuid: '200106DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              },
            ],
            retired: false,
            set: false,
            setMembers: [],
          },
          {
            uuid: '200082DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
            answers: [
              {
                display: "Mother's HIV status",
                uuid: '200082DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              },
              {
                display: 'Hgb (g/dL)',
                uuid: '200109DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              },
            ],
            attributes: [],
            conceptClass: {
              display: 'Question',
              uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
            },
            datatype: {
              display: 'Coded',
              uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
            },
            descriptions: [],
            display: "Mother's HIV status",
            mappings: [],
            name: {
              conceptNameType: 'FULLY_SPECIFIED',
              display: 'Lab Test',
              locale: 'en',
              localePreferred: true,
              name: 'Lab Test',
              uuid: '200106DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
            },
            names: [{ display: 'Lab Test' }],
            resourceVersion: '2.0',
            retired: false,
            set: false,
            setMembers: [],
            version: null,
          },
          {
            answers: [],
            attributes: [],
            conceptClass: {
              display: 'Test',
              uuid: '8d4907b2-c2cc-11de-8d13-0010c6dffd0f',
            },
            datatype: {
              display: 'Numeric',
              uuid: '8d4a4488-c2cc-11de-8d13-0010c6dffd0f',
            },
            descriptions: [],
            display: 'Hgb (g/dL)',
            mappings: [],
            name: {
              conceptNameType: 'FULLY_SPECIFIED',
              display: 'Hgb (g/dL)',
              locale: 'en',
              localePreferred: true,
              name: 'Hgb (g/dL)',
              uuid: '200109DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
            },
            names: [
              {
                display: 'Hgb (g/dL)',
                uuid: '200109DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              },
            ],
            retired: false,
            set: false,
            setMembers: [],
            uuid: '200109DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          },
          {
            answers: [],
            attributes: [],
            conceptClass: {
              display: 'Test',
              uuid: '8d4907b2-c2cc-11de-8d13-0010c6dffd0f',
            },
            datatype: {
              display: 'Coded',
              uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
            },
            descriptions: [],
            display: 'NestedDropdownSet',
            mappings: [],
            name: {
              conceptNameType: 'FULLY_SPECIFIED',
              display: 'NestedDropdownSet',
              locale: 'en',
              localePreferred: true,
              name: 'NestedDropdownSet',
              uuid: '300106DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
            },
            names: [
              {
                display: 'NestedDropdownSet',
                uuid: '300106DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              },
            ],
            retired: false,
            set: false,
            setMembers: [],
            uuid: '300106DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          },
          {
            answers: [],
            attributes: [],
            conceptClass: {
              display: 'Test',
              uuid: '8d4907b2-c2cc-11de-8d13-0010c6dffd0f',
            },
            datatype: {
              display: 'Coded',
              uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
            },
            descriptions: [],
            display: 'NestedDropdownSet2',
            mappings: [],
            name: {
              conceptNameType: 'FULLY_SPECIFIED',
              display: 'NestedDropdownSet2',
              locale: 'en',
              localePreferred: true,
              name: 'NestedDropdownSet2',
              uuid: '400106DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
            },
            names: [
              {
                display: 'NestedDropdownSet2',
                uuid: '400106DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              },
            ],
            retired: false,
            set: false,
            setMembers: [],
            uuid: '400106DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          },
        ]}
        value={[
          {
            concept: '200103DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
            uuid: '384a8488-29b3-43f0-9892-b3af2b8bc645',
            groupMembers: [
              {
                concept: '200100DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                memUuid: 'a8bbb48d-1b1a-412d-9df4-13be8182d493',
                value: 'Test value',
              },
            ],
          },
        ]}
      />
    );
  });

  it('renders without crashing', () => {
    expect(component).toBeDefined();
    component.unmount();
  });

  it('clicking buttons work', () => {
    const button = component.find('IconButton').at(0);
    const innerComponent = component.find('VcTextField').at(0);
    innerComponent.props().onChange('Trololo');
    expect(mockFunc.mock.calls.length).toBe(1);

    button.simulate('click');
    expect(component.state()).toEqual(initialState);
    expect(mockFunc.mock.calls.length).toBe(2);

    component.unmount();
  });

  const Hgb = {
    uuid: '200109DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Hgb (g/dL)',
    answers: {},
  };

  const hivStat = {
    uuid: '200082DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: "Mother's HIV status",
    answers: {},
  };

  const dropdownSet = {
    uuid: '300106DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'NestedDropdownSet',
    answers: {},
  };

  const dropdownSet2 = {
    uuid: '400106DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'NestedDropdownSet2',
    answers: {},
  };

  it('clicking VcDropDownSet buttons work', () => {
    const button = component.find('VcDropDownSet').at(0);
    button.props().onChangeAnswer('Hgb (g/dL)', false, Hgb);
    const innerComponent = component.find('VcTextField').at(1);
    expect(innerComponent).toBeDefined();
    button.props().onChangeAnswer("Mother's HIV status", false, hivStat);
    button.props().onChangeAnswer("Mother's HIV status", false, hivStat);
    const innerComponent2 = component.find('VcDropDown').at(1);
    expect(innerComponent2).toBeDefined();
    button.props().onChangeAnswer('NestedDropdownSet', false, dropdownSet);
    const innerComponent3 = component.find('VcDropDown').at(1);
    expect(innerComponent3).toBeDefined();
    innerComponent3
      .props()
      .onChangeAnswer("Mother's HIV status", false, hivStat);
    const innerComponent4 = component.find('VcDropDown').at(2);
    expect(innerComponent4).toBeDefined();
    innerComponent3.props().onChangeAnswer('Hgb (g/dL)', false, Hgb);
    const innerComponent5 = component.find('VcTextField').at(2);
    expect(innerComponent5).toBeDefined();
    innerComponent3
      .props()
      .onChangeAnswer('NestedDropdownSet2', false, dropdownSet2);
    const innerComponent6 = component.find('VcDropDown').at(2);
    expect(innerComponent6).toBeDefined();
    component.unmount();
  });
});
