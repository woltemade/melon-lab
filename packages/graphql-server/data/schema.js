import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import Order from '../schemas/Order.graphql';
import Vault from '../schemas/Vault.graphql';
import Query from '../schemas/Query.graphql';

const schema = makeExecutableSchema({
  typeDefs: [Order, Vault, Query],
  resolvers,
});

export default schema;
