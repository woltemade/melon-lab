import { getParityProvider, getPrice } from '@melonproject/melon.js';
import { GraphQLScalarType, Kind } from 'graphql';

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
    price: async (parent, args, context) => {
      const environment = await getParityProvider();
      const price = await getPrice(environment, args.symbol);
      return price;
    }
  },
  Subscription: {
    price: {
      subscribe: (parent, args, context) => {
        const channel = `price:${args.symbol}`;
        setInterval(async () => {
          const environment = await getParityProvider();
          const price = await getPrice(environment, args.symbol);
          context.pubsub.publish(channel, {
            price,
          });
        }, 10000);

        return context.pubsub.asyncIterator(channel);
      },
    },
  },
};

export default resolvers;
