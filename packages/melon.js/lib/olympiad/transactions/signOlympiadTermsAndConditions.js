import Utils from 'ethers-utils';
import Wallet from 'ethers-wallet';
import ensure from '../../utils/generic/ensure';
import getOlympiadContract from '../contracts/getOlympiadContract';
/**
 * Signs terms and conditions of competition with instantiated wallet
 * and returns a signature object with r, s and v require parameters in setupFund function
 */

const signOlympiadTermsAndConditions = async environment => {
  const olympiadContract = await getOlympiadContract(environment);
  const arrayifiedHash = await olympiadContract.instance.TERMS_AND_CONDITIONS.call();

  let rawSignature;

  if (environment.account.signMessage) {
    rawSignature = environment.account.signMessage(arrayifiedHash);
    const verified = Wallet.Wallet.verifyMessage(arrayifiedHash, rawSignature);
    ensure(
      verified.toLowerCase() === environment.account.address.toLowerCase(),
      'Invalid signature of terms and conditions',
      { expected: environment.account.address, received: verified },
    );
  } else {
    const hash = Utils.hexlify(arrayifiedHash);
    rawSignature = await environment.api.eth.sign(
      environment.account.address,
      hash,
    );
  }

  const v = parseInt(rawSignature.substring(66 + 64), 16);
  return {
    r: rawSignature.substring(0, 66),
    s: `0x${rawSignature.substring(66, 66 + 64)}`,
    v,
  };
};

export default signOlympiadTermsAndConditions;
