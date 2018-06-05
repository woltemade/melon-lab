import React, { ChangeEventHandler, StatelessComponent } from 'react';

import styles from './styles.css';

export interface IIconProps {
  name?: string;
  height?: string;
  width?: string;
}

const Icon: StatelessComponent<IIconProps> = ({ name, height, width }) => (
  <div>
    <style jsx>{styles}</style>
    <svg height={height ? height : '100%'} width={width ? width : '100%'}>
      <use xlinkHref={`#${name}`} />
    </svg>
  </div>
);

export default Icon;
