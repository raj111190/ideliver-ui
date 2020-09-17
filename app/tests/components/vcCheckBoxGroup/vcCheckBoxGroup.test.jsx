import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import { mountWithIntl, shallowWithIntl } from '../../enzyme-test-helpers';
import VcCheckBoxGroup from '../../../js/components/vcCheckBoxGroup/vcCheckBoxGroup';

describe('VcCheckBoxGroup', () => {
  let options;
  const mockFunc = jest.fn();
  beforeEach(() => {
    options = [
      { display: 'option a', uuid: 'uuid 1' },
      { display: 'option b', uuid: 'uuid 2', color: 'secondary' },
      { display: 'option c', uuid: 'uuid 3', indeterminate: true },
      { display: 'option d', uuid: 'uuid 4', disabled: true },
    ];
  });
  it('renders without crashing', () => {
    const component = shallowWithIntl(
      <VcCheckBoxGroup
        label="select an option"
        helper
        helperText="select only one"
        options={options}
      />
    );
    expect(component).toBeDefined();
  });

  it('renders all necessary components', () => {
    const component = mountWithIntl(
      <VcCheckBoxGroup
        label="select an option"
        helper
        helperText="select only one"
        options={options}
      />
    );
    const helper = component.find('FormHelperText').at(0);
    expect(helper).toBeDefined();

    const opt_a = component.find('Checkbox').at(0);
    expect(opt_a).toBeDefined();

    const opt_b = component.find('Checkbox').at(1);
    expect(opt_b).toBeDefined();

    const opt_c = component.find('Checkbox').at(2);
    expect(opt_c).toBeDefined();

    const opt_d = component.find('Checkbox').at(3);
    expect(opt_d).toBeDefined();

    component.unmount();
  });

  it('does not render additional components', () => {
    const component = mountWithIntl(
      <VcCheckBoxGroup
        label="select an option"
        helper={false}
        helperText="select only one"
        options={options}
      />
    );
    const helper = component.find(FormHelperText);
    expect(helper.exists()).toBe(false);

    component.unmount();
  });

  it('options are preserved while rendering', () => {
    const component = mountWithIntl(
      <VcCheckBoxGroup
        onChange={mockFunc}
        label="select an option"
        helper
        helperText="select only one"
        options={options}
        value={[{ display: 'option a' }, { display: 'option b', voided: true }]}
      />
    );

    const checkbox0 = component.find('Checkbox').at(0);
    expect(checkbox0.prop('checked')).toBe(true);

    const checkbox1 = component.find('Checkbox').at(1);
    expect(checkbox1.prop('checked')).toBe(false);
    expect(checkbox1.prop('color')).toBe('secondary');

    const checkbox2 = component.find('Checkbox').at(2);
    expect(checkbox2.prop('indeterminate')).toBe(true);

    const checkbox3 = component.find('Checkbox').at(3);
    expect(checkbox3.prop('disabled')).toBe(true);

    checkbox0.props().onClick({ preventDefault: () => {} });
    checkbox1.props().onClick({ preventDefault: () => {} });
    checkbox2.props().onClick({ preventDefault: () => {} });
    expect(mockFunc.mock.calls.length).toBe(3);
    component.unmount();
  });
});
