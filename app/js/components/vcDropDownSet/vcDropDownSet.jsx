import React from 'react';
import Proptypes from 'prop-types';
import { get } from 'lodash';
import VcDropDown from '../vcDropDown/vcDropDown';
import VcTextField from '../vcTextField/vcTextField';
import VcSelectOptions from '../vcSelectOptions/vcSelectOptions';
import styles from './vcDropDownSet.scss';
/**
 * This component lets the user select an option from a drop-down list
 * @param {*} props
 */

const VcDropDownSet = props => {
  const fieldComponents = {
    VcTextField,
    VcDropDown,
    VcSelectOptions,
    VcDropDownSet,
  };

  const currentOption =
    props.options && props.value
      ? props.options.find(op => op.display === props.value)
      : null;
  const componentNameByUuid = get(props, [
    'fields',
    get(props, ['value', 'uuid']),
    'name',
  ]);
  const componentNameByDisplay = get(props, [
    'fields',
    get(currentOption, ['uuid']),
    'name',
  ]);
  const Component = get(fieldComponents, [
    componentNameByUuid || componentNameByDisplay,
  ]);
  const componentProps = get(props, [
    'fields',
    get(props, ['value', 'uuid']),
    'props',
  ]);

  const nextValue =
    props.value && props.allValues ? props.allValues[props.value.uuid] : null;

  const handleChange = value => {
    const opt = props.allOptions.find(item => item.uuid === props.value.uuid);
    const tempValue =
      opt.answers.find(item => item.display === (value.display || value)) ||
      value;

    const doNotAddRow =
      props.fields[props.value.uuid].name === 'VcDropDownSet' &&
      props.fields[props.value.uuid].props.fields[tempValue.uuid];

    props.onChangeAnswer(value, doNotAddRow, props.value);
  };

  return [
    <VcDropDown
      {...props}
      onChange={props.onChange}
      value={
        props.value
          ? props.value.display
            ? props.value.display
            : props.value
          : ''
      }
      key="dropDownSetQuestion"
      className={styles.field}
    />,
    props.value && props.fields[props.value.uuid] ? (
      <Component
        allOptions={props.allOptions}
        allValues={props.allValues}
        value={nextValue ? nextValue.value : undefined}
        onChange={handleChange}
        onChangeAnswer={props.onChangeAnswer}
        className={styles.field}
        label={props.value.display || props.value}
        conceptId={props.value.uuid || props.value}
        key="dropDownSetAnswer"
        options={
          props.value && props.allOptions && props.value.uuid
            ? props.allOptions.find(
                item => item.uuid === (props.value.uuid || currentOption.uuid)
              ).answers
            : null
        }
        {...componentProps}
      />
    ) : (
      <div className={styles.field} key="dropDownSetPlaceholder" />
    ),
  ];
};

VcDropDownSet.propTypes = {
  /** list of all options and its answers */
  allOptions: Proptypes.any,
  /** values of all fields in current row */
  allValues: Proptypes.any,
  /** selected value */
  value: Proptypes.any,
  /** options for drop-down list - provided as an array */
  options: Proptypes.any,
  /** Call back function when value changes */
  onChange: Proptypes.func.isRequired,
  /** Call Back function when value changes */
  onChangeAnswer: Proptypes.func,
  /** classes for the child component */
  className: Proptypes.string,
  /** Concept Id associated with the child component */
  conceptId: Proptypes.string,
};

VcDropDownSet.defaultProps = {};

export default VcDropDownSet;
