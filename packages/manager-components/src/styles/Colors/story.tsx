import { storiesOf } from '@storybook/react';
import React from 'react';
import { MainColors, StatusColors } from './index';

storiesOf('Styles|Colors', module).add('Main Colors', () => <MainColors />);
storiesOf('Styles|Colors', module).add('Status Colors', () => <StatusColors />);
