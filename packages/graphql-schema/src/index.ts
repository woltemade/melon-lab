import { GraphQLSchema } from 'graphql';
import resolvers from './resolvers';
import types from './types';
import { makeExecutableSchema } from 'graphql-tools';

export const makeContext = (pubsub) => ({
  pubsub,
});

export const makeSchema = (): GraphQLSchema => makeExecutableSchema({
  typeDefs: types,
  resolvers,
});
