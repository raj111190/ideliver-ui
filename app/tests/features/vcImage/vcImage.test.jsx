import React from 'react';
import { mount } from 'enzyme';
import FileInputComponent from 'react-file-input-previews-base64';
import VcImage from '../../../js/features/vcImage/vcImage';

describe('VcImage', () => {
  let mockFunc;
  let component;
  const initialState = {
    videoSrc: '',
    displayCanvas: false,
    displayImage: true,
    videoError: false,
  };
  beforeEach(() => {
    mockFunc = jest.fn();
    component = mount(<VcImage onChange={mockFunc} />);
  });

  it('renders without crashing', () => {
    expect(component).toBeDefined();
    expect(component.state()).toEqual(initialState);
    component.unmount();
  });

  it('calculateAspectRatio works', () => {
    const fileInputComponent = component.find(FileInputComponent).getElement();
    expect(fileInputComponent).toBeDefined();
    fileInputComponent.props.callbackFunction({ base64: '2323123213,test' });
    expect(mockFunc.mock.calls.length).toBe(1);
    component.unmount();
  });
});
