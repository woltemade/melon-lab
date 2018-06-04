import React, { ChangeEventHandler, StatelessComponent } from 'react';

import styles from './styles.css';

export interface ICheckboxProps {
  disabled?: boolean;
  name?: string;
  value?: string;
  text?: string;
  defaultChecked?: boolean;
  onInputChange?: ChangeEventHandler<Element>;
}

const Checkbox: StatelessComponent<ICheckboxProps> = ({
  disabled,
  name,
  value,
  text,
  defaultChecked,
  onInputChange,
}) => (
  <label className={styles.checkbox}>
    <input
      className={styles.checkbox__input}
      type="checkbox"
      name={name}
      value={value}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onChange={onInputChange}
    />
    <span className={styles.checkbox__checkmark} />
    <span className={styles.checkbox__text}>{text}</span>
  </label>
);

export default Checkbox;
