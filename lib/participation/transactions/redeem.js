import contract from "truffle-contract";
import BigNumber from "bignumber.js";
import FundJson from "@melonproject/protocol/build/contracts/Fund.json";

import setup from "../../utils/setup";
import toProcessable from "../../assets/utils/toProcessable";
import toReadable from "../../assets/utils/toReadable";
import findEventInLog from "../../utils/findEventInLog";
import ensure from "../../utils/ensure";

const redeem = async (
  vaultAddress,
  numShares,
  requestedValue,
  incentiveValue = new BigNumber(0.01),
  investor = setup.defaultAccount,
) => {
  const Fund = contract(FundJson);
  Fund.setProvider(setup.currentProvider);
  const fundContract = Fund.at(vaultAddress);
  const receipt = await fundContract.requestRedemption(
    toProcessable(numShares),
    toProcessable(requestedValue),
    toProcessable(incentiveValue),
    {
      from: investor,
    },
  );
  const redeemRequestLogEntry = findEventInLog("RequestUpdated", receipt);
  const request = await fundContract.requests(redeemRequestLogEntry.args.id);

  ensure(
    request[3].eq(toProcessable(numShares)),
    "requested numShares is not equal to retrieved quantity",
    redeemRequestLogEntry,
  );

  return {
    numShares: toReadable(request[3]),
    atTimeStamp: new Date(request[9].times(1000).toNumber()),
    id: redeemRequestLogEntry.args.id,
  };
};

export default redeem;
