import React from 'react';
import colors from '../colors.js';

import styles from './styles.css';

const ColorWrapper = (props) => (
  <div className={styles.colors}>
    {
      Object.keys(props.colors).map((key, index) =>
        <div key={index} className={styles.colors__row}>
          <div className={styles.colors__col}>
            <div className={styles.colors__wrapper}>
              <div className={styles.colors__color} style={{ backgroundColor: props.colors[key] }}></div>
              <div className={styles.colors__colorName}>{key}</div>
              <div className={styles.colors__colorCode}>{props.colors[key]}</div>
            </div>
          </div>
        </div>
      )
    }
  </div>
);

const MainColors = () => <ColorWrapper colors={colors.mainColors}/>;
const StatusColors = () => <ColorWrapper colors={colors.statusColors}/>;
const OtherColors = () => <ColorWrapper colors={colors.otherColors}/>;

export {
  MainColors,
  StatusColors,
  OtherColors
}
