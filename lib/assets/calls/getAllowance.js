// @flow
import BigNumber from "bignumber.js";
import getTokenContract from "../contracts/getTokenContract";
import toReadable from "../utils/toReadable";

import type { Address } from "../schemas/Address";
import type { TokenSymbol } from "../schemas/TokenSymbol";

/**
 * @returns the amount which spender is still allowed to withdraw from owner
 * @param tokenSymbol the symbol of the token. Example: "MLN-T"
 * @param ownerAddress holds the funds currently
 * @param spenderAddress is eligible to spend the funds
 */
const getAllowance: BigNumber = async (
  tokenSymbol: TokenSymbol,
  ownerAddress: Address,
  spenderAddress: Address,
): Promise<BigNumber> => {
  const tokenContract = await getTokenContract(tokenSymbol);
  const approvedAmount: BigNumber = await tokenContract.instance.allowance.call(
    {},
    [ownerAddress, spenderAddress],
  );

  return toReadable(approvedAmount, tokenSymbol);
};

export default getAllowance;
