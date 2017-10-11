// @flow
import setup from "../../utils/setup";
import gasBoost from "../../utils/gasBoost";
import getFundContract from "../contracts/getFundContract";
import ensure from "../../utils/ensure";

/* @post: returns new value of isSubscribeAllowed */

const toggleSubscription = async (
  fundAddress: string,
  from: string = setup.web3.eth.defaultAccount,
) => {
  const fundContract = await getFundContract(fundAddress);
  const owner = await fundContract.owner();
  ensure(owner === from, "Not owner of fund");

  const preSubscriptionAllowed = await fundContract.isSubscribeAllowed();

  const receipt = await gasBoost(fundContract.toogleSubscription, [], { from });

  const postSubscriptionAllowed = await fundContract.isSubscribeAllowed();

  ensure(
    preSubscriptionAllowed !== postSubscriptionAllowed,
    "Toggle subscription was not successful",
  );
  return postSubscriptionAllowed;
};

export default toggleSubscription;
