import React, { ChangeEventHandler, StatelessComponent } from 'react';

import styles from './styles.css';

export interface ButtonProps {
  disabled?: boolean;
  onClick?: ChangeEventHandler<Element>;
}

const Button: StatelessComponent<ButtonProps> = ({
  children,
  disabled,
  onClick,
}) => (
  <div>
    <style jsx>{styles}</style>
    <button onClick={onClick} className='button' disabled={disabled}>
      {children}
    </button>
  </div>
);

export default Button;
