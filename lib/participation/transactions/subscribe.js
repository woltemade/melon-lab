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
// We'll have to bring it back later
// import isSubscribeRequestPermitted from "../../participation/calls/isSubscribeRequestPermitted";
import getAddress from "../../assets/utils/getAddress";
import getConfig from "../../version/calls/getConfig";
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
  const config = await getConfig();
  const dataFeedContract = await DataFeed.at(config.dataFeedAddress);

  ensure(
    await fundContract.isSubscribeAllowed(),
    "Subscriptions to vault are disabled",
  );
  ensure(incentiveValue.gt(0), "incentiveValue must be greater than 0");
  const isValid = await dataFeedContract.isValid(getAddress("MLN-T"));
  ensure(isValid, "Data not valid");
  // We'll have to bring it back later
  // ensure(
  //   await isSubscribeRequestPermitted({ numShares, offeredValue, subscriber }),
  //   "Subscribe is not permitted",
  // );

  await approve("MLN-T", vaultAddress, offeredValue.add(incentiveValue));

  const args = [
    toProcessable(offeredValue, "MLN-T"),
    toProcessable(numShares, "MLN-T"),
    toProcessable(incentiveValue, "MLN-T"),
    {
      from: subscriber,
    },
  ];

  // TODO: really check if preflight is ok
  // const preflightOk = await fundContract.subscribe.call(...args);

  const receipt = await fundContract.requestSubscription(...args);
  const subscribeRequestLogEntry = findEventInLog("RequestUpdated", receipt);
  const request = await fundContract.requests(subscribeRequestLogEntry.args.id);

  /* eslint-disable no-underscore-dangle */
  return {
    numShares: toReadable(request[3]),
    atTimestamp: new Date(request[9].times(1000).toNumber()), // TODO change to timestamp
    id: subscribeRequestLogEntry.args.id,
  };
  /* eslint-enable */
};

export default subscribe;
