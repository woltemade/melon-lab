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

type Subscription = {
  numShares: BigNumber,
  atTimestamp: Date,
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
  const dataFeedContract = await getPriceFeedContract(environment);
  const mlnBalance = await getBalance(environment, {
    tokenSymbol: 'ETH-T-M',
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
    mlnBalance.gte(offeredValue),
    `Insufficent ETH-T-M. Need ${offeredValue.toString()} have: ${mlnBalance.toString()}`,
  );

  const hasRecentPrice = await dataFeedContract.instance.hasRecentPrice.call(
    {},
    [getAddress('ETH-T-M')],
  );
  ensure(
    hasRecentPrice,
    'Pricefeed data is not valid at the moment. Please try again later.',
  );

  await approve(environment, {
    symbol: 'ETH-T-M',
    spender: fundAddress,
    quantity: offeredValue,
  });

  const args = [
    toProcessable(offeredValue, 'ETH-T-M'),
    toProcessable(numShares, 'ETH-T-M'),
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
