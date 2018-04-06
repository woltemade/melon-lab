import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs, resolvers } from '@melonproject/graphql-schema';

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
