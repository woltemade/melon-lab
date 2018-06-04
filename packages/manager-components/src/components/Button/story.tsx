import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';
import Button from './index';

storiesOf('Components|Button', module)
  .add('Default', () => {
    return <Button onClick={action('clicked')}>Default button</Button>;
  })
  .add('Disabled', () => {
    return <Button disabled={true}>Disabled button</Button>;
  });
