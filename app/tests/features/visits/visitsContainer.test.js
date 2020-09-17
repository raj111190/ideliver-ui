import React from 'react';
import { fromJS } from 'immutable';
import { createMockStore } from 'redux-test-utils';
import { shallowWithIntl } from '../../enzyme-test-helpers';
import { REST_API_PATHNAME } from '../../../js/paths';
import VisitsContainer from '../../../js/features/visits/visitsContainer';
import Visits from '../../../js/features/visits/visits';
import { SELECT_VISIT_ACTION } from '../../../js/features/visits/actions/selectVisitAction';
import { FETCH_VISITS_ACTION } from '../../../js/features/visits/actions/fetchVisitsAction';
import {
  SELECT_FORM_ACTION,
  FETCH_FORM_ACTION,
} from '../../../js/state/ui/form/actions';
import {
  FETCH_FORM_RESOURCE_ACTION,
  SELECT_FORM_RESOURCE_ACTION,
} from '../../../js/state/ui/formResource/actions';
import { REMOVE_ENCOUNTERS_ACTION } from '../../../js/state/entities/actions';
describe('visitsContainer', () => {
  let store, component, testState;

  beforeEach(() => {
    testState = {
      Visits: fromJS({ list: [] }),
      entities: fromJS({ encounters: {} }),
    };
    store = createMockStore(testState);
    component = shallowWithIntl(<VisitsContainer store={store} />)
      .find(Visits)
      .at(0);
  });

  it('should render without throwing an error', () => {
    expect(component).toBeDefined();
  });

  it('post action should get dispatched', () => {
    component.props().dispatchFetchVisitsAction('options');
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: FETCH_VISITS_ACTION,
        url: REST_API_PATHNAME,
        options: 'options',
      },
    ]);
  });
  it('remove encounters should get dispatched', () => {
    component.props().onEncounters();
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: REMOVE_ENCOUNTERS_ACTION,
      },
    ]);
  });
  it('selectVisit action should get dispatched', () => {
    component.props().selectVisit('visitUuid', 'patientUuid');
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: SELECT_VISIT_ACTION,
        visitUuid: 'visitUuid',
        patientUuid: 'patientUuid',
      },
    ]);
  });
  it('selectForm action should get dispatched', () => {
    component.props().selectForm('formId', 'formIndex');
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: SELECT_FORM_ACTION,
        formId: 'formId',
        formIndex: 'formIndex',
      },
    ]);
  });
  it('fetchForms action should get dispatched', () => {
    component
      .props()
      .fetchForms(
        '/openmrs/ws/rest/v1/',
        '71a643f5-63e1-439f-a8a6-cb4f2bced721'
      );
    const actions = store.getActions();
    expect(actions).toStrictEqual([
      {
        type: FETCH_FORM_ACTION,
        url: '/openmrs/ws/rest/v1/',
        uuid: '71a643f5-63e1-439f-a8a6-cb4f2bced721',
      },
      {
        type: 'FETCH_FORM_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: 'a000cb34-9ec1-4344-a1c8-f692232f6edd',
      },
      {
        type: 'FETCH_FORM_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: '200115DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      },
      {
        type: 'FETCH_FORM_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: 'cabbcdd0-cb6d-4352-b2f1-20a7616ea8ca',
      },
      {
        type: 'FETCH_FORM_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: '138e073f-6c0d-4aa8-a91c-b5ec4f99715b',
      },
      {
        type: 'FETCH_FORM_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: 'cedc221c-0631-4fd1-8dbc-b430a9e69adf',
      },
      {
        type: 'FETCH_FORM_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: 'daa73843-f6ae-4fed-bff7-39a2c080b691',
      },
      {
        type: 'FETCH_FORM_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: '388a0891-3a1d-44aa-a8d9-67c5f4e26abc',
      },
      {
        type: 'FETCH_FORM_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: '7ae516ff-2f15-46e3-8ff2-8187c4ee7e3e',
      },
      {
        type: 'FETCH_FORM_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: 'd2c7532c-fb01-11e2-8ff2-fd54ab5fdb2a',
      },
      {
        type: 'FETCH_FORM_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: 'b5f8ffd8-fbde-11e2-8ff2-fd54ab5fdb2a',
      },
      {
        type: 'FETCH_FORM_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: '5c448620-4d24-447c-abe6-4541023f3b7d',
      },
      {
        type: 'FETCH_FORM_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: '2f9e4157-a6ef-461f-98ae-94df363c924d',
      },
      {
        type: 'FETCH_FORM_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: '200BADDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      },
      {
        type: 'FETCH_FORM_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: '23b2cab3-da98-4469-b7c9-3b2e77869e1b',
      },
      {
        type: 'FETCH_FORM_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: 'fef51055-2837-4470-8abd-5ee246040108',
      },
      {
        type: 'FETCH_FORM_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: 'b444eb49-3c29-4d98-8dc6-a545810b5df7',
      },
      {
        type: 'FETCH_FORM_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: '200135DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      },
    ]);
  });
  it('selectFormResource action should get dispatched', () => {
    component.props().selectFormResource('/openmrs/ws/rest/v1/', 'uuid');
    const actions = store.getActions();
    expect(actions).toStrictEqual([
      {
        type: FETCH_FORM_RESOURCE_ACTION,
        url: '/openmrs/ws/rest/v1/',
        uuid: '/openmrs/ws/rest/v1/',
      },
      {
        formResourceId: '/openmrs/ws/rest/v1/',
        formResourceIndex: 'uuid',
        type: SELECT_FORM_RESOURCE_ACTION,
      },
    ]);
  });
  it('fetchFormsResource action should get dispatched', () => {
    component.props().fetchFormsResource('/openmrs/ws/rest/v1/', 'uuid');
    const actions = store.getActions();
    expect(actions).toStrictEqual([
      {
        type: FETCH_FORM_RESOURCE_ACTION,
        url: '/openmrs/ws/rest/v1/',
        uuid: '71a643f5-63e1-439f-a8a6-cb4f2bced721',
      },
      {
        type: FETCH_FORM_RESOURCE_ACTION,
        url: '/openmrs/ws/rest/v1/',
        uuid: 'a000cb34-9ec1-4344-a1c8-f692232f6edd',
      },
      {
        type: 'FETCH_FORM_RESOURCE_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: '200115DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      },
      {
        type: 'FETCH_FORM_RESOURCE_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: 'cabbcdd0-cb6d-4352-b2f1-20a7616ea8ca',
      },
      {
        type: 'FETCH_FORM_RESOURCE_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: '138e073f-6c0d-4aa8-a91c-b5ec4f99715b',
      },
      {
        type: 'FETCH_FORM_RESOURCE_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: 'cedc221c-0631-4fd1-8dbc-b430a9e69adf',
      },
      {
        type: 'FETCH_FORM_RESOURCE_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: 'daa73843-f6ae-4fed-bff7-39a2c080b691',
      },
      {
        type: 'FETCH_FORM_RESOURCE_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: '388a0891-3a1d-44aa-a8d9-67c5f4e26abc',
      },
      {
        type: 'FETCH_FORM_RESOURCE_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: '7ae516ff-2f15-46e3-8ff2-8187c4ee7e3e',
      },
      {
        type: 'FETCH_FORM_RESOURCE_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: 'd2c7532c-fb01-11e2-8ff2-fd54ab5fdb2a',
      },
      {
        type: 'FETCH_FORM_RESOURCE_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: 'b5f8ffd8-fbde-11e2-8ff2-fd54ab5fdb2a',
      },
      {
        type: 'FETCH_FORM_RESOURCE_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: '5c448620-4d24-447c-abe6-4541023f3b7d',
      },
      {
        type: 'FETCH_FORM_RESOURCE_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: '2f9e4157-a6ef-461f-98ae-94df363c924d',
      },
      {
        type: 'FETCH_FORM_RESOURCE_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: '200BADDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      },
      {
        type: 'FETCH_FORM_RESOURCE_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: '23b2cab3-da98-4469-b7c9-3b2e77869e1b',
      },
      {
        type: 'FETCH_FORM_RESOURCE_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: 'fef51055-2837-4470-8abd-5ee246040108',
      },
      {
        type: 'FETCH_FORM_RESOURCE_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: 'b444eb49-3c29-4d98-8dc6-a545810b5df7',
      },
      {
        type: 'FETCH_FORM_RESOURCE_ACTION',
        url: '/openmrs/ws/rest/v1/',
        uuid: '200135DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      },
    ]);
  });
});
