import { GraphQLServer } from 'graphql-yoga';
import { PubSub } from 'graphql-subscriptions';
import { typeDefs, resolvers } from '@melonproject/graphql-schema';

const pubSub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubSub } });
server.start(() => console.log('Server is running on localhost:4000'));
