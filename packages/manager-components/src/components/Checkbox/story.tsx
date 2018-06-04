import { storiesOf } from '@storybook/react';
import React from 'react';
import Checkbox from './index';

const stories = storiesOf('Components|Checkbox', module);

stories.add('Default', () => {
  return (
    <Checkbox
      name={'Default text'}
      value={'Default text'}
      text={'Default text'}
    />
  );
});

stories.add('Disabled', () => {
  return (
    <Checkbox
      name={'Default text'}
      value={'Default text'}
      text={'Default text'}
      disabled={true}
    />
  );
});

stories.add('Checked', () => {
  return (
    <Checkbox
      name={'Default text'}
      value={'Default text'}
      text={'Default text'}
      defaultChecked={true}
    />
  );
});
