// @flow
import setup from '../../utils/setup';
import getVersionContract from '../../version/contracts/getVersionContract';
import ensure from '../../utils/generic/ensure';
import sendTransaction from '../../utils/parity/sendTransaction';

import type { Address } from '../../assets/schemas/Address';

/**
 * Shut down fund at `fundAddress`
 */
const shutDownFund = async (
  wallet: Object,
  fundAddress: Address,
): Promise<any> => {
  const versionContract = await getVersionContract();

  const shutDownAllowed = await versionContract.instance.managerToFunds.call(
    {},
    [wallet.address],
  );

  ensure(
    shutDownAllowed.toLowerCase() === fundAddress.toLowerCase(),
    'Not owner of fund',
  );

  const receipt = await sendTransaction(
    versionContract,
    'shutDownFund',
    [fundAddress],
    wallet,
  );

  return receipt;
};

export default shutDownFund;
