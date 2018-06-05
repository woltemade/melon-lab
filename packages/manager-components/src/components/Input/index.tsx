import React, { ChangeEventHandler, StatelessComponent } from 'react';

import styles from './styles.css';

export interface ICheckboxProps {
  disabled?: boolean;
  placeholder?: string;
  onInputChange?: ChangeEventHandler<Element>;
}

const Input: StatelessComponent<ICheckboxProps> = ({
  disabled,
  placeholder,
  onInputChange,
}) => (
  <div>
    <style jsx>{styles}</style>
    <input
      className="input"
      disabled={disabled}
      placeholder={placeholder}
      onChange={onInputChange}
    />
  </div>
);

export default Input;
