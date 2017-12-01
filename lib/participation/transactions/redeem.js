// @flow
import BigNumber from "bignumber.js";

import setup from "../../utils/setup";
import toProcessable from "../../assets/utils/toProcessable";
import toReadable from "../../assets/utils/toReadable";
import findEventInLog from "../../utils/ethereum/findEventInLog";
import ensure from "../../utils/generic/ensure";
import approve from "../../assets/transactions/approve";
import getFundContract from "../../fund/contracts/getFundContract";
import sendTransaction from "../../utils/sendTransaction";

import type { Address } from "../../assets/schemas/Address";

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
  fundAddress: Address,
  numShares: BigNumber,
  requestedValue: BigNumber,
  incentiveValue: BigNumber = new BigNumber(0.01),
  from: BigNumber = setup.defaultAccount,
): Promise<Redemption> => {
  await approve("MLN-T", fundAddress, incentiveValue);

  const fundContract = await getFundContract(fundAddress);
  const args = [
    toProcessable(numShares),
    toProcessable(requestedValue),
    toProcessable(incentiveValue),
  ];

  const receipt = await sendTransaction(
    fundContract,
    "requestRedemption",
    args,
    {},
    from,
  );
  const redeemRequestLogEntry = findEventInLog("RequestUpdated", receipt);
  const request = await fundContract.instance.requests.call({}, [
    redeemRequestLogEntry.params.id.value,
  ]);
  const [, , , numSharesCreated, , , , , , timestamp] = request;

  ensure(
    numSharesCreated.eq(toProcessable(numShares)),
    "requested numShares is not equal to retrieved quantity",
    redeemRequestLogEntry,
  );

  return {
    id: redeemRequestLogEntry.params.id.value,
    numShares: toReadable(numSharesCreated),
    timestamp: new Date(timestamp.times(1000).toNumber()),
  };
};

export default redeem;
