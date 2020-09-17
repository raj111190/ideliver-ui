import React from 'react';
import { IntlProvider } from 'react-intl';
import { mountWithIntl, shallowWithIntl } from '../../enzyme-test-helpers';
import VcReadingsCard from '../../../js/components/vcReadingsCard/vcReadingsCard';
import VcButton from '../../../js/components/vcButton/vcButton';
import VcChart, { chartTypes } from '../../../js/components/vcChart/vcChart';

describe('VcReadingsCard', () => {
  // Construct a new `IntlProvider` instance by passing `props` and
  // `context` as React would, then call `getChildContext()` to get the
  // React Intl API, complete with the `format*()` functions.
  const intlProvider = new IntlProvider({ locale: 'en' }, {});
  const { intl } = intlProvider.getChildContext();

  it('renders without crashing', () => {
    const component = shallowWithIntl(
      <VcReadingsCard.WrappedComponent intl={intl} />
    );
    expect(component).toBeDefined();
  });

  it('should change state on click on the Avatar', () => {
    const component = mountWithIntl(
      <VcReadingsCard.WrappedComponent intl={intl} />
    );

    const button = component.find('VcButton').at(0);

    expect(component.state()).toEqual({ open: false });

    button.simulate('click');
    expect(component.state()).toEqual({ open: true });

    button.simulate('click');
    expect(component.state()).toEqual({ open: false });

    component.unmount();
  });

  it('should change state on click away', () => {
    const component = mountWithIntl(
      <VcReadingsCard.WrappedComponent
        intl={intl}
        funcComponent={<VcButton value="test" />}
        presentationalComponent={
          <VcChart
            type={chartTypes.FETAL_HEART_RATE}
            xDataKey={['Fetal Heart Rate']}
            yDataKey="time"
            topLabelDataKey="liquor"
            bottomLabelDataKey="moulding"
            topLabelColors={{
              I: 'mediumaquamarine',
              C: 'lightsteelblue',
              M: 'burlywood',
              B: 'lightpink',
            }}
            bottomLabelColors={{
              0: 'mediumaquamarine',
              '+': 'lightsteelblue',
              '++': 'burlywood',
              '+++': 'lightpink',
            }}
            value={[
              { time: '9:00' },
              {
                time: '10:00',
                'Fetal Heart Rate': 140,
                liquor: 'C',
                moulding: '+',
              },
              { time: '11:00', 'Fetal Heart Rate': 150 },
              { time: '12:00', 'Fetal Heart Rate': 145, irregular: true },
              {
                time: '13:00',
                'Fetal Heart Rate': 140,
                irregular: true,
                liquor: 'B',
                moulding: '++',
              },
              { time: '14:00', 'Fetal Heart Rate': 160 },
              { time: '15:00', 'Fetal Heart Rate': 180 },
              { time: '16:00', 'Fetal Heart Rate': 180 },
              { time: '17:00' },
            ]}
          />
        }
      />
    );

    const button = component.find('VcButton').at(0);

    expect(component.state()).toEqual({ open: false });

    button.simulate('click');

    const chart = component.find('VcChart').getElement();

    expect(component.state()).toEqual({ open: true });

    expect(chart).toBeDefined();

    button.simulate('click');
    expect(component.state()).toEqual({ open: false });
  });
});
