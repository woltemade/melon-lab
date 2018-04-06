import React from 'react';
import { Subscription } from 'react-apollo';
import withApollo from '../withApollo';
import query from './query.gql';

const Home = () => (
  <Subscription ssr={false} subscription={query} variables={{ symbol: "ETH-T-M" }}>
    {(props) => console.log(props) || (
      <div>
        {props.loading ? 'Loading price' : `Price: ${props.data && props.data.price}`}
      </div>
    )}
  </Subscription>
);

export default withApollo(Home);
