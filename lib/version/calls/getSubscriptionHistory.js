// @flow
import getVersionContract from "../contracts/getVersionContract";

import type { Address } from "../../assets/schemas/Address";

/**
 * Get subscription history of a manager by `managerAddress`
 */
const getSubscriptionHistory = async (
  managerAddress: Address,
  startId: number = 0,
): Promise<any> => {
  const versionContract = await getVersionContract();

  const subscriptionHistory = await versionContract.getSubscriptionHistory(
    managerAddress,
    startId,
  );

  return subscriptionHistory;
};

export default getSubscriptionHistory;
