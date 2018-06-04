import React from 'react';
import spacings from '../spacings.js';

import styles from './styles.css';

const Spacings = () => (
  <div className={styles.spacings}>
    {
      Object.keys(spacings).map((key, index) =>
        <div key={index} className={styles.spacings__row}>
          <div className={styles.spacings__col}>{key}</div>
          <div className={styles.spacings__col}>{spacings[key]}</div>
        </div>
      )
    }
  </div>
);

export default Spacings;
