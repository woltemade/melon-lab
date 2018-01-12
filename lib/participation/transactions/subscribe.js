// @flow
import BigNumber from "bignumber.js";

import approve from "../../assets/transactions/approve";
import ensure from "../../utils/generic/ensure";
import findEventInLog from "../../utils/ethereum/findEventInLog";
import getBalance from "../../assets/calls/getBalance";
import getPriceFeedContract from "../../datafeeds/contracts/getPriceFeedContract";
import getFundContract from "../../fund/contracts/getFundContract";
import isSubscribeRequestPermittedAndAllowed from "../calls/isSubscribeRequestPermittedAndAllowed";
import sendTransaction from "../../utils/parity/sendTransaction";
import toProcessable from "../../assets/utils/toProcessable";
import toReadable from "../../assets/utils/toReadable";
import setup from "../../utils/setup";
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
  isNAtiveAsset: Boolean,
  incentiveValue: BigNumber = new BigNumber(0.01),
): Promise<Subscription> => {
  const who = wallet.address;
  const fundContract = await getFundContract(fundAddress);
  const dataFeedContract = await getPriceFeedContract();
  const mlnBalance = await getBalance("MLN-T", who);
  {
    /* const totalMlnNeeded = new BigNumber(offeredValue).plus(incentiveValue); */
  }

  const isShutDown = await fundContract.instance.isShutDown.call();
  ensure(isShutDown === false, "Fund is shut down");
  await isSubscribeRequestPermittedAndAllowed({
    fundContract,
    numShares,
    offeredValue,
    who,
  });

  ensure(
    mlnBalance.gte(totalMlnNeeded),
    `Insufficent MLN-T. Need ${totalMlnNeeded.toString()} have: ${mlnBalance.toString()}`,
  );
  ensure(incentiveValue.gt(0), "incentiveValue must be greater than 0");
  const isValid = await dataFeedContract.instance.isValid.call({}, [
    getAddress("MLN-T"),
  ]);
  ensure(
    isValid,
    "Pricefeed data is not valid at the moment. Please try again later.",
  );

  await approve(wallet, "MLN-T", fundAddress, offeredValue);

  const args = [
    toProcessable(offeredValue, "MLN-T"),
    toProcessable(numShares, "MLN-T"),
    isNAtiveAsset,
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
