// @flow
import BigNumber from 'bignumber.js';

import approve from '../../assets/transactions/approve';
import ensure from '../../utils/generic/ensure';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import getBalance from '../../assets/calls/getBalance';
import getPriceFeedContract from '../../pricefeeds/contracts/getPriceFeedContract';
import getFundContract from '../../fund/contracts/getFundContract';
import isInvestmentRequestPermittedAndAllowed from '../calls/isInvestmentRequestPermittedAndAllowed';
import sendTransaction from '../../utils/parity/sendTransaction';
import toProcessable from '../../assets/utils/toProcessable';
import toReadable from '../../assets/utils/toReadable';
import getAddress from '../../assets/utils/getAddress';
import type { Address } from '../../assets/schemas/Address';
import getNativeAssetSymbol from '../../version/calls/getNativeAssetSymbol';
import getQuoteAssetSymbol from '../../pricefeeds/calls/getQuoteAssetSymbol';

type Subscription = {
  numShares: BigNumber,
  timestamp: Date,
  id: number,
};

/**
 * Subscribe to fund at `fundAddress` by offering `offeredValue` and requesting
 * `numShares` and incentivice execution with `incentiveValue`
 */
const invest = async (
  environment,
  { fundAddress, numShares, offeredValue, isNativeAsset = false },
): Promise<Subscription> => {
  const who = environment.account.address;
  const fundContract = await getFundContract(environment, fundAddress);

  const symbol = isNativeAsset
    ? await getNativeAssetSymbol(environment)
    : await getQuoteAssetSymbol(environment);

  const dataFeedContract = await getPriceFeedContract(environment);
  const balance = await getBalance(environment, {
    tokenSymbol: symbol,
    ofAddress: who,
  });

  const isShutDown = await fundContract.instance.isShutDown.call();
  ensure(isShutDown === false, 'Fund is shut down');
  await isInvestmentRequestPermittedAndAllowed(environment, {
    fundContract,
    numShares,
    offeredValue,
    who,
  });

  ensure(
    balance.gte(offeredValue),
    `Insufficent ${symbol}. Need ${offeredValue.toString()} have: ${balance.toString()}`,
  );

  const hasRecentPrice = await dataFeedContract.instance.hasRecentPrice.call(
    {},
    [getAddress(symbol)],
  );
  ensure(
    hasRecentPrice,
    'Pricefeed data is not valid at the moment. Please try again later.',
  );

  await approve(environment, {
    symbol,
    spender: fundAddress,
    quantity: offeredValue,
  });

  const args = [
    toProcessable(offeredValue, symbol),
    toProcessable(numShares, symbol),
    isNativeAsset,
  ];

  const receipt = await sendTransaction(
    fundContract,
    'requestInvestment',
    args,
    environment,
  );
  const investRequestLogEntry = findEventInLog('RequestUpdated', receipt);
  const request = await fundContract.instance.requests.call({}, [
    investRequestLogEntry.params.id.value,
  ]);
  const [, , , , numSharesCreated, , , timestamp] = request;

  return {
    id: investRequestLogEntry.params.id.value,
    numShares: toReadable(numSharesCreated),
    timestamp: new Date(timestamp.times(1000).toNumber()),
  };
};

export default invest;
