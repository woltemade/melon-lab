import BigNumber from "bignumber.js";
import ensure from "../../utils/generic/ensure";
import getParticipationContract from "../contracts/getParticipationContract";
import setup from "../../utils/setup";
import toProcessable from "../../assets/utils/toProcessable";

import type { Address } from "../../assets/schemas/Address";

/**
 * Test if subscribe request is permitted
 */
const isSubscribePermittedAndAllowed = async ({
  fundContract,
  numShares,
  offeredValue,
  subscriber,
}) => {
  const participationContract = await getParticipationContract(fundContract);
  const participationPermitted = await participationContract.instance.isSubscriptionPermitted.call(
    {},
    [
      subscriber,
      toProcessable(offeredValue, "MLN-T"),
      toProcessable(numShares, "MLN-T"),
    ],
  );
  ensure(
    participationPermitted,
    "Participation module does not allow subscription.",
  );
  ensure(
    await fundContract.instance.isSubscribeAllowed.call(),
    "Subscriptions in MLN to fund are disabled by the fund manager",
  );
};

export default isSubscribePermittedAndAllowed;
