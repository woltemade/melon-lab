// @flow
import setup from "../../utils/setup";
import sendTransaction from "../../utils/sendTransaction";
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
  const owner = await fundContract.instance.owner.call();
  ensure(owner === from, "Not owner of fund");

  const preRedemptionAllowed = await fundContract.instance.isRedeemAllowed.call();

  await sendTransaction(fundContract, "toggleRedemption", []);

  const postRedemptionAllowed = await fundContract.instance.isRedeemAllowed.call();

  ensure(
    preRedemptionAllowed !== postRedemptionAllowed,
    "Toggle redemption was not successful",
  );
  return postRedemptionAllowed;
};

export default toggleRedemption;
