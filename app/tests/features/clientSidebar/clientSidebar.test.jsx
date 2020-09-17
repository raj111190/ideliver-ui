import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { form } from '../../../js/uuid';
import ClientSidebar from '../../../js/features/clientSidebar/clientSidebar';
import { mountWithRouterAndIntl } from '../../enzyme-test-helpers';

describe('ClientSidebar', () => {
  it('should render', () => {
    const component = mountWithRouterAndIntl(
      <MemoryRouter initialEntries={['/client/:id/']}>
        <ClientSidebar
          formsList={Object.values(form)}
          location={{ pathname: 'test' }}
        />
      </MemoryRouter>
    );
    expect(component).toBeDefined();
  });
});
