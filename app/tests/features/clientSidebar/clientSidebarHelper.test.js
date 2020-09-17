import {
  ShowPncFormList,
  findIndexData,
} from '../../../js/features/clientSidebar/clientSidebarHelper';
import { form, formField } from '../../../../app/js/uuid';
describe('Display PNC Form', () => {
  let formuuid = form.PNC_FORM_UUID;
  it('display Pnc Form uuid', () => {
    expect(formuuid).toBe('23b2cab3-da98-4469-b7c9-3b2e77869e1b');
  });
});

describe('PNC tests', () => {
  it('Find index from array', () => {
    let menuData = [
      {
        display: 'PNC',
        childrenMenu: [
          {
            display: 'Post Delivery ',
            status: 'COMPLETED',
            formId: 'b5f8ffd8-fbde-11e2-8ff2-fd54ab5fdb2a',
          },
          {
            display: 'PNC 1',
            status: 'COMPLETED',
            formId: '23b2cab3-da98-4469-b7c9-3b2e77869e1b',
            formIndex: 0,
          },
        ],
        id: 'pnclist',
      },
    ];
    expect(findIndexData(menuData)).toBe(0);
  });
});
