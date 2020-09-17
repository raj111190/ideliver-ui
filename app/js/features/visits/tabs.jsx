import React from 'react';
import styles from './visits.scss';
import Proptypes from 'prop-types';

const Tabs = ({ activeTabs, labels, onClick, onLoad }) => {
  return (
    <div className={styles.filtered}>
      <ul className="tabContainer">
        <li
          onClick={onClick.bind(this, 'every')}
          className={activeTabs === 'every' ? styles.active : 'every'}
        >
          Everyone
        </li>
        <li
          onClick={onClick.bind(this, labels[0])}
          className={activeTabs === labels[0] ? styles.active : ''}
        >
          Intake
        </li>
        <li
          onClick={onClick.bind(this, labels[1])}
          className={activeTabs === labels[1] ? styles.active : ''}
        >
          Antenatal Care
        </li>
        <li
          onClick={onClick.bind(this, labels[3])}
          className={activeTabs === labels[3] ? styles.active : ''}
        >
          Labour and Delivery
        </li>
        <li
          onClick={onClick.bind(this, labels[2])}
          className={activeTabs === labels[2] ? styles.active : ''}
        >
          Postnatal Care
        </li>
      </ul>
    </div>
  );
};

Tabs.propTypes = {
  activeTabs: Proptypes.string,
  labels: Proptypes.array,
  onClick: Proptypes.func,
  onLoad: Proptypes.func,
};
export default Tabs;
