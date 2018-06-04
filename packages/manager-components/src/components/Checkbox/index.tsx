import React from 'react';

import styles from './styles.css';

export interface ICheckboxProps {
  disabled?: boolean;
  name?: string;
  value?: string;
  text?: string;
  checked?: boolean;
}

const Checkbox: React.StatelessComponent<ICheckboxProps> = ({
  disabled,
  name,
  value,
  text,
  checked,
}) => (
  <label className={styles.checkbox}>
    {text}
    <input
      className={styles.checkbox__input}
      type="checkbox"
      name={name}
      value={value}
      checked={checked}
      disabled={disabled}
    />
    <span className={styles.checkbox__checkmark}></span>
  </label>
);

export default Checkbox;
