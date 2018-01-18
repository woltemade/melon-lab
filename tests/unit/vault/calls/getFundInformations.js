import getFundInformations from '../../../../lib/fund/calls/getFundInformations';

/* eslint-disable global-require */
jest.mock('truffle-contract', () => require('../../../mocks/truffle-contract'));

/* eslint-enable */

test('get vault informations', async () => {
  const result = await getFundInformations('0xVAULT');

  expect(result).toBeTruthy();
  expect(result.fundAddress).toBe('0xVAULT');
  expect(result.name).toBe('TESTFUND');
});
