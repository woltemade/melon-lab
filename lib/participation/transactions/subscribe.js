// @flow
import BigNumber from "bignumber.js";

import setup from "../../utils/setup";
import ensure from "../../utils/generic/ensure";
import sendTransaction from "../../utils/parity/sendTransaction";
import findEventInLog from "../../utils/ethereum/findEventInLog";
import approve from "../../assets/transactions/approve";
import getBalance from "../../assets/calls/getBalance";
import toProcessable from "../../assets/utils/toProcessable";
import toReadable from "../../assets/utils/toReadable";
import getFundContract from "../../fund/contracts/getFundContract";
import getDataFeedContract from "../../datafeeds/contracts/getDataFeedContract";
// We'll have to bring it back later
// import isSubscribeRequestPermitted from "../../participation/calls/isSubscribeRequestPermitted";
import getAddress from "../../assets/utils/getAddress";
import type { Address } from "../../assets/schemas/Address";

type Subscription = {
  numShares: BigNumber,
  atTimestamp: Date,
  id: number,
};

/**
 * Subscribe to fund at `fundAddress` by offering `offeredValue` and requesting
 * `numShares` and incentivice execution with `incentiveValue`
 */
const subscribe = async (
  wallet,
  fundAddress: Address,
  numShares: BigNumber,
  offeredValue: BigNumber,
  incentiveValue: BigNumber = new BigNumber(0.01),
  subscriber: Address = setup.defaultAccount,
): Promise<Subscription> => {
  const fundContract = await getFundContract(fundAddress);
  const dataFeedContract = await getDataFeedContract();
  const mlnBalance = await getBalance("MLN-T", subscriber);
  const totalMlnNeeded = new BigNumber(offeredValue).plus(incentiveValue);

  ensure(
    mlnBalance.gte(totalMlnNeeded),
    `Insufficent MLN-T. Need ${totalMlnNeeded.toString()} have: ${mlnBalance.toString()}`,
  );
  ensure(
    await fundContract.instance.isSubscribeAllowed.call(),
    "Subscriptions to fund are disabled",
  );
  ensure(incentiveValue.gt(0), "incentiveValue must be greater than 0");
  const isValid = await dataFeedContract.instance.isValid.call({}, [
    getAddress("MLN-T"),
  ]);
  ensure(isValid, "Data not valid");

  await approve(wallet, "MLN-T", fundAddress, totalMlnNeeded);

  const args = [
    toProcessable(offeredValue, "MLN-T"),
    toProcessable(numShares, "MLN-T"),
    toProcessable(incentiveValue, "MLN-T"),
  ];

  const receipt = await sendTransaction(
    fundContract,
    "requestSubscription",
    args,
    wallet,
  );
  const subscribeRequestLogEntry = findEventInLog("RequestUpdated", receipt);
  const request = await fundContract.instance.requests.call({}, [
    subscribeRequestLogEntry.params.id.value,
  ]);
  const [, , , numSharesAnnihilated, , , , , , timestamp] = request;

  return {
    id: subscribeRequestLogEntry.params.id.value,
    numShares: toReadable(numSharesAnnihilated),
    timestamp: new Date(timestamp.times(1000).toNumber()),
  };
};

export default subscribe;
