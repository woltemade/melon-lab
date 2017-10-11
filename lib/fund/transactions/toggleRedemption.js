// @flow
import setup from "../../utils/setup";
import gasBoost from "../../utils/gasBoost";
import getFundContract from "../contracts/getFundContract";
import ensure from "../../utils/ensure";

/* @post: returns new value of isRedeemAllowed */

const toggleRedemption = async (
  fundAddress: string,
  from: string = setup.web3.eth.defaultAccount,
) => {
  const fundContract = await getFundContract(fundAddress);
  const owner = await fundContract.owner();
  ensure(owner === from, "Not owner of fund");

  const preRedemptionAllowed = await fundContract.isRedeemAllowed();

  await gasBoost(fundContract.toggleRedemption, [], { from });

  const postRedemptionAllowed = await fundContract.isRedeemAllowed();

  ensure(
    preRedemptionAllowed !== postRedemptionAllowed,
    "Toggle redemption was not successful",
  );
  return postRedemptionAllowed;
};

export default toggleRedemption;
