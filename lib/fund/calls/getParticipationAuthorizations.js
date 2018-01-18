// @flow
import getFundContract from '../contracts/getFundContract';

import type { Address } from '../../assets/schemas/Address';

/**
 * Fund participation authorizations
 */
type ParticipationAuthorizations = {
  subscriptionAllowed: boolean,
  redemptionAllowed: boolean,
};

/**
 * Get participation authorizations of fund at `fundAddress`
 */
const getParticipationAuthorizations = async (
  fundAddress: Address,
): Promise<ParticipationAuthorizations> => {
  const fundContract = await getFundContract(fundAddress);
  const subscriptionAllowed = await fundContract.instance.isSubscribeAllowed.call();
  const redemptionAllowed = await fundContract.instance.isRedeemAllowed.call();

  return {
    subscriptionAllowed,
    redemptionAllowed,
  };
};

export default getParticipationAuthorizations;
