import getAggregatedObservable from '../../src/orderbooks/getAggregatedObservable';

const obs = getAggregatedObservable(
  // '0xbeb9ef514a379b997e0798fdcc901ee474b6d9a1', // MLN
  '0x0d8775f648430679a709e98d2b0cb6250d2887ef', // BAT
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // W-ETH
);

const sub = obs.subscribe(orderbook => {
  console.log(Date(), 'gotOrderbook', {
    length: orderbook.length,
    deltaLength: orderbook.filter(o => o.exchange === 'ETHER_DELTA').length,
    radarLength: orderbook.filter(o => o.exchange === 'RADAR_RELAY').length,
  });
});

// setTimeout(() => {
//   sub.unsubscribe();
// }, 20000);
