import { storiesOf } from '@storybook/react';
import React from 'react';
import Dropdown from './index';

storiesOf('Components|Dropdown', module)
  .add('Default', () => {
    return <Dropdown />;
  })
