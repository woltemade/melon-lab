import { getAggregatedObservable } from '@melonproject/exchange-aggregator';
import * as Rx from 'rxjs';
import { getParityProvider, getPrice } from '@melonproject/melon.js';
import { GraphQLScalarType, Kind } from 'graphql';
import { $$asyncIterator } from 'iterall';

export const withUnsubscribe = (iterator, callback) => ({
  next() {
    return iterator.next();
  },
  return() {
    callback();
    return iterator.return();
  },
  throw(error) {
    return iterator.throw(error);
  },
  [$$asyncIterator]() {
    return this;
  },
});

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
    },
  },
  Subscription: {
    price: {
      resolve: (price) => price,
      subscribe: async (parent, args, context, info) => {
        const channel = `price:${args.symbol}`;
        const environment = await getParityProvider();

        const observable = Rx.Observable
          .interval(2000)
          .startWith(-1)
          .flatMap(() => {
            const price = getPrice(environment, args.symbol);
            return Rx.Observable.fromPromise(price);
          });

        const iterator = context.pubsub.asyncIterator(channel);
        const subscription = observable.subscribe((price) => {
          context.pubsub.publish(channel, price);
        }, iterator.throw, iterator.return);

        return withUnsubscribe(iterator, () => {
          subscription.unsubscribe();
        });
      },
    },
    aggregatedOrderbook: {
      resolve: (orderbook) => orderbook,
      subscribe: (parent, args, context, info) => {
        const channel = `orderbook:${args.baseTokenAddress}/${
          args.quoteTokenAddress
        }`;

        const observable = getAggregatedObservable(
          args.baseTokenAddress,
          args.quoteTokenAddress,
        );

        const iterator = context.pubsub.asyncIterator(channel);
        const subscription = observable.subscribe((orderbook) => {
          context.pubsub.publish(channel, orderbook);
        }, iterator.throw, iterator.return);

        return withUnsubscribe(iterator, () => {
          subscription.unsubscribe();
        });
      }
    },
  },
};

export default resolvers;
