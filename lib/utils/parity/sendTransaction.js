// @flow
import Api from '@parity/api';
import setup from '../setup';
import gasBoost from '../ethereum/gasBoost';
import constructTransactionObject from './constructTransactionObject';

const sendTransaction = async (
  contract,
  method,
  parameters,
  wallet,
  opt = {},
  from = setup.defaultAccount,
) => {
  const api = new Api(setup.provider);

  // / Prepare raw transaction
  const options = {
    from,
    to: contract.address,
    gasPrice: 20000000000,
    ...opt,
  };
  // / Estimate and adjust gas with gasBoost
  if (method === 'cancelOrder') {
    options.gas = 6700000;
  } else {
    options.gas = await gasBoost(
      contract.instance[method],
      parameters,
      options,
    );
  }

  // / Construct raw transaction object
  const rawTransaction = constructTransactionObject(
    contract,
    method,
    parameters,
    options,
  );

  // / Send raw transaction object and wait for receipt
  const transactionHash = await api._eth.sendTransaction(rawTransaction);

  await contract._pollTransactionReceipt(transactionHash);
  const rawReceipt = await api._eth.getTransactionReceipt(transactionHash);
  const decodedLogs = contract.parseEventLogs(rawReceipt.logs);
  const transactionReceipt = { ...rawReceipt, logs: decodedLogs };

  return transactionReceipt;
};

export default sendTransaction;
