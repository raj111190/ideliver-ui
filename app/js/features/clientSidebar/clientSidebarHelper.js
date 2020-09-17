import { form, formField } from '../../uuid';
import { getFormStatus } from '../../state/ui/form/selectors';

export const ShowPncFormList = (menus, formListData, formStatus) => {
  const pncIndex = findIndexData(menus);

  const pncDataLength =
    formListData && formListData[form.PNC_FORM_UUID]
      ? formListData[form.PNC_FORM_UUID].length
      : 0;

  const pncData =
    formListData && formListData[form.PNC_FORM_UUID]
      ? formListData[form.PNC_FORM_UUID]
      : undefined;

  const isScheduleNextAppointment = formField.PNC_SCHEDULE_NEXT_APPOINTMENT;

  const nextAppointmentDateCheck =
    pncData &&
    pncData[pncDataLength - 1] &&
    pncData[pncDataLength - 1].encounterUuid &&
    pncData[pncDataLength - 1][isScheduleNextAppointment] &&
    pncData[pncDataLength - 1][isScheduleNextAppointment].value === true
      ? pncDataLength
      : pncDataLength - 1;

  const pncChildrenLength =
    pncIndex && menus[pncIndex] && menus[pncIndex].childrenMenu
      ? menus[pncIndex].childrenMenu.length
      : 0;

  let pncMenuData = {};
  if (pncDataLength >= 1 && pncChildrenLength <= 2) {
    for (
      let pncChildIndex = 2;
      pncChildIndex <= nextAppointmentDateCheck + 1 && pncChildIndex <= 10;
      pncChildIndex++
    ) {
      let pncFormIndex = pncChildIndex;
      pncMenuData = {
        display: 'PNC ' + pncFormIndex,
        status: getFormStatus(formStatus, [
          form.PNC_FORM_UUID,
          pncChildIndex - 1,
        ]),
        formId: form.PNC_FORM_UUID,
        formIndex: pncChildIndex - 1,
      };
      menus[pncIndex].childrenMenu.push(pncMenuData);
    }
    return pncMenuData;
  }
};

export const findIndexData = menus => {
  if (menus) {
    return menus.findIndex(pncIndexId => pncIndexId.display === 'PNC')
      ? menus.findIndex(pncIndexId => pncIndexId.display === 'PNC')
      : 0;
  }
};
