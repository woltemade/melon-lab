import BigNumber from "bignumber.js";
import contract from "truffle-contract";
import FundJson from "@melonproject/protocol/build/contracts/Fund.json";
import DataFeedJson from "@melonproject/protocol/build/contracts/DataFeed.json";

import setup from "../../utils/setup";
import ensure from "../../utils/ensure";
import findEventInLog from "../../utils/findEventInLog";
import approve from "../../assets/transactions/approve";
import toProcessable from "../../assets/utils/toProcessable";
import toReadable from "../../assets/utils/toReadable";
import isSubscribeRequestPermitted from "../../participation/calls/isSubscribeRequestPermitted";
import getAddress from "../../assets/utils/getAddress";
/*
  @param numShares: BigNumber quantity of Shares wanted to receive with decimals
  @param offeredValue: BigNumber quantitiy of Ether willing to offer with decimals
*/
const subscribe = async (
  vaultAddress,
  numShares,
  offeredValue,
  incentiveValue = new BigNumber(0.01),
  subscriber = setup.defaultAccount,
) => {
  const Fund = contract(FundJson);
  Fund.setProvider(setup.currentProvider);
  const fundContract = Fund.at(vaultAddress);

  const DataFeed = contract(DataFeedJson);
  DataFeed.setProvider(setup.currentProvider);
  const dataFeedContract = await DataFeed.deployed();

  ensure(
    await fundContract.isSubscribeAllowed(),
    "Subscriptions to vault are disabled",
  );
  ensure(incentiveValue.gt(0), "incentiveValue must be greater than 0");
  const isValid = await dataFeedContract.isValid(getAddress("MLN-T"));
  ensure(isValid, "Data not valid");
  // ensure(
  //   await isSubscribeRequestPermitted({ numShares, offeredValue, subscriber }),
  //   "Subscribe is not permitted",
  // );

  await approve("MLN-T", vaultAddress, offeredValue + incentiveValue);

  const args = [
    toProcessable(numShares),
    toProcessable(offeredValue),
    toProcessable(incentiveValue),
    {
      from: subscriber,
    },
  ];

  // TODO: really check if preflight is ok
  // const preflightOk = await fundContract.subscribe.call(...args);

  const receipt = await fundContract.requestSubscription(...args);
  const subscribeRequestLogEntry = findEventInLog("SubscribeRequest", receipt);
  const requestId = await fundContract.nextRequestId();
  /* eslint-disable no-underscore-dangle */

  return {
    numShares: toReadable(subscribeRequestLogEntry.args.numShares),
    atTimestamp: new Date( // TODO change to timestamp
      subscribeRequestLogEntry.args.atTimestamp.times(1000).toNumber(),
    ),
    id: requestId - 1,
  };
  /* eslint-enable */
};

export default subscribe;
