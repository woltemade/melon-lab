// @flow
import getVersionContract from "../contracts/getVersionContract";

import type { Address } from "../../assets/schemas/Address";

/**
 * Get fund address for a given `managerAddress`
 * _Hint_: If multiple funds existing for one manager, the latest fund is returned
 */
const getFundForManager = async (
  managerAddress: Address,
): Promise<Address | false> => {
  const versionContract = await getVersionContract();
  const vaultAddress = await versionContract.getFundByManager(managerAddress);

  if (vaultAddress === "0x0000000000000000000000000000000000000000")
    return false;
  return vaultAddress;
};

export default getFundForManager;
