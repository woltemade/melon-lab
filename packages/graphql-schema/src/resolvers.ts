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
        const channel = `price:${args.symbol}`;

        const promisePrice = environment => () =>
          Rx.Observable.fromPromise(getPrice(environment, args.symbol));

        const pollPrice = environment =>
          Rx.Observable.interval(10000)
            .startWith(-1)
            .flatMap(promisePrice(environment));

        const usingEnvironment = Rx.Observable.fromPromise(getParityProvider());
        const observable = usingEnvironment.switchMap(pollPrice);

        const iterator = context.pubsub.asyncIterator<number>(channel);
        const subscription = observable.subscribe(
          price => context.pubsub.publish(channel, price),
          iterator.throw,
          iterator.return,
        );

        return withUnsubscribe(iterator, subscription.unsubscribe);
      },
    },
    aggregatedOrderbook: {
      resolve: orderbook => orderbook,
      subscribe: (parent, args, context: IContext) => {
        const channel = `orderbook:${args.baseTokenAddress}/${
          args.quoteTokenAddress
        }`;

        const observable = getAggregatedObservable(
          args.baseTokenAddress,
          args.quoteTokenAddress,
          args.exchanges,
        );

        const iterator = context.pubsub.asyncIterator(channel);
        const subscription = observable.subscribe(
          orderbook => context.pubsub.publish(channel, orderbook),
          iterator.throw,
          iterator.return,
        );

        return withUnsubscribe(iterator, subscription.unsubscribe);
      },
    },
  },
};

export default resolvers;
