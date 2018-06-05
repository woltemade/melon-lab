import React from 'react';
import Icons from '../../components/Icon';

import '../logos.svg';
import styles from './styles.css';

const Logos = props => {
  return (
    <div className={styles.logos}>
      <div className={styles.logos__el}>
        <span className={styles.logos__name}>{props.name}</span>
        <Icons
          name={`logos_${props.name}`}
          height={props.height}
          width={props.width}
        />
      </div>
    </div>
  );
};

const LogoDefault = () => <Logos name="default" width="50" />;
const LogoWithText = () => <Logos name="with-text" width="200" />;

export { LogoDefault, LogoWithText };
