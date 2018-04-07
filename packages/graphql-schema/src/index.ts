import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import types from './types';

export const makeContext = pubsub => ({
  pubsub,
});

export const makeSchema = (): GraphQLSchema =>
  makeExecutableSchema({
    typeDefs: types,
    resolvers,
  });
