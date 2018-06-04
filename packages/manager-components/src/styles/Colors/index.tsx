import React from 'react';
import colors from '../colors.js';

import styles from './styles.css';

const MainColors = ({ children }) => (
  <div className={styles.colors}>
    {
      Object.keys(colors.mainColors).map((key, index) =>
        <div key={index} className={styles.colors__row}>
          <div className={styles.colors__col}>
            <div className={styles.colors__wrapper}>
              <div className={styles.colors__color} style={{ backgroundColor: colors.mainColors[key] }}></div>
              <div className={styles.colors__colorName}>{key}</div>
              <div className={styles.colors__colorCode}>{colors.mainColors[key]}</div>
            </div>
          </div>
        </div>
      )
    }
  </div>
);

const StatusColors = ({ children }) => (
  <div className={styles.colors}>
    {
      Object.keys(colors.statusColors).map((key, index) =>
        <div key={index} className={styles.colors__row}>
          <div className={styles.colors__col}>
            <div className={styles.colors__wrapper}>
              <div className={styles.colors__color} style={{ backgroundColor: colors.statusColors[key] }}></div>
              <div className={styles.colors__colorName}>{key}</div>
              <div className={styles.colors__colorCode}>{colors.statusColors[key]}</div>
            </div>
          </div>
        </div>
      )
    }
  </div>
);

export {
  MainColors,
  StatusColors
}
