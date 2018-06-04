import React from 'react';
import colors from '../colors.js';

import styles from './styles.css';

const Colors = ({ children }) => (
  <div className={styles.colors}>
    {
      Object.keys(colors).map((key, index) =>
        <div key={index} className={styles.colors__row}>
          <div className={styles.colors__col}>{key}</div>
          <div className={styles.colors__col}>{colors[key]}</div>
          <div className={styles.colors__col} style={{ backgroundColor: colors[key] }}></div>
        </div>
      )
    }
  </div>
);

export default Colors;
