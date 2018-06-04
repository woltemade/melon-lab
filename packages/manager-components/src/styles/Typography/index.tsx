import React from 'react';
import typography from '../typography.js';

import styles from './styles.css';

const FontSizes = ({ children }) => (
  <div className={styles.fonts}>
    {
      Object.keys(typography.fontSizes).map((key, index) =>
        <div key={index} className={styles.fonts__row}>
          <div className={styles.fonts__col} style={{ fontSize: typography.fontSizes[key] }}>{key}</div>
          <div className={styles.fonts__col} style={{ fontSize: typography.fontSizes[key] }}>{typography.fontSizes[key]}</div>
        </div>
      )
    }
  </div>
);

const FontFamilies = ({ children }) => (
  <div className={styles.fonts}>
    {
      Object.keys(typography.fontFamilies).map((key, index) =>
        <div key={index} className={styles.fonts__row}>
          <div className={styles.fonts__col}>{key}</div>
          <div className={styles.fonts__col} style={{ fontFamily: typography.fontFamilies[key] }}>{typography.fontFamilies[key]}</div>
        </div>
      )
    }
  </div>
);

const FontWeights = ({ children }) => (
  <div className={styles.fonts}>
    {
      Object.keys(typography.fontWeights).map((key, index) =>
        <div key={index} className={styles.fonts__row}>
          <div className={styles.fonts__col} style={{ fontWeight: typography.fontWeights[key] }}>{key}</div>
          <div className={styles.fonts__col} style={{ fontWeight: typography.fontWeights[key] }}>{typography.fontWeights[key]}</div>
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
