import React from 'react';
import { shallowWithRouterAndIntl } from '../../enzyme-test-helpers';
import ErrorMessages from '../../../js/features/errors/errorMessages';
describe('errorMessages component', () => {
  it('should run the dispatchMainSidebarAction function', () => {
    const component = shallowWithRouterAndIntl(
      <ErrorMessages errors={['a', 'b', 'c']} />
    );

    expect(component).toBeDefined();
  });
});
