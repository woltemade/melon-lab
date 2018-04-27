import * as tokenInfo from '@melonproject/protocol/utils/info/tokenInfo';
import * as R from 'ramda';
import * as Rx from 'rxjs';
import { Order } from '../../index';
import formatRelayerOrderbook from './formatRelayerOrderbook';

// Isomorphic websocket implementation. Falls back to the standard browser
// protocol on the client.
import WebSocket = require('isomorphic-ws');

const debug = require('debug')('exchange-aggregator:0x');
debug.enabled = true;

interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  url: string;
  ipfsHash: string;
}

const getStemmedSymbol: (symbol: string) => string = R.compose(
  R.cond([[R.equals('ETH'), R.always('W-ETH')], [R.T, R.identity]]),
  R.nth(0) as (arg: string[]) => string,
  R.split('-'),
);

// @TODO Try to fix the type definitions.
const getTokenAddress: (symbol: string) => string = R.compose(
  R.toLower,
  R.propOr('', 'address') as (arg: TokenInfo | undefined) => string,
  R.flip(R.find)(R.prop('live', tokenInfo)) as any,
  R.propEq('symbol'),
);

const subscribeMessage = (baseTokenAddress, quoteTokenAddress) =>
  JSON.stringify({
    type: 'subscribe',
    channel: 'orderbook',
    requestId: 1,
    payload: {
      baseTokenAddress,
      quoteTokenAddress,
      snapshot: true,
      limit: 1000,
    },
  });

// @TODO: Finish this type.
interface RelayOrder {
  salt: string;
}

interface AsksAndBids {
  asks: RelayOrder[];
  bids: RelayOrder[];
}

interface SnapshotMessage {
  type: 'snapshot';
  payload: AsksAndBids;
}

interface UpdateMessage {
  type: 'update';
  payload: RelayOrder;
}

const isSnapshotMessage = R.propEq('type', 'snapshot') as (
  payload: any,
) => payload is SnapshotMessage;

const isUpdateMessage = R.propEq('type', 'update') as (
  payload: any,
) => payload is UpdateMessage;

const scanMessages: (
  carry: AsksAndBids,
  current: SnapshotMessage | UpdateMessage,
) => AsksAndBids = R.cond([
  [
    (carry: AsksAndBids, current: SnapshotMessage) => {
      return isSnapshotMessage(current);
    },
    (carry: AsksAndBids, current: SnapshotMessage) => {
      return current.payload;
    },
  ],
  [
    (carry: AsksAndBids, current: SnapshotMessage) => {
      return isUpdateMessage(current);
    },
    (carry: AsksAndBids, current: UpdateMessage) => {
      return updateAsksAndBids(carry, current.payload);
    },
  ],
  [R.T, R.identity],
]);

const updateAsksAndBids = (state: AsksAndBids, order: RelayOrder) => {
  // @TODO: Implement update logic.
  return state;
};

const getObservableRelayer = (endpoint, baseTokenSymbol, quoteTokenSymbol) => {
  const stemmedBaseTokenSymbol = getStemmedSymbol(baseTokenSymbol);
  const stemmedQuoteTokenSymbol = getStemmedSymbol(quoteTokenSymbol);
  const baseTokenAddress = getTokenAddress(stemmedBaseTokenSymbol);
  const quoteTokenAddress = getTokenAddress(stemmedQuoteTokenSymbol);

  debug('Connecting.', {
    endpoint,
    baseTokenSymbol,
    quoteTokenSymbol,
    stemmedBaseTokenSymbol,
    stemmedQuoteTokenSymbol,
    baseTokenAddress,
    quoteTokenAddress,
  });

  const open$ = new Rx.Subject();
  const socket$ = Rx.Observable.webSocket({
    url: endpoint,
    WebSocketCtor: WebSocket,
    openObserver: open$,
  });

  open$.subscribe(event => {
    const message = subscribeMessage(baseTokenAddress, quoteTokenAddress);
    socket$.next(message);
  });

  const messages$ = socket$
    // @TODO: In addition to restarting the connection when it's closed, also
    // send a ping signal if there is no activity to prevent closing the websocket
    // connection in the first place.
    .retry()
    .do(value => debug('Received message.', value))
    .filter(R.propEq('channel', 'orderbook'))
    .filter(R.anyPass([isSnapshotMessage, isUpdateMessage]) as (
      value,
    ) => value is SnapshotMessage | UpdateMessage)
    .do(value => debug('Processing snapshot or update message.', value))
    .scan<SnapshotMessage | UpdateMessage, AsksAndBids>(scanMessages, {
      bids: [],
      asks: [],
    })
    .distinctUntilChanged()
    .do(value => debug('Extracting bids and asks.', value))
    .map<AsksAndBids, Order[]>(value =>
      formatRelayerOrderbook(value.bids, value.asks),
    )
    .do(value => debug('Emitting order book.', value));

  return messages$;
};

export default getObservableRelayer;
