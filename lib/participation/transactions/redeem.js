import BigNumber from "bignumber.js";

import setup from "../../utils/setup";
import toProcessable from "../../assets/utils/toProcessable";
import toReadable from "../../assets/utils/toReadable";
import findEventInLog from "../../utils/findEventInLog";
import ensure from "../../utils/ensure";
import approve from "../../assets/transactions/approve";
import getFundContract from "../../fund/contracts/getFundContract";
import gasBoost from "../../utils/gasBoost";

const redeem = async (
  fundAddress,
  numShares,
  requestedValue,
  incentiveValue = new BigNumber(0.01),
  investor = setup.defaultAccount,
) => {
  await approve("MLN-T", fundAddress, incentiveValue);

  const fundContract = await getFundContract(fundAddress);
  const args = [
    toProcessable(numShares),
    toProcessable(requestedValue),
    toProcessable(incentiveValue),
  ];
  const options = {
    from: investor,
  };

  const receipt = await gasBoost(fundContract.requestRedemption, args, options);
  const redeemRequestLogEntry = findEventInLog("RequestUpdated", receipt);
  const request = await fundContract.requests(redeemRequestLogEntry.args.id);
  const [, , , numSharesCreated, , , , , , timestamp] = request;

  ensure(
    numSharesCreated.eq(toProcessable(numShares)),
    "requested numShares is not equal to retrieved quantity",
    redeemRequestLogEntry,
  );

  return {
    numShares: toReadable(numSharesCreated),
    atTimeStamp: new Date(timestamp.times(1000).toNumber()),
    id: redeemRequestLogEntry.args.id,
  };
};

export default redeem;
