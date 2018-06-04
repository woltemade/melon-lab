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

const RadioButton: StatelessComponent<ICheckboxProps> = ({
  disabled,
  name,
  value,
  text,
  defaultChecked,
  onInputChange,
}) => (
  <label className={styles.radioButton}>
    {text}
    <input
      className={styles.radioButton__input}
      type="radio"
      name={name}
      value={value}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onChange={onInputChange}
    />
    <span className={styles.radioButton__checkmark} />
  </label>
);

export default RadioButton;
