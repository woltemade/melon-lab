import { storiesOf } from '@storybook/react';
import React from 'react';
import RadioButton from './index';

storiesOf('Components|Radio Button', module)
  .add('Default', () => {
    return (
      <RadioButton
        name={'Default text'}
        value={'Default text'}
        text={'Default text'}
      />
    );
  })
  .add('Disabled', () => {
    return (
      <RadioButton
        name={'Default text'}
        value={'Default text'}
        text={'Default text'}
        disabled={true}
      />
    );
  })
  .add('Checked', () => {
    return (
      <RadioButton
        name={'Default text'}
        value={'Default text'}
        text={'Default text'}
        defaultChecked={true}
      />
    );
  });
