import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { IntlProvider } from 'react-intl';
import VcQuestionWithDismiss from '../../../js/components/vcQuestionWithDismiss/vcQuestionWithDismiss';
import { mountWithIntl } from '../../enzyme-test-helpers';
import { Typography, Popover } from '@material-ui/core';
import VcButton from '../../../js/components/vcButton/vcButton';
import VcSelectOptions from '../../../js/components/vcSelectOptions/vcSelectOptions';

describe('VcQuestionWithDismiss', () => {
  // Construct a new `IntlProvider` instance by passing `props` and
  // `context` as React would, then call `getChildContext()` to get the
  // React Intl API, complete with the `format*()` functions.
  const intlProvider = new IntlProvider({ locale: 'en' }, {});
  const { intl } = intlProvider.getChildContext();

  let mockFunc1, mockFunc2;

  const createMockSvg = (width, height) => {
    const svg = document.createElement('svg');
    Object.assign(svg.style, {
      width: `${width}px`,
      height: `${height}px`,
    });
    // we have to mock this for jsdom.
    svg.getBoundingClientRect = () => ({
      width,
      height,
      top: 0,
      left: 0,
      right: width,
      bottom: height,
    });
    return svg;
  };
  beforeEach(() => {
    mockFunc1 = jest.fn();
    mockFunc2 = jest.fn();
  });

  it('renders without crashing', () => {
    const component = mountWithIntl(
      <VcQuestionWithDismiss.WrappedComponent
        intl={intl}
        title="What's the cause of the prolonged active phase of labout?"
        timestamp="Done at 27 March 11:45"
        onToggle={mockFunc1}
        questionComponent={
          <VcSelectOptions
            buttonsColor="default"
            selectedColor="secondary"
            options={['CPD', 'Obstructed labour', 'Malposition']}
            selectedOptions={['CPD']}
            onSelect={mockFunc2}
          />
        }
      />
    );
    expect(component).toBeDefined();

    expect(component.state()).toEqual({
      anchorEl: null,
    });

    const textEls = component.find(Typography).getElements();

    // Expect to see the two typography elements
    expect(textEls.length).toBe(2);

    const closeIcon = component.find(CloseIcon).at(0);

    const svg = createMockSvg(1, 2);

    closeIcon.props().onClick({ persist: () => {}, currentTarget: svg });

    expect(component.state()).toEqual({
      anchorEl: svg,
    });

    component.update();
    const dismissBtn = component.find(VcButton).at(4);

    expect(component.find(Typography).getElements().length).toBe(4);
    expect(component.find(VcButton).getElements().length).toBe(5);
    dismissBtn.simulate('click');
    expect(component.state()).toEqual({
      anchorEl: null,
    });
    expect(mockFunc1.mock.calls.length).toBe(1);

    closeIcon.props().onClick({ persist: () => {}, currentTarget: svg });

    expect(component.state()).toEqual({
      anchorEl: svg,
    });
    const cancelBtn = component.find(VcButton).at(3);
    cancelBtn.simulate('click');
    expect(component.state()).toEqual({
      anchorEl: null,
    });
  });

  it('renders disabled without question and timestamp', () => {
    const component = mountWithIntl(
      <VcQuestionWithDismiss.WrappedComponent
        intl={intl}
        disabled
        title="What's the cause of the prolonged active phase of labout?"
        onToggle={mockFunc1}
      />
    );
    expect(component).toBeDefined();

    expect(component.state()).toEqual({
      anchorEl: null,
    });

    const textEls = component.find(Typography).getElements();

    // Expect to see only one typography elements
    expect(textEls.length).toBe(1);
  });
});
