import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import LockedWallet from './LockedWallet';

storiesOf('LockedWallet', module).add(
  'Default',
  withInfo('Short info about organism')(() => <LockedWallet />),
);
