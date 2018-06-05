import React from 'react';

import './logos.svg';
import styles from './styles.css';

const Logos = props => {
  return (
    <div className={styles.logos}>
      <div className={styles.logos__el}>
        <span className={styles.logos__name}>{props.name}</span>
        <svg
          className={`logo-${props.name}`}
          height={props.height ? props.height : '100%'}
          width={props.width ? props.width : '100%'}
        >
          <use xlinkHref={`#logos_${props.name}`} />
        </svg>
      </div>
    </div>
  );
};

const LogoDefault = () => <Logos name="default" width="50" />;
const LogoWithText = () => <Logos name="with-text" width="200" />;

export { LogoDefault, LogoWithText };
