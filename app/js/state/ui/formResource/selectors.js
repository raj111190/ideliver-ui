import { createSelector } from 'reselect';
import { getEntities, getForms } from '../../entities/selectors';

export const getSelectedFormResourceUuid = state =>
  state.ui.formResource.get('selectedFormResource');
export const getSelectedFormResourceIndex = state =>
  state.ui.formResource.get('selectedFormResourceIndex');

export const getAllFormResourceData = state =>
  state.ui.formResource.get('formResourceData');

export const getSelectedFormResourcePath = createSelector(
  [getSelectedFormResourceUuid, getSelectedFormResourceIndex],
  (formResourceUuid, formResourceIndex) => {
    if (!formResourceUuid) return [];
    return formResourceIndex === undefined
      ? [formResourceUuid]
      : [formResourceUuid, formResourceIndex];
  }
);

export const getSelectedFormResourceData = createSelector(
  [getAllFormResourceData, getSelectedFormResourcePath],
  (formResourceData, formResourcePath) => {
    if (!formResourceData || !formResourcePath) return undefined;
    return formResourceData;
  }
);

export const getSelectedResourceForm = createSelector(
  [getForms, getSelectedFormResourceUuid],
  (forms, selectedFormResourceUuid) => {
    if (!forms || !selectedFormResourceUuid) return undefined;
    return formResource;
  }
);
