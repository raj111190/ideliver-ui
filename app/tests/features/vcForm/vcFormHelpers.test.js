import {
  getFormFieldUuidOrRawValue,
  getFormFieldValue,
  shouldFieldBeShown,
  getDerivedValue,
  isDerived,
  evaluateCondition,
} from '../../../js/features/vcForm/vcFormHelpers';

describe('vcFormHelper tests', () => {
  it('should return form field value', () => {
    let returnedValue = getFormFieldValue(null);
    expect(returnedValue).toBeFalsy();

    returnedValue = getFormFieldValue('abc');
    expect(returnedValue).toEqual('abc');
    returnedValue = getFormFieldValue({ value: '123' });
    expect(returnedValue).toEqual('123');
    returnedValue = getFormFieldValue({ value: false });
    expect(returnedValue).toEqual(false);
    returnedValue = getFormFieldValue({ value: true });
    expect(returnedValue).toEqual(true);
    returnedValue = getFormFieldValue([{ value: '123' }, { value: '124' }]);
    expect(returnedValue).toEqual(['123', '124']);
  });

  it('should return form field uuid or row value', () => {
    let returnedValue = getFormFieldUuidOrRawValue(null);
    expect(returnedValue).toBeFalsy();

    returnedValue = getFormFieldUuidOrRawValue('abc');
    expect(returnedValue).toEqual('abc');

    returnedValue = getFormFieldUuidOrRawValue(true);
    expect(returnedValue).toEqual(true);

    returnedValue = getFormFieldUuidOrRawValue(false);
    expect(returnedValue).toEqual(false);

    returnedValue = getFormFieldUuidOrRawValue({ uuid: '123' });
    expect(returnedValue).toEqual('123');

    returnedValue = getFormFieldUuidOrRawValue([{ uuid: '123' }, false, true]);
    expect(returnedValue).toEqual(['123', false, true]);
  });

  it('should evaluate condition', () => {
    const condition = {
      showIf: {
        field: 'c72ce931-4814-451b-b734-1a1c0a500ddd',
        operator: 'EQUALS',
        value: '572552a7-856c-419b-861b-2794bc5f279b',
      },
    };
    const field = {
      field: { description: JSON.stringify(condition) },
    };
    const fieldToFormFieldMap = {
      'c72ce931-4814-451b-b734-1a1c0a500ddd':
        '96b30d65-5991-40f2-8def-7f89f4bc8846',
      '91100748-f9d0-4165-aad1-82340b2fd8c4':
        'ffdefead-7c1d-4ad9-8e2c-c405dfdd2a55',
    };
    const formData = {
      '96b30d65-5991-40f2-8def-7f89f4bc8846': {
        value: {
          display: 'Normal',
          uuid: 'abead76e-86af-4480-9fd8-74f65c5c0494',
        },
        obsDatetime: '2019-09-05T14:46:55.000-0400',
        uuid: 'e18bbe85-bd2a-4ddf-b795-e3e8fa40290c',
      },
    };

    let result = shouldFieldBeShown(field, fieldToFormFieldMap, formData);
    expect(result).toBe(false);

    const formData2 = {
      '96b30d65-5991-40f2-8def-7f89f4bc8846': {
        value: {
          display: 'Normal',
          uuid: '572552a7-856c-419b-861b-2794bc5f279b',
        },
        obsDatetime: '2019-09-05T14:46:55.000-0400',
        uuid: 'e18bbe85-bd2a-4ddf-b795-e3e8fa40290c',
      },
    };
    result = shouldFieldBeShown(field, fieldToFormFieldMap, formData2);
    expect(result).toBe(true);

    const condition2 = {
      showIf: {
        field: 'c72ce931-4814-451b-b734-1a1c0a500ddd',
        operator: 'NOT_EQUALS',
        value: '572552a7-856c-419b-861b-2794bc5f279b',
      },
    };

    field.field.description = JSON.stringify(condition2);

    result = shouldFieldBeShown(field, fieldToFormFieldMap, formData2);
    expect(result).toBe(false);

    const condition3 = {
      showIf: {
        field: '91100748-f9d0-4165-aad1-82340b2fd8c4',
        operator: 'IN',
        value: [
          '395b8472-bb81-4aa9-8745-37a72948191a',
          '4967bbc9-c975-453c-a192-c9c9db8b5531',
        ],
      },
    };
    field.field.description = JSON.stringify(condition3);

    const formData3 = {
      'ffdefead-7c1d-4ad9-8e2c-c405dfdd2a55': {
        value: [
          {
            display: 'Other modern method',
            uuid: '4967bbc9-c975-453c-a192-c9c9db8b5531',
            voided: false,
          },
        ],
        obsDatetime: '2019-09-05T15:46:19.751-0400',
      },
    };
    result = shouldFieldBeShown(field, fieldToFormFieldMap, formData3);
    expect(result).toBe(true);

    const condition4 = {
      showIf: {
        field: '91100748-f9d0-4165-aad1-82340b2fd8c4',
        operator: 'NOT_IN',
        value: [
          '395b8472-bb81-4aa9-8745-37a72948191a',
          '4967bbc9-c975-453c-a192-c9c9db8b5531',
        ],
      },
    };
    field.field.description = JSON.stringify(condition4);

    result = shouldFieldBeShown(field, fieldToFormFieldMap, formData3);
    expect(result).toBe(false);

    field.field.description = JSON.stringify(condition3);
    result = shouldFieldBeShown(field, fieldToFormFieldMap, {});
    expect(result).toBe(false);
    const condition5 = {
      showIf: {
        field: '91100748-f9d0-4165-aad1-82340b2fd8c4',
        operator: 'NO_EXISTING_OPERATOR',
        value: [
          '395b8472-bb81-4aa9-8745-37a72948191a',
          '4967bbc9-c975-453c-a192-c9c9db8b5531',
        ],
      },
    };
    field.field.description = JSON.stringify(condition5);
    result = shouldFieldBeShown(field, fieldToFormFieldMap, {});
    expect(result).toBe(true);

    const condition6 = {
      showIf: {
        field: 'dedf7c5e-ee6e-4429-ae2b-6a9f27d1e684',
        operator: 'GREATER_THAN',
        value: '28',
      },
    };

    field.field.description = JSON.stringify(condition6);
    result = shouldFieldBeShown(field, fieldToFormFieldMap, {});
    expect(result).toBe(false);
  });

  it('should populate derived values', () => {
    const desc1 = {
      derivedFrom: {
        sum: ['654321', '123456'],
      },
    };
    const desc2 = {
      validation: {},
    };
    const fieldToFormFieldMap = {
      '654321': '96b30d65-5991-40f2-8def-7f89f4bc8846',
      '123456': 'ffdefead-7c1d-4ad9-8e2c-c405dfdd2a55',
    };
    const formData1 = {
      '96b30d65-5991-40f2-8def-7f89f4bc8846': {
        value: '3',
        obsDatetime: '2019-09-05T14:46:55.000-0400',
        uuid: 'e18bbe85-bd2a-4ddf-b795-e3e8fa40290c',
      },
      'ffdefead-7c1d-4ad9-8e2c-c405dfdd2a55': {
        value: '5',
        obsDatetime: '2019-09-05T14:46:55.000-0400',
        uuid: 'e18bbe85-bd2a-4ddf-b795-e3e8fa40290c',
      },
    };
    const formData2 = {
      '96b30d65-5991-40f2-8def-7f89f4bc8846': {
        value: '3',
        obsDatetime: '2019-09-05T14:46:55.000-0400',
        uuid: 'e18bbe85-bd2a-4ddf-b795-e3e8fa40290c',
      },
    };

    expect(isDerived(JSON.stringify(desc1))).toBe(true);
    expect(isDerived(JSON.stringify(desc2))).toBe(false);

    const sum1 = getDerivedValue(
      JSON.stringify(desc1),
      formData1,
      fieldToFormFieldMap
    );
    expect(sum1).toBe(8);
    const sum2 = getDerivedValue(
      JSON.stringify(desc1),
      formData2,
      fieldToFormFieldMap
    );
    expect(sum2).toBe(3);
    const sum3 = getDerivedValue(
      JSON.stringify(desc1),
      {},
      fieldToFormFieldMap
    );
    expect(sum3).toBe('');
  });
});
