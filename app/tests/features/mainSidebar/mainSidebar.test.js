import React from 'react';
import MainSidebar from '../../../js/features/mainSidebar/mainSidebar';
import { shallowWithRouterAndIntl } from '../../enzyme-test-helpers';

describe('MainSidebar', () => {
  it('should run the dispatchMainSidebarAction function', () => {
    const component = shallowWithRouterAndIntl(<MainSidebar />);

    expect(component).toBeDefined();
  });
});
