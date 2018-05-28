import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import withApollo from 'next-with-apollo';

export default withApollo({
  link: {
    http: options =>
      new HttpLink({
        uri: process.env.GRAPHQL_REMOTE_HTTP,
        headers: options.headers,
      }),
    ws: () =>
      new WebSocketLink({
        uri: process.env.GRAPHQL_REMOTE_WS,
        reconnect: true,
      }),
  },
  client: options => ({
    link: options.link,
    cache: new InMemoryCache(),
  }),
});
