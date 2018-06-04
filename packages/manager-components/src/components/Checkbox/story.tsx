import { storiesOf } from '@storybook/react';
import React from 'react';
import Checkbox from './index';

storiesOf('Components|Checkbox', module)
  .add('Default', () => {
    return (
      <Checkbox
        name={'Default text'}
        value={'Default text'}
        text={'Default text'}
      />
    );
  })
  .add('Disabled', () => {
    return (
      <Checkbox
        name={'Default text'}
        value={'Default text'}
        text={'Default text'}
        disabled={true}
      />
    );
  })
  .add('Checked', () => {
    return (
      <Checkbox
        name={'Default text'}
        value={'Default text'}
        text={'Default text'}
        defaultChecked={true}
      />
    );
  });
