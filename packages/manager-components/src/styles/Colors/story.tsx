import { storiesOf } from '@storybook/react';
import React from 'react';
import { MainColors, StatusColors, OtherColors } from './index';

const stories = storiesOf('Styles|Colors', module);

stories.add('Main Colors', () => <MainColors />);
stories.add('Status Colors', () => <StatusColors />);
stories.add('Other Colors', () => <OtherColors />);
