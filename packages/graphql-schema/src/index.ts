import { GraphQLSchema } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import * as typeDefs from './schema.gql';

export interface IContext {
  pubsub: PubSub;
}

export const makeContext = (pubsub: PubSub): IContext => ({
  pubsub,
});

export const makeSchema = (): GraphQLSchema =>
  makeExecutableSchema({
    typeDefs,
    resolvers,
  });
