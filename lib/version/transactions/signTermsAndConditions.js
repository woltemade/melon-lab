import Wallet from "ethers-wallet";
import getVersionContract from "../contracts/getVersionContract";
import ensure from "../../utils/generic/ensure";

import setup from "../../utils/setup";

/**
 * Signs terms and conditions of competition with instantiated wallet
 * and returns a signature object with r, s and v require parameters in setupFund function
 */

const signTermsAndConditions = async wallet => {
  const versionContract = await getVersionContract();
  const arrayifiedHash = await versionContract.instance.TERMS_AND_CONDITIONS.call();

  const rawSignature = wallet.signMessage(arrayifiedHash);
  const verified = Wallet.Wallet.verifyMessage(arrayifiedHash, rawSignature);
  ensure(
    verified.toLowerCase() === setup.defaultAccount.toLowerCase(),
    "Invalid signature of terms and conditions",
    { expected: setup.defaultAccount, received: verified },
  );
  return {
    r: rawSignature.substring(0, 66),
    s: `0x${rawSignature.substring(66, 66 + 64)}`,
    v: `0x${rawSignature.substring(66 + 64)}`,
  };
};

export default signTermsAndConditions;

// BACKUP if more pb signing w ethers-wallet
// import Api from "@parity/api";
// // import getVersionContract from "../contracts/getVersionContract";
// import Wallet from "ethers-wallet";
// import setup from "../../utils/setup";

// const sigUtil = require("eth-sig-util");
// const ethUtil = require("ethereumjs-util");

// const signTermsAndConditions = async () => {
//   // const versionContract = await getVersionContract();
//   // const hash = await versionContract.instance.TERMS_AND_CONDITIONS.call() INVALID FORMAT (?)
//   const hash =
//     "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";

//   const sigUtilSignature = sigUtil.personalSign(
//     ethUtil.toBuffer(setup.wallet.privateKey),
//     { data: hash },
//   );
//   const personalSignature = sigUtilSignature.substr(2, sigUtilSignature.length);
//   const rsv = {};
//   rsv.r = `0x${personalSignature.substr(0, 64)}`;
//   rsv.s = `0x${personalSignature.substr(64, 64)}`;
//   rsv.v = parseFloat(personalSignature.substr(128, 2)) + 27;
//   return rsv;
// };

// export default signTermsAndConditions;
