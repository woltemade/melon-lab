// @flow
import setup from "../../utils/setup";
import sendTransaction from "../../utils/parity/sendTransaction";
import getFundContract from "../contracts/getFundContract";
import ensure from "../../utils/generic/ensure";

import type { Address } from "../../assets/schemas/Address";

const toggleSubscription = async (
  fundAddress: Address,
  wallet,
  from: Address = setup.defaultAccount,
): Promise<boolean> => {
  const fundContract = await getFundContract(fundAddress);
  const owner = await fundContract.instance.owner.call();
  ensure(owner === from, "Not owner of fund");

  const preSubscriptionAllowed = await fundContract.instance.isSubscribeAllowed.call();

  await sendTransaction(fundContract, "toggleSubscription", [], wallet);

  const postSubscriptionAllowed = await fundContract.instance.isSubscribeAllowed.call();

  ensure(
    preSubscriptionAllowed !== postSubscriptionAllowed,
    "Toggle subscription was not successful",
  );
  return postSubscriptionAllowed;
};

export default toggleSubscription;
