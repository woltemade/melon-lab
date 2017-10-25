// @flow
import BigNumber from "bignumber.js";
import setup from "../../utils/setup";
import getParticipationContract from "../contracts/getParticipationContract";

import type { Address } from "../../assets/schemas/Address";

/**
 * Test if subscribe request is permitted
 */
const isSubscribeRequestPermitted = async ({
  numShares,
  offeredValue,
  subscriber = setup.defaultAccount,
}: {
  numShares: BigNumber,
  offeredValue: BigNumber,
  subscriber: Address,
}): Promise<boolean> => {
  const particpationContract = await getParticipationContract();
  return particpationContract.isSubscribeRequestPermitted(
    subscriber,
    numShares,
    offeredValue,
  );
};

export default isSubscribeRequestPermitted;
