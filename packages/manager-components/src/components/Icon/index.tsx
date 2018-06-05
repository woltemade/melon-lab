import React, { ChangeEventHandler, StatelessComponent } from 'react';

import styles from './styles.css';

export interface IconProps {
  name?: string;
  height?: string;
  width?: string;
}

const Icon: StatelessComponent<IconProps> = ({ name, height, width }) => (
  <svg height={height ? height : '100%'} width={width ? width : '100%'}>
    <style jsx>{styles}</style>
    <use xlinkHref={`#${name}`} />
  </svg>
);

export default Icon;
