import { storiesOf } from '@storybook/react';
import React from 'react';
import '../../design/logos.svg'
import Icon from './index';

storiesOf('Components|Icon', module)
  .add('Default', () => {
    return <Icon name="logos_default" />
  })
