import React from 'react';
import { shallow } from 'enzyme';
import NoteIcon from '../../../js/components/svgIcon/noteIcon';

describe('NoteIcon', () => {
  it('renders without crashing', () => {
    const component = shallow(<NoteIcon />);
    expect(component).toBeDefined();
  });
});
