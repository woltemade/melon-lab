import React from 'react';

import styles from './styles.css';

const Input = ({ disabled, placeholder }) => (
  <input
    className={styles.input}
    disabled={disabled}
    placeholder={placeholder}
  />
);

export default Input;
