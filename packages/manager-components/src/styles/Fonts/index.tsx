import React from 'react';
import fonts from '../fonts.js';

import styles from './styles.css';

const FontSizes = ({ children }) => (
  <div className={styles.fonts}>
    {
      Object.keys(fonts.sizes).map((key, index) =>
        <div key={index} className={styles.fonts__row}>
          <div className={styles.fonts__col} style={{ fontSize: fonts.sizes[key] }}>{key}</div>
          <div className={styles.fonts__col} style={{ fontSize: fonts.sizes[key] }}>{fonts.sizes[key]}</div>
        </div>
      )
    }
  </div>
);

const FontFamilies = ({ children }) => (
  <div className={styles.fonts}>
    {
      Object.keys(fonts.families).map((key, index) =>
        <div key={index} className={styles.fonts__row}>
          <div className={styles.fonts__col}>{key}</div>
          <div className={styles.fonts__col} style={{ fontFamily: fonts.families[key] }}>{fonts.families[key]}</div>
        </div>
      )
    }
  </div>
);

const FontWeights = ({ children }) => (
  <div className={styles.fonts}>
    {
      Object.keys(fonts.weights).map((key, index) =>
        <div key={index} className={styles.fonts__row}>
          <div className={styles.fonts__col} style={{ fontWeight: fonts.weights[key] }}>{key}</div>
          <div className={styles.fonts__col} style={{ fontWeight: fonts.weights[key] }}>{fonts.weights[key]}</div>
        </div>
      )
    }
  </div>
);

export {
  FontWeights,
  FontFamilies,
  FontSizes
}
