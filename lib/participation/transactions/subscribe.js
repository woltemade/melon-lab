import BigNumber from "bignumber.js";
import contract from "truffle-contract";
import VaultJson from "@melonproject/protocol/build/contracts/Vault.json";

import setup from "../../utils/setup";
import ensure from "../../utils/ensure";
import findEventInLog from "../../utils/findEventInLog";
import approve from "../../assets/transactions/approve";
import toProcessable from "../../assets/utils/toProcessable";
import toReadable from "../../assets/utils/toReadable";
import isSubscribeRequestPermitted from "../../participation/calls/isSubscribeRequestPermitted";

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
  const Vault = contract(VaultJson);
  Vault.setProvider(setup.currentProvider);
  const vaultContract = Vault.at(vaultAddress);

  ensure(
    await vaultContract.isSubscribeAllowed(),
    "Subscriptions to vault are disabled",
  );
  ensure(incentiveValue.gt(0), "incentiveValue must be greater than 0");
  ensure(
    await isSubscribeRequestPermitted({ numShares, offeredValue, subscriber }),
    "Subscribe is not permitted",
  );

  await approve("MLN-T", vaultAddress, offeredValue);

  const args = [
    toProcessable(numShares),
    toProcessable(offeredValue),
    toProcessable(incentiveValue),
    {
      from: subscriber,
    },
  ];

  // TODO: really check if preflight is ok
  // const preflightOk = await vaultContract.subscribe.call(...args);

  const receipt = await vaultContract.subscribe(...args);

  const subscribeRequestLogEntry = findEventInLog("SubscribeRequest", receipt);
  /* eslint-disable no-underscore-dangle */
  return {
    numShares: toReadable(subscribeRequestLogEntry.args.numShares),
    atTimestamp: new Date(
      subscribeRequestLogEntry.args.atTimestamp.times(1000).toNumber(),
    ),
  };
  /* eslint-enable */
};

export default subscribe;
