import { storiesOf } from '@storybook/react';
import React from 'react';
import Input from './index';

storiesOf('Components|Input', module).add('Default', () => {
  return (
    <Input />
  )
});

storiesOf('Components|Input', module).add('With placeholder', () => {
  return (
    <Input placeholder={'Placeholder...'} />
  )
});

storiesOf('Components|Input', module).add('Disabled', () => {
  return (
    <Input disabled />
  )
});
