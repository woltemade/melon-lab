// @flow
import setup from "../../utils/setup";
import gasBoost from "../../utils/ethereum/gasBoost";
import getFundContract from "../contracts/getFundContract";
import ensure from "../../utils/generic/ensure";

import type { Address } from "../../assets/schemas/Address";

/**
 * Toggles redemption of fund at `fundAddress`
 */
const toggleRedemption = async (
  fundAddress: Address,
  from: Address = setup.defaultAccount,
): Promise<boolean> => {
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
