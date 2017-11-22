// @flow
import BigNumber from "bignumber.js";

import setup from "../../utils/setup";
import findEventInLog from "../../utils/ethereum/findEventInLog";
import toReadable from "../../assets/utils/toReadable";
import gasBoost from "../../utils/ethereum/gasBoost";
import getFundContract from "../../fund/contracts/getFundContract";

import type { Address } from "../../assets/schemas/Address";

/**
 * Execute request by `requestId` on fund at `fundAddress`
 * @returns number of allocated shares
 */
const executeRequest = async (
  requestId: number,
  fundAddress: Address,
  from: Address = setup.defaultAccount,
): Promise<BigNumber> => {
  const fundContract = await getFundContract(fundAddress);

  const [, , requestType] = await fundContract.requests(requestId);
  let executeRequestLogEntry;
  let receipt;

  if (requestType.eq(new BigNumber(0))) {
    // receipt = await fundContract.executeRequest(requestId, { from });
    receipt = await gasBoost(fundContract.executeRequest, [requestId], {
      from,
    });

    executeRequestLogEntry = findEventInLog("Subscribed", receipt);
  } else if (requestType.eq(new BigNumber(1))) {
    receipt = await gasBoost(fundContract.executeRequest, [requestId], {
      from,
    });
    executeRequestLogEntry = findEventInLog("Redeemed", receipt);
  }

  return toReadable(executeRequestLogEntry.args.shareQuantity);
};

export default executeRequest;
