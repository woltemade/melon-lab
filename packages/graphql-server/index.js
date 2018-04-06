import { GraphQLServer, PubSub } from 'graphql-yoga';
import { typeDefs, resolvers } from '@melonproject/graphql-schema';
// ... or using `require()`
// const { GraphQLServer } = require('graphql-yoga')
// eslint-ignore

const pubSub = new PubSub();

const server = new GraphQLServer({ typeDefs, resolvers, context: { pubSub } });
server.start(() => console.log('Server is running on localhost:4000'));
