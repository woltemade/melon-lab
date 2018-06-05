import React from 'react';
import colors from '../colors.js';

import styles from './styles.css';

const ColorWrapper = props => (
  <div className='colors'>
    <style jsx>{styles}</style>
    {Object.keys(props.colors).map((key, index) => (
      <div key={index} className='colors__row'>
        <div className='colors__col'>
          <div className='colors__wrapper'>
            <div
              className='colors__color'
              style={{ backgroundColor: props.colors[key] }}
            />
            <div className='colors__colorName'>{key}</div>
            <div className='colors__colorCode'>{props.colors[key]}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const MainColors = () => <ColorWrapper colors={colors.mainColors} />;
const StatusColors = () => <ColorWrapper colors={colors.statusColors} />;
const OtherColors = () => <ColorWrapper colors={colors.otherColors} />;

export { MainColors, StatusColors, OtherColors };
