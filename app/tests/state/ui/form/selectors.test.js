import { fromJS } from 'immutable';
import {
  getFieldToFormField,
  getFormData,
  getFormFieldToConcept,
  getFormFieldToField,
  getRequiredField,
  selectFormMetadata,
  getUuidsFromUrl,
  getGeneralInfoData,
  getOBHistoryData,
  getMedicalHistoryData,
  getRiskfactors,
} from '../../../../js/state/ui/form/selectors';
import { form, formField } from '../../../../js/uuid';

describe('form selectors', () => {
  let state;
  beforeEach(() => {
    state = {
      ui: {
        form: fromJS({
          formData: {
            form1Uuid: {
              formField1Uuid: {
                uuid: 'formField1Uuid',
                value: 'abc',
              },
            },
            [form.GENERAL_INFO_FORM_UUID]: {
              formField1GeneralInfo: {
                uuid: 'formField3Uuid',
                value: 'def',
              },
            },
            [form.OB_HISTORY_FORM_UUID]: {
              [formField.EXISTING_CONDITIONS_UUID]: fromJS({
                value: [
                  {
                    uuid: 'abc_uuid',
                    display: 'abc',
                  },
                  {
                    uuid: 'cde_uuid',
                    display: 'def',
                  },
                ],
              }),
            },
          },
          requiredFormFields: {
            form1Uuid: {
              field1Uuid: [],
            },
          },
          formFieldToConcept: {
            form1Uuid: {
              formField1Uuid: 'concept1Uuid',
            },
          },
          formFieldToField: {
            form1Uuid: {
              formField1Uuid: 'field1Uuid',
            },
          },
          fieldToFormField: {
            form1Uuid: {
              field1Uuid: 'formField1Uuid',
            },
          },
        }),
      },
      entities: fromJS({
        forms: {
          form1Uuid: {},
          form2Uuid: {},
        },
      }),
    };
  });

  it('should get form data', () => {
    const formData = getFormData(state, ['form1Uuid']);
    expect(formData).toEqual(
      fromJS({
        formField1Uuid: {
          uuid: 'formField1Uuid',
          value: 'abc',
        },
      })
    );
  });

  it('should get required fields', () => {
    const requiredFields = getRequiredField(state, 'form1Uuid');
    expect(requiredFields).toEqual(
      fromJS({
        field1Uuid: [],
      })
    );
  });

  it('should get formFieldToConcept', () => {
    const formFieldToConcept = getFormFieldToConcept(state, 'form1Uuid');
    expect(formFieldToConcept).toEqual(
      fromJS({
        formField1Uuid: 'concept1Uuid',
      })
    );
  });

  it('should get formFieldToField', () => {
    const formFieldToField = getFormFieldToField(state, 'form1Uuid');
    expect(formFieldToField).toEqual(
      fromJS({
        formField1Uuid: 'field1Uuid',
      })
    );
  });

  it('should get fieldToFormField', () => {
    const formFieldToField = getFieldToFormField(state, 'form1Uuid');
    expect(formFieldToField).toEqual(
      fromJS({
        field1Uuid: 'formField1Uuid',
      })
    );
  });

  it('should select form metadata', () => {
    const formMedata = selectFormMetadata(state, 'form1Uuid');
    const expected = {
      requiredFormFields: { field1Uuid: [] },
      fieldToFormFields: { field1Uuid: 'formField1Uuid' },
    };
    expect(formMedata).toEqual(fromJS(expected));
  });

  it('should get uuids from a url', () => {
    const location = {
      pathname: 'abc/def/ghi/jkl/mno/pqr/stu/vwx/yz',
    };
    const results = getUuidsFromUrl({ location });
    const expected = {
      visitId: 'ghi',
      patientId: 'jkl',
      formId: 'mno',
      formIndex: NaN,
    };
    expect(results).toEqual(expected);
  });

  it('should select General Info data', () => {
    const formData = getGeneralInfoData(state);
    expect(formData).toEqual(
      fromJS({
        formField1GeneralInfo: {
          uuid: 'formField3Uuid',
          value: 'def',
        },
      })
    );
  });

  it('should select ob history data', () => {
    const formData = getOBHistoryData(state);
    expect(formData).toEqual(
      fromJS({
        [formField.EXISTING_CONDITIONS_UUID]: fromJS({
          value: [
            {
              uuid: 'abc_uuid',
              display: 'abc',
            },
            {
              uuid: 'cde_uuid',
              display: 'def',
            },
          ],
        }),
      })
    );
  });

  it('should select risk factors', () => {
    const formData = getRiskfactors(state);
    expect(formData).toEqual(fromJS(['abc', 'def']));
  });
});
