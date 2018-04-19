import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

import * as Order from './types/Order.gql';
import * as Query from './types/Query.gql';
import * as Schema from './types/Schema.gql';
import * as Subscription from './types/Subscription.gql';
import * as Symbol from './types/Symbol.gql';

export const makeContext = pubsub => ({
  pubsub,
});

export const makeSchema = (): GraphQLSchema =>
  makeExecutableSchema({
    typeDefs: [Symbol, Order, Query, Schema, Subscription],
    resolvers,
  });
