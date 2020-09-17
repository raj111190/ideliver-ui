import { fromJS, Map } from 'immutable';
import formReducer, {
  defaultState,
} from '../../../../js/state/ui/form/reducers';
import {
  fetchFormAction,
  fetchFormFailAction,
  fetchFormSuccessAction,
  setFormDataAction,
} from '../../../../js/state/ui/form/actions';

describe('form reducers', () => {
  it('should have an initial state', () => {
    const newState = formReducer(undefined, {});
    expect(newState).toEqual(fromJS(defaultState));
  });

  it('should set state to fetching', () => {
    let newState = formReducer(
      fromJS(defaultState),
      fetchFormAction('test', '123')
    );
    let updatedState = fromJS(defaultState).setIn(['fetching'], true);
    expect(newState).toEqual(updatedState);

    newState = formReducer(
      fromJS(defaultState),
      fetchFormSuccessAction('123', { uuid: '123' })
    );
    updatedState = fromJS(defaultState)
      .setIn(['fetching'], false)
      .setIn(['requiredFormFields', '123'], Map());
    expect(newState).toEqual(updatedState);

    newState = formReducer(
      fromJS(defaultState),
      fetchFormFailAction('fetch failed')
    );
    updatedState = fromJS(defaultState).setIn(['fetching'], false);
    expect(newState).toEqual(updatedState);
  });

  it('should mark required fields', () => {
    const form = {
      uuid: 'd2c7532c-fb01-11e2-8ff2-fd54ab5fdb2a',
      name: 'Admission (Simple)',
      retired: false,
      formFields: [
        {
          uuid: 'ee038cc4-1a53-4738-8967-aaa000000032',
          parent: null,
          field: {
            uuid: 'fbdd4887-8f3b-414b-919d-7a9b27534401',
            name: 'Admission notes',
            description:
              '{"name":"VcTextField","props":{"vType":"text","multiline":true,"maxLength":500},"validation":{}}',
            fieldType: {
              uuid: '8d5e7d7c-c2cc-11de-8d13-0010c6dffd0f',
              display: 'Concept',
            },
            concept: {
              uuid: '51a83ef4-023f-4065-b055-20a99becba42',
              display: 'Admission notes',
            },
            tableName: null,
            attributeName: null,
            defaultValue: 'Enter Notes',
            selectMultiple: false,
          },
          fieldNumber: 1,
          pageNumber: 1,
        },
      ],
    };
    let newState = formReducer(
      fromJS(defaultState),
      fetchFormSuccessAction('ee038cc4-1a53-4738-8967-aaa000000032', form)
    );
    let updatedState = fromJS(defaultState).setIn(
      ['requiredFormFields', form.uuid],
      fromJS({})
    );
    expect(newState).toEqual(updatedState);

    const desc = {
      name: 'VcTextField',
      props: { vType: 'text', multiline: true, maxLength: 500 },
      validation: { required: true, conditions: { testUuid: true } },
    };

    form.formFields[0].field.description = JSON.stringify(desc);
    newState = formReducer(
      fromJS(defaultState),
      fetchFormSuccessAction('ee038cc4-1a53-4738-8967-aaa000000032', form)
    );
    updatedState = fromJS(defaultState).setIn(
      ['requiredFormFields', form.uuid, form.formFields[0].uuid],
      fromJS(desc.validation.conditions)
    );
    expect(newState).toEqual(updatedState);
  });

  it('should set form data', () => {
    let newState = formReducer(
      fromJS(defaultState),
      setFormDataAction(['123'], true)
    );

    expect(newState.getIn(['formData', '123'])).toEqual(true);

    let newValue = { uuid: '123', value: '124', concept: '125' };
    newState = formReducer(
      fromJS(newState),
      setFormDataAction(['124'], newValue)
    );

    expect(newState.getIn(['formData', '124'])).toEqual(fromJS(newValue));

    newValue = { value: '126' };
    const expected = { uuid: '123', value: '126', concept: '125' };
    newState = formReducer(
      fromJS(newState),
      setFormDataAction(['124'], newValue)
    );
    expect(newState.getIn(['formData', '124'])).toEqual(fromJS(expected));

    const gMemberValue = {
      value: [
        {
          groupMembers: [
            {
              uuid: '126',
              value: '621',
            },
            {
              uuid: '127',
              value: '721`',
            },
          ],
        },
      ],
    };

    newState = formReducer(
      fromJS(newState),
      setFormDataAction(['125'], gMemberValue)
    );
    expect(newState.getIn(['formData', '125'])).toEqual(fromJS(gMemberValue));
  });
});
