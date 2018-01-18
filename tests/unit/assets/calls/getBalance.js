import contract from 'truffle-contract';
import getBalance from '../../../../lib/assets/calls/getBalance';

// eslint-disable-next-line global-require
jest.mock('truffle-contract', () => require('../../../mocks/truffle-contract'));

test('getBalance', async () => {
  const result = await getBalance('ETH-T', '0x1');
  expect(result).toBeTruthy();
  expect(result.toNumber()).toBe(10);
  expect(contract).toHaveBeenCalledTimes(1);
  expect(contract().setProvider).toHaveBeenCalledTimes(1);
  expect(contract().at).toHaveBeenCalledWith(
    '0x1a825E9bF3BdC8ef8B975F97c78b5208a947d0EC'.toLowerCase(),
  );
  expect(contract.mockInspect.instance.balanceOf).toHaveBeenCalledWith('0x1');
});
