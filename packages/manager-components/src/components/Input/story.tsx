import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Input from './index';

storiesOf('Components|Input', module)
  .add('Default', () => {
    return <Input onInputChange={action('changed')} />;
  })
  .add('Disabled', () => {
    return <Input disabled={true} />;
  })
  .add('With placeholder', () => {
    return <Input placeholder={'Placeholder...'} />;
  });
