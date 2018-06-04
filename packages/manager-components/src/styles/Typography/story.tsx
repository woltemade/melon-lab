import { storiesOf } from '@storybook/react';
import React from 'react';
import { FontFamilies, FontWeights, FontSizes } from './index';

storiesOf('Styles|Typography', module).add('Families', () => <FontFamilies />);
storiesOf('Styles|Typography', module).add('Weights', () => <FontWeights />);
storiesOf('Styles|Typography', module).add('Sizes', () => <FontSizes />);
