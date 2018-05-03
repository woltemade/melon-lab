import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import withApollo from 'next-with-apollo';

export default withApollo({
  link: {
    http: ({ headers }) =>
      new HttpLink({
        uri: 'http://localhost:3030',
        headers,
      }),
    ws: () =>
      new WebSocketLink({
        uri: 'ws://localhost:3030',
        reconnect: true,
      }),
  },
  client: ({ link }) => ({
    link,
    cache: new InMemoryCache(),
  }),
});
