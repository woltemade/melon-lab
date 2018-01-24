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
  const transactionCount = await api._eth.getTransactionCount(
    setup.defaultAccount,
  );
  const options = {
    from,
    to: contract.address,
    gasPrice: 20000000000,
    nonce: transactionCount.toNumber(),
    ...opt,
  };
  // / Estimate and adjust gas with gasBoost
  if (method === 'cancelOrder') {
    options.gasLimit = 5000000;
  } else {
    options.gasLimit = await gasBoost(
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
  // / Sign transaction object with Wallet instance
  const signedTransaction = wallet.sign(rawTransaction);

  // / Send raw signed transaction and wait for receipt
  const transactionHash = await api._eth.sendRawTransaction(signedTransaction);

  await contract._pollTransactionReceipt(transactionHash);
  const rawReceipt = await api._eth.getTransactionReceipt(transactionHash);
  const decodedLogs = contract.parseEventLogs(rawReceipt.logs);
  const transactionReceipt = { ...rawReceipt, logs: decodedLogs };

  return transactionReceipt;
};

export default sendTransaction;
