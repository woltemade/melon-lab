import React, { ChangeEventHandler, StatelessComponent } from 'react';

import styles from './styles.css';

export interface IconProps {
  name?: string;
  height?: string;
  width?: string;
}

const Icon: StatelessComponent<IconProps> = ({ name, height, width }) => (
  <div>
    <style jsx>{styles}</style>
    <svg height={height ? height : '100%'} width={width ? width : '100%'}>
      <use xlinkHref={`#${name}`} />
    </svg>
  </div>
);

export default Icon;
