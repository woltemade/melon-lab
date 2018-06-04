import { storiesOf } from '@storybook/react';
import React from 'react';
import Button from './index';

const stories = storiesOf('Components|Button', module);

stories.add('Default', () => {
  return (
    <Button>
      Default button
    </Button>
  )
});

stories.add('Disabled', () => {
  return (
    <Button disabled={true}>
      Disabled button
    </Button>
  )
});
