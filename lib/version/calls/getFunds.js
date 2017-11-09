// @flow
import getVersionContract from "../contracts/getVersionContract";

import type { Address } from "../../assets/schemas/Address";

/**
 * Get addresses of funds starting from `startId`
 */
const getFunds = async (startId: number = 0): Promise<Array<Address>> => {
  const versionContract = await getVersionContract();

  const allFunds = await versionContract.getFunds(startId);

  return allFunds;
};

export default getFunds;
