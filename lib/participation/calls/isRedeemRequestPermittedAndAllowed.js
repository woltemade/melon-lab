import BigNumber from 'bignumber.js';
import ensure from '../../utils/generic/ensure';
import getComplianceContract from '../contracts/getComplianceContract';
import setup from '../../utils/setup';
import toProcessable from '../../assets/utils/toProcessable';

import type { Address } from '../../assets/schemas/Address';

/**
 * Test if redeem request is permitted
 */
const isRedeemPermittedAndAllowed = async ({
  fundContract,
  numShares,
  requestedValue,
  who,
}) => {
  ensure(
    await fundContract.instance.isRedeemAllowed.call(),
    'Redemption in MLN to fund are disabled by the fund manager',
  );

  const complianceContract = await getComplianceContract(fundContract);
  const redemptionPermitted = await complianceContract.instance.isRedemptionPermitted.call(
    {},
    [
      who,
      toProcessable(numShares, 'MLN-T'),
      toProcessable(requestedValue, 'MLN-T'),
    ],
  );
  ensure(
    redemptionPermitted,
    'Participation module does not allow redemption in MLN.',
  );
};

export default isRedeemPermittedAndAllowed;
