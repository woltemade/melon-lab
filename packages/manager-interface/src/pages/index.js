import React from 'react';
import { Query } from 'react-apollo';
import withApollo from '../withApollo';
import query from './query.gql';

const Home = () => (
  <Query ssr={false} query={query} variables={{ symbol: "ETH-T-M" }}>
    {({ data }) => (
      <div>
        {data.price}
      </div>
    )}
  </Query>
);

export default withApollo(Home);
