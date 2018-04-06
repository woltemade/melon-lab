import { GraphQLServer, PubSub } from 'graphql-yoga';
// ... or using `require()`
// const { GraphQLServer } = require('graphql-yoga')
// eslint-ignore

const pubSub = new PubSub();

const typeDefs = `
  type Query {
    hello(name: String): String!
  }

  type Subscription {
    timer: String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
  Subscription: {
    timer: {
      subscribe: (parent, args, context, info) => {
        const channel = 'timestamp';
        setInterval(
          () =>
            context.pubSub.publish(channel, {
              timer: Date.now(),
            }),
          1000,
        );
        return context.pubSub.asyncIterator(channel);
      },
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers, context: { pubSub } });
server.start(() => console.log('Server is running on localhost:4000'));
