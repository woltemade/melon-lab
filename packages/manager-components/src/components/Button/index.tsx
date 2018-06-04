import React from 'react';

import styles from './styles.css';

export interface IButtonProps {
  disabled?: boolean;
}

const Button: React.StatelessComponent<IButtonProps> = ({
  children,
  disabled,
}) => (
  <button className={styles.button} disabled={disabled}>
    {children}
  </button>
);

export default Button;
