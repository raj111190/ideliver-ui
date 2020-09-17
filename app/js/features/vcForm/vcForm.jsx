/* eslint-disable import/extensions */
import React, { useEffect, useRef, useState } from 'react';
import { OrderedMap } from 'immutable';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import cx from 'classnames';
import { get, flatten } from 'lodash';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import VcSlider from '../../components/vcSlider/vcSlider';
import VcTextField from '../../components/vcTextField/vcTextField';
import VcDateTime, {
  longDatetimeFormatWithT,
} from '../../components/vcDateTime/vcDateTime';
import VcGenericSwitch from '../../components/vcGenericSwitch/vcGenericSwitch';
import VcDropDown from '../../components/vcDropDown/vcDropDown';
import VcDropDownSet from '../../components/vcDropDownSet/vcDropDownSet';
import VcCheckBoxGroup from '../../components/vcCheckBoxGroup/vcCheckBoxGroup';
import VcFieldsSet from '../../components/vcFieldsSet/vcFieldsSet';
import VcButton from '../../components/vcButton/vcButton';
import VcSelectOptions from '../../components/vcSelectOptions/vcSelectOptions';
import VcTaskWithDismiss from '../../components/vcTaskWithDismiss/vcTaskWithDismiss';
import VcSelectWithDismiss from '../../components/vcSelectWithDismiss/vcSelectWithDismiss';
import VcToggleWithDismiss from '../../components/vcToggleWithDismiss/vcToggleWithDismiss';
import VcMessage from '../../components/vcMessage/vcMessage';
import styles from './vcForm.scss';
import messages from '../../intl/messages';

import VcGridRow from '../../components/vcGrid/vcGridRow/vcGridRow';
import { concept, managementPlanForms, encounterType, form } from '../../uuid';
import {
  shouldFieldBeShown,
  isDerived,
  getDerivedValue,
  defaultFormNameSet,
  redirectToNextForm,
  covidValidationForTemperature,
} from './vcFormHelpers';

import { withRouter } from 'react-router-dom';

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const VcForm = props => {
  const [count, setCount] = useState(false);

  useEffect(() => {
    if (props.formId) {
      props.selectFormResource(props.formId, props.formIndex);
    }
  }, [props.formId, props.formIndex]);
  const prevAmount = usePrevious(props.submittingForm);
  const valueReference =
    props.formResourceData.results && props.formResourceData.results.length
      ? JSON.parse(props.formResourceData.results[0].valueReference)
      : '';
  useEffect(() => {
    if (
      prevAmount === true &&
      props.submittingForm === false &&
      get(props, ['data', 'invalidFormFields'], []).length === 0
    ) {
      props.onSuccess();
      if (count) {
        let nextFormId =
          valueReference.saveButtons.length === 2
            ? valueReference.saveButtons[1].saveAndContinue.nextFormUuid
            : '';
        let nextFormIndex = undefined;
        if (nextFormId) {
          switch (nextFormId) {
            case form.PNC_FORM_UUID:
              nextFormIndex = 0;
              break;
            default:
              nextFormId = nextFormId;
              nextFormIndex = undefined;
          }

          redirectToNextForm(nextFormId, props, nextFormIndex);
          window.location.reload(true);
        }
      }
    }
  }, [props.submittingForm, count]);

  const saveAndContinue = (encounterTypeId, nextFormId) => {
    setCount(true);
    props.onSubmit(encounterTypeId);
  };

  const getStyle = (name, compProps) =>
    cx(compProps.className, {
      [styles.textField]:
        name === 'VcTextField' && compProps && compProps.multiline !== true,
      [styles.textArea]:
        name === 'VcTextField' && compProps && compProps.multiline === true,
      [styles.dateTime]: name === 'VcDateTime',
      [styles.dropDown]: name === 'VcDropDown',
      [styles.genericSwitch]: name === 'VcGenericSwitch',
      [styles.slider]: name === 'VcSlider',
      [styles.checkboxGroup]: name === 'VcCheckBoxGroup',
      [styles.fieldsSet]: name === 'VcFieldsSet',
      [styles.dropDownSet]: name === 'VcDropDownSet',
    });

  const fieldComponents = {
    VcTextField,
    VcDateTime,
    VcDropDown,
    VcGenericSwitch,
    VcSlider,
    VcCheckBoxGroup,
    VcFieldsSet,
    VcDropDownSet,
    VcTaskWithDismiss,
    VcSelectWithDismiss,
    VcSelectOptions,
    VcMessage,
    VcToggleWithDismiss,
  };

  const fieldToFormFieldMap = get(props, ['metadata', 'fieldToFormFields'], {});

  const formFieldsMap = props.metadata
    ? Object.assign([], props.metadata.formFields)
        .sort((a, b) => a.fieldNumber - b.fieldNumber)
        .reduce((sum, formField) => {
          if (!formField.parent) {
            sum = sum.set(formField.uuid, formField);
          } else if (sum.get(formField.parent.uuid).children) {
            sum.get(formField.parent.uuid).children.push(formField);
          } else {
            sum.get(formField.parent.uuid).children = [formField];
          }
          return sum;
        }, OrderedMap())
    : undefined;

  // Array of formFieldUuids that have to be shown
  const shownFields =
    props.data && Object.values(managementPlanForms).indexOf(props.uuid) > -1
      ? Object.keys(props.data).reduce((sum, questionFormFieldUuid) => {
          let answer;
          if (
            props.data[questionFormFieldUuid].value !== undefined &&
            props.data[questionFormFieldUuid].value !== null
          ) {
            if (props.data[questionFormFieldUuid].value.uuid) {
              answer = props.data[questionFormFieldUuid].value.uuid;
            } else {
              answer =
                props.data[questionFormFieldUuid].value === true
                  ? concept.true
                  : props.data[questionFormFieldUuid].value === false
                  ? concept.false
                  : props.data[questionFormFieldUuid].value;
            }
            const description = formFieldsMap.get(questionFormFieldUuid)
              ? JSON.parse(
                  formFieldsMap.get(questionFormFieldUuid).field.description
                )
              : {};
            const fieldsToShow = get(description, ['flowConfig', answer], []);
            sum.push(...fieldsToShow);
          }
          return sum;
        }, [])
      : [];

  const fieldsHideMap = {};
  // Set of formFieldUuids of questions that have to be hidden
  const hiddenFields =
    props.metadata &&
    Object.values(managementPlanForms).indexOf(props.uuid) > -1
      ? props.metadata.formFields.reduce((sum, formField) => {
          const description = JSON.parse(formField.field.description);
          const hidden = [];

          if (description.flowConfig) {
            Object.keys(description.flowConfig).forEach(key => {
              hidden.push(...description.flowConfig[key]);
              fieldsHideMap[formField.field.uuid] =
                fieldsHideMap[formField.field.uuid] || {};
              fieldsHideMap[formField.field.uuid][key] =
                description.flowConfig[key];
            });
          }
          hidden.forEach(item => {
            if (shownFields.indexOf(item) < 0) {
              sum.add(item);
            }
          });
          return sum;
        }, new Set())
      : new Set();

  const getExtraFieldsToHide = (fieldUuid, fieldsMap, fieldAnswer) => {
    let fAnswer;
    const hasFieldAnswer =
      fieldAnswer !== undefined && fieldAnswer !== '' && fieldAnswer !== null;
    if (hasFieldAnswer) {
      fAnswer =
        fieldAnswer.uuid || fieldAnswer === true
          ? concept.true
          : fieldAnswer === false
          ? concept.false
          : fieldAnswer;
    }
    if (!fieldsMap[fieldUuid]) {
      return hasFieldAnswer ? [] : [fieldUuid];
    }
    const result = flatten([
      hasFieldAnswer ? [] : fieldUuid,
      ...Object.keys(fieldsMap[fieldUuid]).reduce((sum, answer) => {
        if (!fAnswer || fAnswer !== answer) {
          fieldsMap[fieldUuid][answer].forEach(item => {
            if (sum.indexOf(item) < 0) {
              flatten(getExtraFieldsToHide(item, fieldsMap)).forEach(i => {
                if (sum.indexOf(i) < 0) {
                  sum.push(i);
                }
              });
            }
          });
        }
        return sum;
      }, []),
    ]);
    return result;
  };

  const handleToggle = FFUuid => {
    const formMetadata = props.data[concept.FORM_METADATA]
      ? JSON.parse(props.data[concept.FORM_METADATA].value)
      : { disabledFormFields: [] };
    const index = formMetadata.disabledFormFields.indexOf(FFUuid);
    if (index === -1) {
      formMetadata.disabledFormFields = formMetadata.disabledFormFields.concat([
        FFUuid,
      ]);
    } else {
      formMetadata.disabledFormFields.splice(index, 1);
    }
    const data = JSON.stringify(formMetadata);
    props.onChange(concept.FORM_METADATA, { value: data });
  };

  const generateFields = () => {
    return Object.values(formFieldsMap.toJS()).map(formField => {
      const componentConfig = JSON.parse(formField.field.description);
      if (!componentConfig) {
        return null;
      }
      const Component = fieldComponents[componentConfig.name];

      const answersMap = {};
      if (formField.field.concept) {
        if (formField.field.concept.answers) {
          formField.field.concept.answers.forEach(ans => {
            answersMap[ans.display] = { uuid: ans.uuid, display: ans.display };
          });
        } else if (
          formField.field.concept.set &&
          formField.field.concept.setMembers
        ) {
          formField.field.concept.setMembers.forEach(ans => {
            answersMap[ans.display] = { uuid: ans.uuid, display: ans.display };
          });
        }
      }
      const disablePnc =
        componentConfig.isPnc !== undefined &&
        componentConfig.isPnc.formuuid === props.metadata.uuid &&
        props.pncUrlSplit[6] - props.pncUrlSplit[5] > 1;

      return hiddenFields && hiddenFields.has(formField.field.uuid) ? null : (
        <div key={formField.uuid} className={styles.formElement}>
          <div className={styles.section}>
            <Component
              datatest={props.datatest}
              error={
                get(props, ['data', 'invalidFormFields'], []).indexOf(
                  formField.uuid
                ) > -1
              }
              onToggle={() => handleToggle(formField.uuid)}
              onCovidValidation={covidValidationForTemperature(
                props.data,
                fieldToFormFieldMap
              )}
              disabled={
                JSON.parse(
                  get(
                    props.data,
                    [concept.FORM_METADATA, 'value'],
                    '{"disabledFormFields":[]}'
                  )
                ).disabledFormFields.indexOf(formField.uuid) > -1 || disablePnc
              }
              value={
                isDerived(formField.field.description)
                  ? getDerivedValue(
                      formField.field.description,
                      props.data,
                      fieldToFormFieldMap
                    )
                  : props.data && props.data[formField.uuid]
                  ? props.data[formField.uuid].value !== undefined
                    ? props.data[formField.uuid].value !== null &&
                      props.data[formField.uuid].value.display
                      ? props.data[formField.uuid].value.display
                      : props.data[formField.uuid].value
                    : Array.isArray(props.data[formField.uuid])
                    ? props.data[formField.uuid].map(i => i.value)
                    : props.data[formField.uuid]
                  : undefined
              }
              timestamp={
                props.data && props.data[formField.uuid]
                  ? props.data[formField.uuid].obsDatetime
                  : undefined
              }
              onChange={value => {
                if (Array.isArray(value)) {
                  const compData = [];
                  value.forEach(val => {
                    compData.push(
                      answersMap[val.value] ? answersMap[val.value] : val
                    );
                  });
                  props.onChange(formField.uuid, {
                    value: compData,
                    obsDatetime: moment().format(longDatetimeFormatWithT),
                    comment: get(
                      props,
                      ['data', formField.uuid, 'comment'],
                      undefined
                    ),
                  });
                } else {
                  const compData = answersMap[value]
                    ? answersMap[value]
                    : value;
                  props.onChange(
                    formField.uuid,
                    {
                      value: compData,
                      obsDatetime: moment().format(longDatetimeFormatWithT),
                      comment: get(
                        props,
                        ['data', formField.uuid, 'comment'],
                        undefined
                      ),
                    },
                    new Set([
                      ...hiddenFields,
                      ...getExtraFieldsToHide(
                        formField.field.uuid,
                        fieldsHideMap,
                        answersMap[value] ? answersMap[value] : value
                      ),
                    ])
                  );
                }
              }}
              className={getStyle(componentConfig.name, componentConfig.props)}
              {...componentConfig.props}
              label={
                componentConfig.name === 'VcMessage' ||
                componentConfig.name === 'VcTaskWithDismiss'
                  ? formField.field.concept.description.display
                  : formField.field.name
              }
              required={
                props.metadata.requiredFormFields
                  ? !!props.metadata.requiredFormFields[formField.uuid]
                  : false
              }
              fieldConcept={
                formField.field.concept
                  ? formField.field.concept.uuid
                  : undefined
              }
              options={
                formField.field.concept
                  ? formField.field.concept.setMembers &&
                    formField.field.concept.setMembers.length > 0
                    ? formField.field.concept.setMembers
                    : formField.field.concept.answers
                  : undefined
              }
              defaultDate={componentConfig.props.defaultDate ? true : false}
            >
              {formField.children
                ? formField.children.map(childFF => {
                    const childConfig = JSON.parse(childFF.field.description);
                    const ChildComponent = fieldComponents[childConfig.name];
                    const childAnswersMap = {};
                    if (childFF.field.concept) {
                      if (childFF.field.concept.answers) {
                        childFF.field.concept.answers.forEach(ans => {
                          childAnswersMap[ans.display] = {
                            uuid: ans.uuid,
                            display: ans.display,
                          };
                        });
                      } else if (
                        childFF.field.concept.set &&
                        childFF.field.concept.setMembers
                      ) {
                        childFF.field.concept.setMembers.forEach(ans => {
                          childAnswersMap[ans.display] = {
                            uuid: ans.uuid,
                            display: ans.display,
                          };
                        });
                      }
                    }
                    if (
                      !shouldFieldBeShown(
                        childFF,
                        fieldToFormFieldMap,
                        props.data
                      )
                    ) {
                      return undefined;
                    }
                    return (
                      <ChildComponent
                        datatest={props.datatest}
                        error={
                          get(props, ['data', 'invalidFormFields'], []).indexOf(
                            childFF.uuid
                          ) > -1
                        }
                        onToggle={() => handleToggle(childFF.uuid)}
                        disabled={
                          JSON.parse(
                            get(
                              props.data,
                              [concept.FORM_METADATA, 'value'],
                              '{"disabledFormFields":[]}'
                            )
                          ).disabledFormFields.indexOf(childFF.uuid) > -1 ||
                          disablePnc
                        }
                        value={
                          isDerived(childFF.field.description)
                            ? getDerivedValue(
                                childFF.field.description,
                                props.data,
                                fieldToFormFieldMap
                              )
                            : props.data && props.data[childFF.uuid]
                            ? props.data[childFF.uuid].value !== undefined
                              ? props.data[childFF.uuid].value !== null &&
                                props.data[childFF.uuid].value.display
                                ? props.data[childFF.uuid].value.display
                                : props.data[childFF.uuid].value
                              : Array.isArray(props.data[childFF.uuid])
                              ? props.data[childFF.uuid].map(i => i.value)
                              : props.data[childFF.uuid]
                            : undefined
                        }
                        timestamp={
                          props.data && props.data[childFF.uuid]
                            ? props.data[childFF.uuid].obsDatetime
                            : undefined
                        }
                        onChange={value => {
                          let childData;
                          if (Array.isArray(value)) {
                            childData = [];
                            value.forEach(val => {
                              childData.push(
                                childAnswersMap[val.value]
                                  ? childAnswersMap[val.value]
                                  : val
                              );
                            });
                          } else {
                            childData = childAnswersMap[value]
                              ? childAnswersMap[value]
                              : value;
                          }
                          props.onChange(
                            childFF.uuid,
                            {
                              value: childData,
                              obsDatetime: moment().format(
                                longDatetimeFormatWithT
                              ),
                              comment: get(
                                props,
                                ['data', childFF.uuid, 'comment'],
                                undefined
                              ),
                            },
                            new Set([
                              ...hiddenFields,
                              ...getExtraFieldsToHide(
                                childFF.field.uuid,
                                fieldsHideMap,
                                childAnswersMap[value]
                                  ? childAnswersMap[value]
                                  : value
                              ),
                            ])
                          );
                        }}
                        className={getStyle(
                          childConfig.name,
                          childConfig.props
                        )}
                        {...childConfig.props}
                        label={
                          componentConfig.name === 'VcMessage' ||
                          componentConfig.name === 'VcTaskWithDismiss'
                            ? childFF.field.concept.description.display
                            : childFF.field.name
                        }
                        required={
                          props.metadata.requiredFormFields
                            ? !!props.metadata.requiredFormFields[childFF.uuid]
                            : false
                        }
                        key={childFF.uuid}
                        options={
                          childFF.field.concept.setMembers &&
                          childFF.field.concept.setMembers.length > 0
                            ? childFF.field.concept.setMembers
                            : childFF.field.concept.answers
                        }
                      />
                    );
                  })
                : []}
            </Component>
          </div>
          <Divider
            className={styles.divider}
            key={`${formField.uuid} divider`}
          />
        </div>
      );
    });
  };

  const handleMouseEnter = event => {
    event.currentTarget.focus();
  };
  const { formatMessage } = props.intl;
  const items =
    valueReference && valueReference.saveButtons.length
      ? valueReference.saveButtons.map(button => {
          if (button.save) {
            return (
              <VcButton
                //datatest={button.save.datatest}
                datatest={`${button.save.label}-btn`}
                color="primary"
                onMouseEnter={handleMouseEnter}
                onClick={() => {
                  props.onSubmit(props.metadata.encounterType.uuid);
                }}
                value={
                  button.save.label
                  // (props.metadata && props.metadata.encounterType.uuid) ===
                  //   encounterType.VITALS_ENCOUNTER_TYPE_UUID
                  //   ? formatMessage(messages.Save)
                  //   : formatMessage(messages.done)
                }
                disabled={props.submittingForm}
              />
            );
          } else if (button.saveAndContinue) {
            return (
              <div className={styles.buttonVertical}>
                <VcButton
                  datatest={`${button.saveAndContinue.label}-btn`}
                  color="primary"
                  onMouseEnter={handleMouseEnter}
                  onClick={() =>
                    saveAndContinue(
                      props.metadata.encounterType.uuid,
                      button.saveAndContinue.nextFormUuid
                    )
                  }
                  value={
                    button.saveAndContinue.label
                    //formatMessage(messages.SaveAndContinue)
                  }
                  disabled={props.submittingForm}
                />
              </div>
            );
          } else if (button.endVisit) {
            return (
              <div className={styles.buttonVertical}>
                <VcButton
                  datatest={`${button.endVisit.label}-btn`}
                  color="primary"
                  onMouseEnter={handleMouseEnter}
                  onClick={() => {
                    props.onSubmit(props.metadata.encounterType.uuid);
                    setTimeout(props.onEndVisit, 2000);
                  }}
                  value={
                    button.endVisit.label
                    //formatMessage(messages.SaveAndContinue)
                  }
                  disabled={props.submittingForm}
                />
              </div>
            );
          }
        })
      : '';
  return (
    <Paper
      elevation={props.onEveryChange ? 0 : 24}
      className={cx(props.className, styles.paper)}
    >
      <Modal
        open={props.submittingForm}
        BackdropProps={{ invisible: true }}
        disableAutoFocus
        children={<CircularProgress size={50} className={styles.progress} />}
      />
      {props.onEveryChange ? null : (
        <VcGridRow className={styles.header} dataTest="ideliver-form-label">
          <Typography
            className={styles.title}
            variant="h5"
            datatest={`${
              props.metadata
                ? defaultFormNameSet(props.metadata, formatMessage)
                : null
            }-form-label`}
          >
            {props.metadata
              ? defaultFormNameSet(props.metadata, formatMessage)
              : null}
          </Typography>
        </VcGridRow>
      )}
      <div className={styles.formFields}>
        {props.metadata ? generateFields() : null}
      </div>
      {props.onEveryChange ? null : (
        <VcGridRow className={styles.submitButtonContainer}>
          <div className={styles.encounterDatetime} />
          <div>
            <VcDateTime
              datatest={`encounter`}
              className={styles.encounterDatetime}
              label={formatMessage(messages.encounter)}
              value={get(props.data, ['encounterDatetime'], undefined)}
              onChange={value =>
                props.onChange(
                  'encounterDatetime',
                  moment(value).format(longDatetimeFormatWithT)
                )
              }
            />
            <div>{items}</div>
          </div>
        </VcGridRow>
      )}
    </Paper>
  );
};

VcForm.propTypes = {
  // array of alerts to be displayed
  metadata: PropTypes.any,
  // callback function to be fired on submitting the form
  onSubmit: PropTypes.func,
  /**
   * callback function to be fired on every change for now
   * it's used to save the form on every change
   * that's why if it exists we hide the "DONE" button
   */
  onEveryChange: PropTypes.func,
};

VcForm.defaultProps = {};

export default injectIntl(withRouter(VcForm));
