import Utils from 'ethers-utils';

import Api from '@parity/api';
import setup from '../../utils/setup';
import getVersionContract from '../contracts/getVersionContract';

/**
 * Signs terms and conditions of competition with instantiated wallet
 * and returns a signature object with r, s and v require parameters in setupFund function
 */

const signTermsAndConditions = async wallet => {
  const versionContract = await getVersionContract();
  const arrayifiedHash = await versionContract.instance.TERMS_AND_CONDITIONS.call();
  const hashed = Utils.hexlify(arrayifiedHash);
  const api = new Api(setup.provider);
  const rawSignature = await api.eth.sign(wallet.address, hashed);

  return {
    r: rawSignature.substring(0, 66),
    s: `0x${rawSignature.substring(66, 66 + 64)}`,
    v: `0x${rawSignature.substring(66 + 64)}`,
  };
};

export default signTermsAndConditions;
