// @flow
import ensure from "../../utils/ensure";
import getParticipationContract from "../contracts/getParticipationContract";
import sendTransaction from "../../utils/sendTransaction";

import type { Address } from "../../assets/schemas/Address";

/**
 * List an investor as eligible
 */
const list = async (subscriber: Address): Promise<boolean> => {
  const participationContract = await getParticipationContract();
  const isListedBefore = await participationContract.avatar(subscriber);
  if (!isListedBefore) {
    const listReceipt = await sendTransaction(participationContract, "list", [
      subscriber,
    ]);
    const isListed = await participationContract.instance.avatar.call({}, [
      subscriber,
    ]);
    ensure(isListed, "Listing failed", listReceipt);
  }

  return true;
};

export default list;
