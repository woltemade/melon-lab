// @flow
import getFundContract from "../contracts/getFundContract";

import type { Address } from "../../assets/schemas/Address";

/**
 * Checks if fund at `fundAddress` is shutdown
 */
const isShutDown = async (fundAddress: Address): Promise<boolean> => {
  const fundContract = getFundContract(fundAddress);

  const bool = await fundContract.instance.isShutDown.call();

  return bool;
};

export default isShutDown;
