import Wallet from "ethers-wallet";
import getVersionContract from "../contracts/getVersionContract";
import ensure from "../../utils/generic/ensure";

import setup from "../../utils/setup";

/**
 * Signs terms and conditions of competition with instantiated wallet
 * and returns a signature object with r, s and v require parameters in setupFund function
 */

const signTermsAndConditions = async () => {
  const versionContract = await getVersionContract();
  const arrayifiedHash = await versionContract.instance.TERMS_AND_CONDITIONS.call();

  const rawSignature = setup.wallet.signMessage(arrayifiedHash);
  const signature = rawSignature.substr(2, rawSignature.length);
  const verified = Wallet.Wallet.verifyMessage(arrayifiedHash, rawSignature);
  ensure(
    verified === setup.defaultAccount,
    "Invalid signature of terms and conditions",
    { expected: setup.defaultAccount, received: verified },
  );

  return {
    r: `0x${signature.substr(0, 64)}`,
    s: `0x${signature.substr(64, 64)}`,
    v: parseFloat(signature.substr(128, 2)) + 27,
  };
};

export default signTermsAndConditions;
