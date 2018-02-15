// @flow
import gasBoost from '../ethereum/gasBoost';
import constructTransactionObject from './constructTransactionObject';

const sendTransaction = async (
  contract,
  method,
  parameters,
  environment,
  opt = {},
  //  from = setup.defaultAccount,
) => {
  const nonce = environment.account.sign
    ? (await environment.api._eth.getTransactionCount(
        environment.account.address,
      )).toNumber()
    : undefined;

  // / Prepare raw transaction
  const options = {
    from: environment.account.address,
    to: contract.address,
    gasPrice: 20000000000,
    nonce,
    ...opt,
  };

  // / Estimate and adjust gas with gasBoost
  const gasKeyName = environment.account.sign ? 'gasLimit' : 'gas';

  if (method === 'cancelOrder') {
    options[gasKeyName] = 6700000;
  } else {
    options[gasKeyName] = await gasBoost(
      contract.instance[method],
      parameters,
      options,
      environment,
    );
  }

  // / Construct raw transaction object
  const rawTransaction = constructTransactionObject(
    contract,
    method,
    parameters,
    options,
  );

  let transactionHash;

  if (environment.account.sign) {
    // / Sign transaction object with Wallet instance
    const signedTransaction = environment.account.sign(rawTransaction);

    // / Send raw signed transaction and wait for receipt
    transactionHash = await environment.api._eth.sendRawTransaction(
      signedTransaction,
    );
  } else {
    // / Send raw transaction object and wait for receipt
    transactionHash = await environment.api._eth.sendTransaction(
      rawTransaction,
    );
  }

  await contract._pollTransactionReceipt(transactionHash);
  const rawReceipt = await environment.api._eth.getTransactionReceipt(
    transactionHash,
  );
  const decodedLogs = contract.parseEventLogs(rawReceipt.logs);
  const transactionReceipt = { ...rawReceipt, logs: decodedLogs };

  return transactionReceipt;
};

export default sendTransaction;
