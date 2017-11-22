// @flow
import setup from "../../utils/setup";
import sendTransaction from "../../utils/sendTransaction";
import getFundContract from "../contracts/getFundContract";
import ensure from "../../utils/ensure";

import type { Address } from "../../assets/schemas/Address";

const toggleSubscription = async (
  fundAddress: Address,
  from: Address = setup.defaultAccount,
): Promise<boolean> => {
  const fundContract = await getFundContract(fundAddress);
  const owner = await fundContract.owner();
  ensure(owner === from, "Not owner of fund");

  const preSubscriptionAllowed = await fundContract.instance.isSubscribeAllowed.call();

  await sendTransaction(fundContract, "toogleSubscription", []);

  const postSubscriptionAllowed = await fundContract.instance.isSubscribeAllowed.call();

  ensure(
    preSubscriptionAllowed !== postSubscriptionAllowed,
    "Toggle subscription was not successful",
  );
  return postSubscriptionAllowed;
};

export default toggleSubscription;
