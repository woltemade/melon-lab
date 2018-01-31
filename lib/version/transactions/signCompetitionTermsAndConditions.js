const sigUtil = require('eth-sig-util');
const ethUtil = require('ethereumjs-util');

const signCompetitionTermsAndConditions = async wallet => {
  const hash =
    '0x1A46B45CC849E26BB3159298C3C218EF300D015ED3E23495E77F0E529CE9F69E';

  const sigUtilSignature = sigUtil.personalSign(
    ethUtil.toBuffer(wallet.privateKey),
    { data: hash },
  );
  const personalSignature = sigUtilSignature.substr(2, sigUtilSignature.length);
  const rsv = {};
  rsv.r = `0x${personalSignature.substr(0, 64)}`;
  rsv.s = `0x${personalSignature.substr(64, 64)}`;
  rsv.v = parseFloat(personalSignature.substr(128, 2)) + 27;
  return rsv;
};

export default signCompetitionTermsAndConditions;

// import Wallet from 'ethers-wallet';
// import Utils from 'ethers-utils';
// import ensure from '../../utils/generic/ensure';

// /**
//  * Signs terms and conditions of competition with instantiated wallet
//  * and returns a signature object with r, s and v require parameters in setupFund function
//  */

// const signCompetitionTermsAndConditions = async wallet => {
//   const competitionHash =
//     '0x1A46B45CC849E26BB3159298C3C218EF300D015ED3E23495E77F0E529CE9F69E';
//   const arrayifiedHash = Utils.toUtf8Bytes(competitionHash);
//   const rawSignature = wallet.signMessage(arrayifiedHash);
//   const verified = Wallet.Wallet.verifyMessage(competitionHash, rawSignature);
//   ensure(
//     verified.toLowerCase() === wallet.address.toLowerCase(),
//     'Invalid signature of terms and conditions',
//     { expected: wallet.address, received: verified },
//   );

//   return {
//     r: rawSignature.substring(0, 66),
//     s: `0x${rawSignature.substring(66, 66 + 64)}`,
//     v: `0x${rawSignature.substring(66 + 64)}`,
//   };
// };

// export default signCompetitionTermsAndConditions;
