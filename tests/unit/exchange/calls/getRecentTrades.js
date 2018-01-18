import getRecentTrades from '../../../../lib/exchange/calls/getRecentTrades';

/* eslint-disable global-require */
jest.mock('truffle-contract', () => require('../../../mocks/truffle-contract'));
/* eslint-enable */

test('getRecentTrades', async () => {
  const recentTrades = await getRecentTrades('MLN-T', 'ETH-T');
  expect(recentTrades[0].type).toBe('buy');
  expect(recentTrades[0].price.toNumber()).toBe(4);
  expect(recentTrades[0].quantity.toNumber()).toBe(0.1);
  expect(recentTrades[1].type).toBe('buy');
  expect(recentTrades[1].price.toNumber()).toBe(4.5);
  expect(recentTrades[1].quantity.toNumber()).toBe(1);
});
