import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import withApollo from 'next-with-apollo';

export default withApollo({
  link: {
    http: ({ headers }) =>
      new HttpLink({
        uri: 'https://graphql.melonport.com',
        headers,
      }),
    ws: () =>
      new WebSocketLink({
        uri: 'wss://graphql.melonport.com',
        reconnect: true,
      }),
  },
  client: ({ link }) => ({
    link,
    cache: new InMemoryCache(),
  }),
});
