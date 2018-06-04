import React from 'react';

import styles from './styles.css';

export interface ICheckboxProps {
  disabled?: boolean;
  placeholder?: string;
}

const Input: React.StatelessComponent<ICheckboxProps> = ({
  disabled,
  placeholder,
}) => (
  <input
    className={styles.input}
    disabled={disabled}
    placeholder={placeholder}
  />
);

export default Input;
