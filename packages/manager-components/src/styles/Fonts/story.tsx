import { storiesOf } from '@storybook/react';
import React from 'react';
import { FontFamilies, FontWeights, FontSizes } from './index';

storiesOf('Styles|Fonts', module).add('Families', () => <FontFamilies />);
storiesOf('Styles|Fonts', module).add('Weights', () => <FontWeights />);
storiesOf('Styles|Fonts', module).add('Sizes', () => <FontSizes />);
