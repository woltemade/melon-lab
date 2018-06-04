import React from 'react';

import styles from './styles.css';

const Button = ({ children, disabled = false }) => (
  <button className={styles.button} disabled={disabled}>
    {children}
  </button>
);

export default Button;
