import { storiesOf } from '@storybook/react';
import React from 'react';
import Button from './index';

storiesOf('Components|Button', module).add('Default', () => {
  return (
    <Button>
      Default button
    </Button>
  )
});

storiesOf('Components|Button', module).add('Disabled', () => {
  return (
    <Button disabled>
      Disabled button
    </Button>
  )
});
