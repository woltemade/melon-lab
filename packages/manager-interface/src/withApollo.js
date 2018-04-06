import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs, resolvers } from '@melonproject/graphql-schema';
import withApollo from 'next-with-apollo';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default withApollo({
  link: {
    http: () => new SchemaLink({
      schema,
    }),
  },
  client: ({ link }) => ({
    link,
    cache: new InMemoryCache(),
  }),
});
