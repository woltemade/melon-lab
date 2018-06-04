import React, { ChangeEventHandler, StatelessComponent } from 'react';

import styles from './styles.css';

export interface IButtonProps {
  disabled?: boolean;
  onClick?: ChangeEventHandler<Element>;
}

const Button: StatelessComponent<IButtonProps> = ({
  children,
  disabled,
  onClick,
}) => (
  <button onClick={onClick} className={styles.button} disabled={disabled}>
    {children}
  </button>
);

export default Button;
