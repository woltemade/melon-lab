import getOrderbook from '../../../../lib/exchange/calls/getOrderbook';
import orderbookTest from '../../../shared/exchange/calls/orderbookTest';

/* eslint-disable global-require */
jest.mock('truffle-contract', () => require('../../../mocks/truffle-contract'));
/* eslint-enable */

test('getOrderbook', async () => {
  const assetPairArray = ['MLN-T', 'ETH-T'];
  const orderbook = await getOrderbook('MLN-T', 'ETH-T');
  expect(orderbook).toHaveLength(6);
  orderbookTest(orderbook, assetPairArray);
});
