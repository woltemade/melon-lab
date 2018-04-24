import { getAggregatedObservable } from '@melonproject/exchange-aggregator';
import { getParityProvider, getPrice } from '@melonproject/melon.js';
import { GraphQLScalarType, Kind } from 'graphql';
import * as Rx from 'rxjs';
import { IContext } from './index';
import withUnsubscribe from './utils/withUnsubscribe';

const resolvers = {
  Symbol: new GraphQLScalarType({
    name: 'Symbol',
    parseValue: value => value,
    serialize: value => value.toString(),
    parseLiteral: ast => {
      if (ast.kind === Kind.STRING) {
        if (ast.value.length > 10) {
          throw new TypeError('Symbols have to be shorter than 6 characters.');
        } else {
          return ast.value.toString();
        }
      }

      return null;
    },
  }),
  Query: {
    price: async (parent, args, context: IContext) => {
      const environment = await getParityProvider();
      const price = await getPrice(environment, args.symbol);
      return price;
    },
  },
  Subscription: {
    price: {
      resolve: (price: number): number => price,
      subscribe: (parent, args, context: IContext) => {
        const fetchPrice = environment =>
          Rx.Observable.fromPromise(getPrice(environment, args.symbol));

        const environment$ = Rx.Observable.fromPromise(getParityProvider());
        const price$ = environment$
          .switchMap(fetchPrice)
          .repeatWhen(Rx.operators.delay(10000));

        const channel = `price:${args.symbol}`;
        const iterator = context.pubsub.asyncIterator(channel);
        const publish = value => context.pubsub.publish(channel, value);
        return withUnsubscribe(price$, iterator, publish);
      },
    },
    aggregatedOrderbook: {
      resolve: orderbook => orderbook,
      subscribe: (parent, args, context: IContext) => {
        const { baseTokenAddress, quoteTokenAddress, exchanges } = args;

        const orderbook$ = getAggregatedObservable(
          baseTokenAddress,
          quoteTokenAddress,
          exchanges,
        );

        const channel = `orderbook:${baseTokenAddress}/${quoteTokenAddress}`;
        const iterator = context.pubsub.asyncIterator(channel);
        const publish = value => context.pubsub.publish(channel, value);
        return withUnsubscribe(orderbook$, iterator, publish);
      },
    },
  },
};

export default resolvers;
