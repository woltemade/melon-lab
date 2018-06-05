import React from 'react';
import Icons from '../../components/Icon';

import '../logos.svg';
import styles from './styles.css';

const Logos = props => {
  return (
    <div className='logos'>
      <style jsx>{styles}</style>
      <div className='logos__el'>
        <span className='logos__name'>{props.name}</span>
        <Icons
          name={`logos_${props.name}`}
          height={props.height}
          width={props.width}
        />
      </div>
    </div>
  );
};

const LogoDefault = () => <Logos name="default" />;
const LogoWithText = () => <Logos name="with-text" />;

export { LogoDefault, LogoWithText };
