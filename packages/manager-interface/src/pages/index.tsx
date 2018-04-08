import Example from '@melonproject/manager-components/Example';
import React from 'react';
import { Subscription } from 'react-apollo';
import withApollo from '../withApollo';
import query from './query.gql';

const Home = () => (
  <Subscription subscription={query} variables={{ symbol: 'ETH-T-M' }}>
    {props => (
      <div>
        {props.loading
          ? 'Loading price'
          : `Price: ${props.data && props.data.price}`}

        <Example>I am a component from the component library!</Example>
      </div>
    )}
  </Subscription>
);

export default withApollo(Home);
