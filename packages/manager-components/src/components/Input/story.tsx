import { storiesOf } from '@storybook/react';
import React from 'react';
import Input from './index';

const stories = storiesOf('Components|Input', module);

stories.add('Default', () => {
  return (
    <Input />
  )
});

stories.add('With placeholder', () => {
  return (
    <Input placeholder={'Placeholder...'} />
  )
});

stories.add('Disabled', () => {
  return (
    <Input disabled={true} />
  )
});
