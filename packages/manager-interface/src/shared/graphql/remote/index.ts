import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import withApollo from 'next-with-apollo';

export default (http, ws) =>
  withApollo({
    link: {
      http: options =>
        new HttpLink({
          uri: http,
          headers: options.headers,
        }),
      ws: () =>
        new WebSocketLink({
          uri: ws,
          reconnect: true,
        }),
    },
    client: options => ({
      link: options.link,
      cache: new InMemoryCache(),
    }),
  });
