import gasBoost from '../../../lib/utils/ethereum/gasBoost';

describe('gasBoost', () => {
  it('boosts gas regular function', async () => {
    const mock = jest.fn(
      () => new Promise(resolve => resolve({ transactionHash: '0xBLUB' })),
    );
    mock.estimateGas = jest.fn(() => 600000);

    const receipt = await gasBoost(mock, [10, 5], {
      from: '0xADDRESS',
    });
    expect(receipt.transactionHash).toEqual('0xBLUB');
  });

  it('falls back to gas limit if too high', async () => {
    const mock = jest.fn(
      () => new Promise(resolve => resolve({ transactionHash: '0xBLUB' })),
    );
    mock.estimateGas = jest.fn(() => 6900000);

    const receipt = await gasBoost(mock, [], {
      from: '0xADDRESS',
    });
    expect(receipt.transactionHash).toEqual('0xBLUB');
    expect(mock).toHaveBeenCalledWith({
      from: '0xADDRESS',
      gas: 6972365,
    });
  });

  it('Gas estimation is already near the gasLimit', async () => {
    const mock = jest.fn(
      () => new Promise(resolve => resolve({ transactionHash: '0xBLUB' })),
    );
    mock.estimateGas = jest.fn(() => 6972365);

    const receipt = await gasBoost(mock, [], {
      from: '0xADDRESS',
    });
    expect(receipt.transactionHash).toEqual('0xBLUB');
    expect(mock).toHaveBeenCalledWith({
      from: '0xADDRESS',
      gas: 6972365,
    });
  });
});
