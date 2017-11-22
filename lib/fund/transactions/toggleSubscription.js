// @flow
import setup from "../../utils/setup";
import gasBoost from "../../utils/ethereum/gasBoost";
import getFundContract from "../contracts/getFundContract";
import ensure from "../../utils/generic/ensure";

import type { Address } from "../../assets/schemas/Address";

const toggleSubscription = async (
  fundAddress: Address,
  from: Address = setup.defaultAccount,
): Promise<boolean> => {
  const fundContract = await getFundContract(fundAddress);
  const owner = await fundContract.owner();
  ensure(owner === from, "Not owner of fund");

  const preSubscriptionAllowed = await fundContract.isSubscribeAllowed();

  await gasBoost(fundContract.toogleSubscription, [], { from });

  const postSubscriptionAllowed = await fundContract.isSubscribeAllowed();

  ensure(
    preSubscriptionAllowed !== postSubscriptionAllowed,
    "Toggle subscription was not successful",
  );
  return postSubscriptionAllowed;
};

export default toggleSubscription;
