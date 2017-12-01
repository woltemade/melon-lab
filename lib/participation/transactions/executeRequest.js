// @flow
import BigNumber from "bignumber.js";

import setup from "../../utils/setup";
import findEventInLog from "../../utils/findEventInLog";
import toReadable from "../../assets/utils/toReadable";
import sendTransaction from "../../utils/sendTransaction";
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

  const [, , requestType] = await fundContract.instance.requests.call({}, [
    requestId,
  ]);
  let executeRequestLogEntry;
  let receipt;

  if (requestType.eq(new BigNumber(0))) {
    // receipt = await fundContract.executeRequest(requestId, { from });
    receipt = await sendTransaction(fundContract, "executeRequest", [
      requestId,
    ]);

    executeRequestLogEntry = findEventInLog("Subscribed", receipt);
  } else if (requestType.eq(new BigNumber(1))) {
    receipt = await sendTransaction(
      fundContract,
      "executeRequest",
      [requestId],
      {},
      from,
    );
    executeRequestLogEntry = findEventInLog("Redeemed", receipt);
  }

  return toReadable(executeRequestLogEntry.params.shareQuantity.value);
};

export default executeRequest;
