import React from 'react';
import { mount, shallow } from 'enzyme';
import VcDropDownSet from '../../../js/components/vcDropDownSet/vcDropDownSet';
import { mountWithIntl, shallowWithIntl } from '../../enzyme-test-helpers';

describe('VcDropDownSet', () => {
  const mockFunc1 = jest.fn();
  const mockFunc2 = jest.fn();
  const options = [
    {
      uuid: '200082DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      display: "Mother's HIV status",
      answers: [
        {
          display: 'Positive',
          uuid: '180040DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
        },
        {
          display: 'Negative',
          uuid: '180041DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
        },
      ],
    },
    {
      uuid: '200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      display: 'Blood Group',
      answers: [
        {
          display: 'A+',
          uuid: '180058DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
        },
        {
          display: 'A-',
          uuid: '180059DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
        },
      ],
    },
    {
      uuid: '300107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      display: 'NestedDropDownSet',
      answers: [
        {
          display: "Mother's HIV status",
          uuid: '200082DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
        },
        {
          display: 'Blood Group',
          uuid: '200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
        },
      ],
    },
  ];
  const dropDownSetOptions = {
    '200082DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD': [
      {
        display: 'Positive',
        uuid: '180040DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      },
      {
        display: 'Negative',
        uuid: '180041DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      },
    ],
    '200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD': [
      {
        display: 'A+',
        uuid: '180058DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      },
      {
        display: 'A-',
        uuid: '180059DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      },
    ],
    '300107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD': [
      {
        display: "Mother's HIV status",
        uuid: '200082DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
        answers: [
          {
            display: 'A+',
            uuid: '180058DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          },
          {
            display: 'A-',
            uuid: '180059DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          },
        ],
      },
      {
        display: 'Blood Group',
        uuid: '200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
        answers: [
          {
            display: 'Positive',
            uuid: '180040DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          },
          {
            display: 'Negative',
            uuid: '180041DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          },
        ],
      },
    ],
  };
  const fields = {
    '200082DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD': {
      name: 'VcDropDown',
      props: {},
    },
    '200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD': {
      name: 'VcDropDown',
      props: {},
    },
    '300107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD': {
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
        allOptions: dropDownSetOptions,
        options: [
          {
            uuid: '200082DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
            display: "Mother's HIV status",
            answers: [
              {
                display: 'Positive',
                uuid: '180040DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              },
              {
                display: 'Negative',
                uuid: '180041DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              },
            ],
          },
          {
            uuid: '200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
            display: 'Blood Group',
            answers: [
              {
                display: 'A+',
                uuid: '180058DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              },
              {
                display: 'A-',
                uuid: '180059DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              },
            ],
          },
        ],
      },
    },
  };

  const value1 = {
    display: 'Blood Group',
    uuid: '200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
  };

  const hivStat = {
    display: "Mother's HIV status",
    uuid: '200082DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
  };

  const dpValue1 = {
    display: 'NestedDropDownSet',
    uuid: '300107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
  };

  const dpValue2 = 'NestedDropDownSet';

  const value2 = 'Blood Group';

  it('renders without crashing', () => {
    const component = shallowWithIntl(
      <VcDropDownSet
        options={options}
        label="Lab Test"
        dropDownSetOptions={dropDownSetOptions}
        fields={fields}
        onChange={mockFunc1}
        onChangeAnswer={mockFunc2}
        value={value1}
      />
    );
    expect(component).toBeDefined();
    component.unmount();
  });

  it('renders all necessary components', () => {
    const component = mountWithIntl(
      <VcDropDownSet
        options={options}
        label="Lab Test"
        allOptions={dropDownSetOptions}
        fields={fields}
        onChange={mockFunc1}
        value={value2}
        onChangeAnswer={mockFunc2}
      />
    );
    const dropDown1 = component.find('VcDropDown').at(0);
    expect(dropDown1).toBeDefined();
    dropDown1.simulate('change', { target: { value: 'Blood Group' } });

    const dropDown2 = component.find('VcDropDown').at(1);
    expect(dropDown2).toBeDefined();

    component.unmount();
  });

  it('renders all nested components', () => {
    const component = mountWithIntl(
      <VcDropDownSet
        options={options}
        label="Lab Test"
        allOptions={dropDownSetOptions}
        fields={fields}
        onChange={mockFunc1}
        value={dpValue2}
        onChangeAnswer={mockFunc2}
      />
    );
    const dropDown1 = component.find('VcDropDown').at(0);
    expect(dropDown1).toBeDefined();
    dropDown1.simulate('change', { target: { value: 'NestedDropDownSet' } });

    const dropDown2 = component.find('VcDropDown').at(1);
    expect(dropDown2).toBeDefined();
    dropDown1.props().onChangeAnswer('Blood Group', false, value1);

    const dropDown3 = component.find('VcDropDown').at(2);
    expect(dropDown3).toBeDefined();

    dropDown1.props().onChangeAnswer("Mother's HIV status", false, hivStat);
    // dropDown2.simulate('change', { target: { value: 'Mother\'s HIV status' } });

    const dropDown4 = component.find('VcTextField').at(2);
    expect(dropDown4).toBeDefined();

    component.unmount();
  });
});
