import { storiesOf } from '@storybook/react';
import React from 'react';
import Icon from './index';
import '../../design/logos.svg'

storiesOf('Components|Icon', module)
  .add('Default', () => {
    return <Icon name="logos_default" />
  })
