import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { SchemaLink } from 'apollo-link-schema';
import { createWebWorkerLink } from 'apollo-link-webworker';
import { context } from '@melonproject/graphql-schema';
import WebWorker from './graphql/worker';
import withApollo from 'next-with-apollo';
import schema from './graphql/schema';

export default withApollo({
  link: {
    http: ({ headers }) => {
      // TODO: Add environment variable based condition.
      // return new HttpLink({
      //   uri: 'http://localhost:4000',
      //   headers,
      // }),

      return new SchemaLink({
        schema,
        context,
      });
    },
    ws: () => {
      // TODO: Add environment variable based condition.
      // return new WebSocketLink({
      //   uri: 'ws://localhost:4000',
      //   reconnect: true,
      // }),

      return createWebWorkerLink({
        worker: new WebWorker(),
      });
    },
  },
  client: ({ link }) => ({
    link,
    cache: new InMemoryCache(),
  }),
});
