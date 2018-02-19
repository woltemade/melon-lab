// @flow
import BigNumber from 'bignumber.js';
import ensure from '../../utils/generic/ensure';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import getFundContract from '../../fund/contracts/getFundContract';
import isRedeemRequestPermittedAndAllowed from '../calls/isRedeemRequestPermittedAndAllowed';
import sendTransaction from '../../utils/parity/sendTransaction';

import toProcessable from '../../assets/utils/toProcessable';
import toReadable from '../../assets/utils/toReadable';

import type { Address } from '../../assets/schemas/Address';

type Redemption = {
  numShares: BigNumber,
  atTimeStamp: Date,
  id: number,
};

/**
 * Redeem `numShares` of fund at `fundAddress` by requesting `requestedValue`
 * and incentivice execution with `incentiveValue`
 */
const redeem = async (
  environment,
  { fundAddress, numShares, requestedValue, isNativeAsset = false },
): Promise<Redemption> => {
  const who = environment.account.address;

  const fundContract = await getFundContract(environment, fundAddress);

  const isShutDown = await fundContract.instance.isShutDown.call();
  ensure(isShutDown === false, 'Fund is shut down');

  await isRedeemRequestPermittedAndAllowed({
    fundContract,
    numShares,
    requestedValue,
    who,
  });

  const args = [
    toProcessable(numShares),
    toProcessable(requestedValue),
    isNativeAsset,
  ];

  const receipt = await sendTransaction(
    fundContract,
    'requestRedemption',
    args,
    environment,
    {},
  );
  const redeemRequestLogEntry = findEventInLog('RequestUpdated', receipt);
  const request = await fundContract.instance.requests.call({}, [
    redeemRequestLogEntry.params.id.value,
  ]);
  const [, , , , shareQuantity, , , timestamp] = request;

  ensure(
    shareQuantity.eq(toProcessable(numShares)),
    'requested numShares is not equal to retrieved quantity',
    redeemRequestLogEntry,
  );

  return {
    id: redeemRequestLogEntry.params.id.value,
    numShares: toReadable(shareQuantity),
    timestamp: new Date(timestamp.times(1000).toNumber()),
  };
};

export default redeem;
