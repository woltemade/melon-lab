import React from 'react';
import Button from '../src/components/Button';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Button>Default button</Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
