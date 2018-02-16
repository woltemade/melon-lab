import BigNumber from 'bignumber.js';
import ensure from '../../utils/generic/ensure';
import getComplianceContract from '../contracts/getComplianceContract';
import toProcessable from '../../assets/utils/toProcessable';

import type { Address } from '../../assets/schemas/Address';

/**
 * Test if subscribe request is permitted
 */
const isSubscribePermittedAndAllowed = async (
  environment,
  { fundContract, numShares, offeredValue, who },
) => {
  const participationContract = await getComplianceContract(
    environment,
    fundContract,
  );
  const participationPermitted = await participationContract.instance.isSubscriptionPermitted.call(
    {},
    [
      who,
      toProcessable(offeredValue, 'MLN-T'),
      toProcessable(numShares, 'MLN-T'),
    ],
  );
  ensure(
    participationPermitted,
    'Participation module does not allow subscription.',
  );
  ensure(
    await fundContract.instance.isSubscribeAllowed.call(),
    'Subscriptions in MLN to fund are disabled by the fund manager',
  );
};

export default isSubscribePermittedAndAllowed;
