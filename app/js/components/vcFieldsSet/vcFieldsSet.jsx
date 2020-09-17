import React from 'react';
import { fromJS } from 'immutable';
import { get } from 'lodash';
import moment from 'moment';
import Proptypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import cx from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import PlusCircleIcon from '../svgIcon/plusCircleIcon';
import VcSlider from '../vcSlider/vcSlider';
import VcTextField from '../vcTextField/vcTextField';
import VcDateTime, {
  longDatetimeFormat,
  longDatetimeFormatWithT,
} from '../vcDateTime/vcDateTime';
import VcGenericSwitch from '../vcGenericSwitch/vcGenericSwitch';
import VcDropDown from '../vcDropDown/vcDropDown';
import VcDropDownSet from '../vcDropDownSet/vcDropDownSet';
import VcCheckBoxGroup from '../vcCheckBoxGroup/vcCheckBoxGroup';
import styles from '../../features/vcForm/vcForm.scss';
import VcGridRow from '../vcGrid/vcGridRow/vcGridRow';
import { concept } from '../../uuid';

class VcFieldsSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempValues: {
        concept: props.fieldConcept,
        display: props.label,
        groupMembers: {},
      },
    };
  }
  getStyle = (name, compProps) =>
    cx({
      [styles.textField]: name === 'VcTextField',
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

  fieldComponents = {
    VcTextField,
    VcDateTime,
    VcDropDown,
    VcGenericSwitch,
    VcSlider,
    VcCheckBoxGroup,
    VcDropDownSet,
  };

  handleAddValue = () => {
    const values = [];
    Object.assign(values, this.props.value);
    const result = this.state.tempValues;
    result.groupMembers = Object.values(result.groupMembers);
    this.setState(
      () => ({
        tempValues: {
          concept: this.props.fieldConcept,
          display: this.props.label,
          groupMembers: {},
        },
      }),
      () => {
        values.push(result);
        values.map(val => {
          if (
            this.props.label === 'Labs' &&
            (val.groupMembers.length === 0 ||
              !val.groupMembers.find(mem => mem.concept === concept.LAB_DATE))
          ) {
            val.groupMembers.push({
              concept: concept.LAB_DATE,
              value: moment()
                .format(longDatetimeFormat)
                .toString(),
            });
          }
          return val;
        });
        this.props.onChange(values);
      }
    );
  };

  handleDeleteValue = row => {
    const values = [];
    Object.assign(values, this.props.value);
    values[row.index].voided = true;
    this.props.onChange(values);
  };

  handleComponentChange = (value, answersMap, fld, opt) => {
    this.setState(prevState => {
      const temp = prevState;
      temp.tempValues.groupMembers[fld] = {
        value: answersMap[value] || value || undefined,
        concept: fld,
        display: opt.display,
        obsDatetime:
          this.props.label === 'Labs'
            ? moment(
                get(this.state, [
                  'tempValues',
                  'groupMembers',
                  get(concept, ['LAB_DATE']),
                  'value',
                ])
              ).format(longDatetimeFormatWithT)
            : moment().format(longDatetimeFormatWithT),
      };
      return temp;
    });
  };

  handleNestedChange = (value, nestedChanges, doNotAddRow, question) => {
    if (this.props.fields[nestedChanges.fld].name === 'VcDropDownSet') {
      this.setState(
        prevState => {
          const temp = prevState;
          if (temp.tempValues.groupMembers) {
            nestedChanges.dropDownSetUuids.forEach(uuid => {
              delete temp.tempValues.groupMembers[uuid];
            });
          }
          const opt = this.props.options.find(
            item => item.uuid === question.uuid
          );
          const val = {};
          val.display = question.display || question;
          val.concept = question.uuid || question;
          val.value =
            opt.answers.find(
              item => item.display === (value.display || value)
            ) || value;
          val.obsDatetime = moment().format(longDatetimeFormatWithT);

          temp.tempValues.groupMembers[val.concept] = val;
          return temp;
        },
        () => {
          if (this.props.addCurrentRow && !doNotAddRow) {
            this.handleAddValue();
          }
        }
      );
    } else {
      this.setState(
        prevState => {
          const temp = prevState;
          if (temp.tempValues.groupMembers && !doNotAddRow) {
            nestedChanges.dropDownSetUuids.forEach(uuid => {
              delete temp.tempValues.groupMembers[uuid];
            });
          }
          temp.tempValues.groupMembers[nestedChanges.selectedQuestionUuid] = {
            value: nestedChanges.dropDownSetOptions[
              nestedChanges.selectedQuestionUuid
            ]
              ? nestedChanges.dropDownSetOptions[
                  nestedChanges.selectedQuestionUuid
                ].find(item => item.display === value)
              : value || undefined,
            concept: nestedChanges.selectedQuestionUuid,
            display: nestedChanges.compValueName,
            obsDatetime:
              this.props.label === 'Labs' &&
              this.state.tempValues.groupMembers[concept.LAB_DATE]
                ? moment(
                    this.state.tempValues.groupMembers[concept.LAB_DATE].value
                  ).format(longDatetimeFormatWithT)
                : moment().format(longDatetimeFormatWithT),
          };
          return temp;
        },
        () => {
          if (this.props.addCurrentRow && !doNotAddRow) {
            this.handleAddValue();
          }
        }
      );
    }
  };

  render() {
    const valueMap = {};
    const immutableValues = fromJS(this.props.value);
    this.props.value.forEach((val, idx) => {
      const temp = immutableValues.get(idx).toJS();
      temp.index = idx;
      if (!temp.voided) {
        valueMap[idx] = temp;
        const groupMems = [];
        Object.assign(groupMems, valueMap[idx].groupMembers);
        valueMap[idx].groupMembers = {};
        groupMems.forEach(mem => {
          valueMap[idx].groupMembers[mem.concept] = mem;
        });
      }
    });
    const sortedValues =
      this.props.label === 'Labs'
        ? Object.values(valueMap).sort((a, b) =>
            moment(b.groupMembers[concept.LAB_DATE].value).diff(
              moment(a.groupMembers[concept.LAB_DATE].value)
            )
          )
        : Object.values(valueMap);

    const answersMap = {};
    this.props.options.forEach(op => {
      if (op.answers) {
        op.answers.forEach(ans => {
          answersMap[ans.display] = { uuid: ans.uuid, display: ans.display };
        });
      } else if (op.set && op.setMembers) {
        op.setMembers.forEach(ans => {
          answersMap[ans.display] = { uuid: ans.uuid, display: ans.display };
        });
      }
    });

    return (
      <div>
        <Typography variant="subheading" gutterBottom>
          {this.props.label}
        </Typography>
        {sortedValues.map(row => (
          <VcGridRow key={`intervention ${row.index}`}>
            {this.props.fields
              ? Object.keys(this.props.fields).map(fld => {
                  const Component = this.fieldComponents[
                    this.props.fields[fld].name
                  ];

                  const opt = this.props.options.find(
                    item => item.uuid === fld
                  );
                  const options =
                    opt.setMembers && opt.setMembers.length > 0
                      ? opt.setMembers
                      : opt.answers;

                  const dropDownSetOptions = {};
                  if (this.props.fields[fld].name === 'VcDropDownSet') {
                    options.forEach(obj => {
                      const tempObj = this.props.options.find(
                        item => item.uuid === obj.uuid
                      );
                      if (
                        (tempObj.setMembers && tempObj.setMembers.length > 0) ||
                        (tempObj.answers && tempObj.answers.length > 0)
                      ) {
                        dropDownSetOptions[obj.uuid] =
                          tempObj.setMembers && tempObj.setMembers.length > 0
                            ? tempObj.setMembers
                            : tempObj.answers;
                      }
                      return dropDownSetOptions;
                    });
                  }

                  const compValue = row.groupMembers[fld]
                    ? row.groupMembers[fld].value
                    : '';

                  const compValueName = compValue
                    ? compValue.display || compValue
                    : undefined;

                  const selectedQuestionUuid = options
                    ? options.find(op => op.display === compValueName)
                      ? options.find(op => op.display === compValueName).uuid
                      : undefined
                    : undefined;

                  const dropDownSetUuids = Object.keys(dropDownSetOptions);
                  dropDownSetUuids.splice(
                    dropDownSetUuids.indexOf(selectedQuestionUuid),
                    1
                  );
                  return (
                    <Component
                      key={fld}
                      allOptions={this.props.options}
                      conceptId={fld}
                      value={compValue}
                      allValues={row.groupMembers}
                      onChange={value => {
                        const result = Object.assign(this.props.value);
                        if (row.groupMembers[fld]) {
                          result[row.index].groupMembers = result[
                            row.index
                          ].groupMembers.map(field => {
                            if (field.concept === fld) {
                              return {
                                ...field,
                                value: answersMap[value] || value || undefined,
                                voided: !value,
                                obsDatetime:
                                  this.props.label === 'Labs' &&
                                  row.groupMembers[concept.LAB_DATE]
                                    ? moment(
                                        row.groupMembers[concept.LAB_DATE].value
                                      ).format(longDatetimeFormatWithT)
                                    : moment().format(longDatetimeFormatWithT),
                              };
                            } else if (
                              this.props.fields[fld].name === 'VcDropDownSet' &&
                              field.concept !== concept.LAB_DATE
                            ) {
                              return { ...field, voided: true };
                            }
                            return field;
                          });
                        } else {
                          result[row.index].groupMembers.push({
                            value: answersMap[value] || value || undefined,
                            voided: !value,
                            concept: fld,
                            obsDatetime:
                              this.props.label === 'Labs' &&
                              row.groupMembers[concept.LAB_DATE]
                                ? moment(
                                    row.groupMembers[concept.LAB_DATE].value
                                  ).format(longDatetimeFormatWithT)
                                : moment().format(longDatetimeFormatWithT),
                          });
                        }
                        this.props.onChange(result);
                      }}
                      onChangeAnswer={(value, doNotAddRow, question) => {
                        const result = Object.assign(this.props.value);
                        if (this.props.fields[fld].name === 'VcDropDownSet') {
                          const dropDownOptions = this.props.options.find(
                            item => item.uuid === question.uuid
                          );
                          const val = {};
                          val.display = question.display || question;
                          val.concept = question.uuid || question;
                          val.value =
                            dropDownOptions.answers.find(
                              item => item.display === (value.display || value)
                            ) || value;

                          if (row.groupMembers[question.uuid]) {
                            result[row.index].groupMembers = result[
                              row.index
                            ].groupMembers.map(field => {
                              if (field.concept === question.uuid) {
                                return {
                                  ...field,
                                  value: val.value || undefined,
                                  voided: !value,
                                  obsDatetime:
                                    this.props.label === 'Labs' &&
                                    row.groupMembers[concept.LAB_DATE]
                                      ? moment(
                                          row.groupMembers[concept.LAB_DATE]
                                            .value
                                        ).format(longDatetimeFormatWithT)
                                      : moment().format(
                                          longDatetimeFormatWithT
                                        ),
                                };
                              }
                              return field;
                            });
                          } else {
                            result[row.index].groupMembers.push({
                              value: val.value || undefined,
                              voided: !value,
                              concept: val.concept,
                              obsDatetime:
                                this.props.label === 'Labs' &&
                                row.groupMembers[concept.LAB_DATE]
                                  ? moment(
                                      row.groupMembers[concept.LAB_DATE].value
                                    ).format(longDatetimeFormatWithT)
                                  : moment().format(longDatetimeFormatWithT),
                            });
                          }
                        } else if (row.groupMembers[selectedQuestionUuid]) {
                          result[row.index].groupMembers = result[
                            row.index
                          ].groupMembers.map(field => {
                            if (field.concept === selectedQuestionUuid) {
                              return {
                                ...field,
                                value: dropDownSetOptions[selectedQuestionUuid]
                                  ? dropDownSetOptions[
                                      selectedQuestionUuid
                                    ].find(item => item.display === value)
                                  : value || undefined,
                                voided: !value,
                                obsDatetime:
                                  this.props.label === 'Labs' &&
                                  row.groupMembers[concept.LAB_DATE]
                                    ? moment(
                                        row.groupMembers[concept.LAB_DATE].value
                                      ).format(longDatetimeFormatWithT)
                                    : moment().format(longDatetimeFormatWithT),
                              };
                            } else if (
                              dropDownSetUuids.indexOf(field.concept) > -1
                            ) {
                              return { ...field, voided: true };
                            }
                            return field;
                          });
                        } else {
                          result[row.index].groupMembers.push({
                            value: dropDownSetOptions[selectedQuestionUuid]
                              ? dropDownSetOptions[selectedQuestionUuid].find(
                                  item => item.display === value
                                )
                              : value || undefined,
                            voided: !value,
                            concept: selectedQuestionUuid,
                            obsDatetime:
                              this.props.label === 'Labs' &&
                              row.groupMembers[concept.LAB_DATE]
                                ? moment(
                                    row.groupMembers[concept.LAB_DATE].value
                                  ).format(longDatetimeFormatWithT)
                                : moment().format(longDatetimeFormatWithT),
                          });
                        }
                        this.props.onChange(result);
                      }}
                      className={this.getStyle(
                        this.props.fields[fld].name,
                        this.props.fields[fld].props.className
                      )}
                      {...this.props.fields[fld].props}
                      label={opt.display}
                      options={options}
                    />
                  );
                })
              : null}
            {this.props.canDeleteRow ? (
              <IconButton onClick={() => this.handleDeleteValue(row)}>
                <Delete />
              </IconButton>
            ) : null}
          </VcGridRow>
        ))}
        {this.props.canAddRow || !sortedValues.length ? (
          <VcGridRow>
            {this.props.fields
              ? Object.keys(this.props.fields).map(fld => {
                  const Component = this.props.fields[fld]
                    ? this.fieldComponents[this.props.fields[fld].name]
                    : undefined;

                  const opt = this.props.options.find(
                    item => item.uuid === fld
                  );
                  const options =
                    opt.setMembers && opt.setMembers.length > 0
                      ? opt.setMembers
                      : opt.answers;

                  const dropDownSetOptions = {};
                  if (this.props.fields[fld].name === 'VcDropDownSet') {
                    options.forEach(obj => {
                      const tempObj = this.props.options.find(
                        item => item.uuid === obj.uuid
                      );
                      if (
                        (tempObj.setMembers && tempObj.setMembers.length > 0) ||
                        (tempObj.answers && tempObj.answers.length > 0)
                      ) {
                        dropDownSetOptions[obj.uuid] =
                          tempObj.setMembers && tempObj.setMembers.length > 0
                            ? tempObj.setMembers
                            : tempObj.answers;
                      }
                      return dropDownSetOptions;
                    });
                  }

                  const compValue = this.state.tempValues.groupMembers[fld]
                    ? this.state.tempValues.groupMembers[fld].value
                    : '';

                  const compValueName = compValue
                    ? compValue.display || compValue
                    : undefined;
                  const selectedQuestionUuid = options
                    ? options.find(op => op.display === compValueName)
                      ? options.find(op => op.display === compValueName).uuid
                      : undefined
                    : undefined;

                  const dropDownSetUuids = Object.keys(dropDownSetOptions);
                  dropDownSetUuids.splice(
                    dropDownSetUuids.indexOf(selectedQuestionUuid),
                    1
                  );
                  const nestedChanges = {};
                  nestedChanges.dropDownSetUuids = dropDownSetUuids;
                  nestedChanges.dropDownSetOptions = dropDownSetOptions;
                  nestedChanges.selectedQuestionUuid = selectedQuestionUuid;
                  nestedChanges.compValueName = compValueName;
                  nestedChanges.fld = fld;
                  return this.props.fields[fld] ? (
                    <Component
                      allOptions={this.props.options}
                      answersMap={answersMap}
                      key={fld}
                      conceptId={fld}
                      value={compValue}
                      allValues={this.state.tempValues.groupMembers}
                      onChange={value => {
                        this.handleComponentChange(value, answersMap, fld, opt);
                      }}
                      onChangeAnswer={(value, doNotAddRow, question) => {
                        this.handleNestedChange(
                          value,
                          nestedChanges,
                          doNotAddRow,
                          question
                        );
                      }}
                      className={this.getStyle(
                        this.props.fields[fld].name,
                        this.props.fields[fld].props.className
                      )}
                      {...this.props.fields[fld].props}
                      label={opt.display}
                      options={options}
                    />
                  ) : null;
                })
              : null}
            {this.props.canAddRow ? (
              <IconButton onClick={this.handleAddValue}>
                <PlusCircleIcon />
              </IconButton>
            ) : null}
          </VcGridRow>
        ) : null}
      </div>
    );
  }
}
VcFieldsSet.propTypes = {
  /** label of component */
  label: Proptypes.string,
  /** list of the inner fields of the component */
  options: Proptypes.array,
  /** metadata for the inner fields */
  fields: Proptypes.shape({
    name: Proptypes.string,
    props: Proptypes.object,
    validation: Proptypes.object,
  }),
  /** values for the inner fields */
  value: Proptypes.array,
  /** callback function fired onChange of the inner component */
  onChange: Proptypes.func,
  /** the concept uuid of the parent field */
  fieldConcept: Proptypes.string,
  /** used for lab results */
  addCurrentRow: Proptypes.bool,
  /** optional delete row icon */
  canDeleteRow: Proptypes.bool,
  /** optional add row icon */
  canAddRow: Proptypes.bool,
};

VcFieldsSet.defaultProps = {
  value: [],
  addCurrentRow: true,
  canAddRow: true,
  canDeleteRow: true,
};

export default VcFieldsSet;
