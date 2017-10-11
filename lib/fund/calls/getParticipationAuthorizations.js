// @flow
import setup from "../../utils/setup";
import getFundContract from "../contracts/getFundContract";

/* @post: returns new value of isSubscribeAllowed */

const getParticipationAuthorizations = async (fundAddress: string) => {
  const fundContract = await getFundContract(fundAddress);

  const subscriptionAllowed = await fundContract.isSubscribeAllowed();

  const redemptionAllowed = await fundContract.isRedeemAllowed();

  return {
    subscriptionAllowed,
    redemptionAllowed,
  };
};

export default getParticipationAuthorizations;
