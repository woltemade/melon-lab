import React, { ChangeEventHandler, StatelessComponent } from 'react';

import styles from './styles.css';

export interface RadioButtonProps {
  disabled?: boolean;
  name?: string;
  value?: string;
  text?: string;
  defaultChecked?: boolean;
  onInputChange?: ChangeEventHandler<Element>;
}

const RadioButton: StatelessComponent<RadioButtonProps> = ({
  disabled,
  name,
  value,
  text,
  defaultChecked,
  onInputChange,
}) => (
  <label className='radio-button'>
    <style jsx>{styles}</style>
    <input
      className='radio-button__input'
      type="radio"
      name={name}
      value={value}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onChange={onInputChange}
    />
    <span className='radio-button__checkmark' />
    <span className='radio-button__text'>{text}</span>
  </label>
);

export default RadioButton;
