import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import Main from '../js/main';

describe('Main', () => {
  it('renders without crashing', () => {
    const component = shallow(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );
    expect(component).toBeDefined();
  });
});
