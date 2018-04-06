import { GraphQLScalarType, Kind } from 'graphql';
import { GraphQLServer, PubSub } from 'graphql-yoga';
import { getParityProvider, getPrice } from '@melonproject/melon.js';
// ... or using `require()`
// const { GraphQLServer } = require('graphql-yoga')
// eslint-ignore

const pubSub = new PubSub();

const typeDefs = `
  type Query {
    hello(name: String): String!
  }

  scalar Symbol

  type Subscription {
    timer: String!
    price(symbol: Symbol!): String!
  }
`;

const resolvers = {
  Symbol: new GraphQLScalarType({
    name: 'Symbol',
    parseValue(value) {
      return value;
    },
    serialize(value) {
      return value.toString();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        if (ast.value.length > 10) {
          throw new TypeError('Literal: Symbols are shorter than 6 chars');
        } else {
          return ast.value.toString();
        }
      }
      return null;
    },
  }),
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
    price: {
      subscribe: (parent, args, context) => {
        const channel = `price:${args.symbol}`;
        setInterval(async () => {
          const environment = await getParityProvider();
          const price = await getPrice(environment, args.symbol);
          context.pubSub.publish(channel, {
            price,
          });
        }, 1000);
        return context.pubSub.asyncIterator(channel);
      },
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers, context: { pubSub } });
server.start(() => console.log('Server is running on localhost:4000'));
