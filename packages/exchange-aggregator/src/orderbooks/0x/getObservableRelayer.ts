import { getPrices } from '@melonproject/melon.js';
import * as tokenInfo from '@melonproject/protocol/utils/info/tokenInfo';
import * as R from 'ramda';
import * as Rx from 'rxjs';
import * as WebSocket from 'websocket';
import formatNewOrder from './formatNewOrder';
import formatRelayerOrderbook from './formatRelayerOrderbook';

const getStemmedSymbol = R.compose(
  R.cond([[R.equals('ETH'), R.always('W-ETH')], [R.T, R.identity]]),
  R.nth(0),
  R.split('-'),
);

const findBySymbol = symbol => {
  const result = R.find(
    value => value.symbol === symbol,
    R.prop('live', tokenInfo),
  );

  return R.prop('address', result);
};

const getObservableRelayer = (endpoint, baseTokenSymbol, quoteTokenSymbol) => {
  const stemmedBaseTokenSymbol = getStemmedSymbol(baseTokenSymbol);
  const stemmedQuoteTokenSymbol = getStemmedSymbol(quoteTokenSymbol);

  const baseTokenAddress = findBySymbol(stemmedBaseTokenSymbol);
  const quoteTokenAddress = findBySymbol(stemmedQuoteTokenSymbol);

  return Rx.Observable.create(observer => {
    let state = [];
    let interval;
    let hoistedConnection;
    const WebSocketClient = WebSocket.client;
    const client = new WebSocketClient();

    client.on('connectFailed', error => {
      console.log(`Connect Error: ${error.toString()}`);
    });

    client.on('connect', connection => {
      hoistedConnection = connection;
      console.log('Connected to Server...');
      console.log('Endpoint ', endpoint);

      connection.on('error', error => {
        console.log(`Connect Error: ${error.toString()}`);
      });
      connection.on('close', (reason, description) => {
        console.log(`Connection closed `, reason, description);
        if (interval) client.connect(endpoint);
      });

      const observable = Rx.Observable.fromEvent(connection, 'message');

      // Within that observable we should put the logic for
      // (i) defining if an update is new order/cancel order/update order? (might not be necessary)
      // (ii) formatting the orders to our standardized order format
      observable.subscribe(message => {
        console.log(message);
        if (message.type === 'utf8') {
          const jsonResponse = JSON.parse(message.utf8Data);
          if (jsonResponse.channel === 'orderbook') {
            if (jsonResponse.type === 'snapshot') {
              if (!state.length) {
                state = formatRelayerOrderbook(
                  jsonResponse.payload.bids,
                  jsonResponse.payload.asks,
                );
                console.log(
                  'First call: Format orders and fill up state. Items:',
                  state.length,
                );
                observer.next(state);
              } else {
                state = formatRelayerOrderbook(
                  jsonResponse.payload.bids,
                  jsonResponse.payload.asks,
                );
                console.log('New snapshot', state.length);
                observer.next(state);
              }
            }
            if (jsonResponse.type === 'update') {
              const salt = jsonResponse.payload.salt;

              const orderIndex = state.findIndex(s => s.salt === salt);

              if (
                orderIndex === -1 &&
                jsonResponse.payload.expirationUnixTimestampSec >
                  Math.floor(Date.now() / 1000)
              ) {
                console.log('Found new order', jsonResponse.payload);
                const order = formatNewOrder(
                  jsonResponse.payload,
                  baseTokenAddress,
                );
                order.price = getPrices(order)[order.type];
                state = [...state, order];
              } else if (
                state[orderIndex] &&
                state[orderIndex].expirationUnixTimestampSec <
                  Math.floor(Date.now() / 1000)
              ) {
                console.log('Order expired', orderIndex, jsonResponse.payload);
                state.splice(orderIndex, 1);
              } else {
                state[orderIndex] = jsonResponse.payload;
                console.log(
                  'Updated order at index',
                  orderIndex,
                  jsonResponse.payload,
                );
              }

              observer.next(state);
            }
          }
        }
      });

      function send(message) {
        if (connection.connected) {
          connection.sendUTF(message);
        }
      }
      // subscribe with snapshot
      send(`{
          "type": "subscribe",
          "channel": "orderbook",
          "requestId": 1,
          "payload": {
              "baseTokenAddress": "${baseTokenAddress}",
              "quoteTokenAddress": "${quoteTokenAddress}",
              "snapshot": true,
              "limit": 1000
          }
      }`);

      interval = setInterval(() => connection.ping(), 1000);
    });

    client.connect(endpoint);

    return () => {
      clearInterval(interval);
      interval = undefined;
      hoistedConnection.close();
    };
  });
};

export default getObservableRelayer;
