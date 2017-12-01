import Api from "@parity/api";
// import getVersionContract from "../contracts/getVersionContract";
import Wallet from "ethers-wallet";
import setup from "../../utils/setup";

const sigUtil = require("eth-sig-util");
const ethUtil = require("ethereumjs-util");

const signTermsAndConditions = async () => {
  // const versionContract = await getVersionContract();
  const api = new Api(setup.provider);
  // const hash = await versionContract.instance.TERMS_AND_CONDITIONS.call() INVALID FORMAT (?)
  const hash =
    "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";

  const sigUtilSignature = sigUtil.personalSign(
    ethUtil.toBuffer(setup.wallet.privateKey),
    { data: hash },
  );
  const personalSignature = sigUtilSignature.substr(2, sigUtilSignature.length);
  const rsv = {};
  rsv.r = `0x${personalSignature.substr(0, 64)}`;
  rsv.s = `0x${personalSignature.substr(64, 64)}`;
  rsv.v = parseFloat(personalSignature.substr(128, 2)) + 27;

  return rsv;
};

export default signTermsAndConditions;

// WITH PARITY
// const rawparitySignature = await api.eth.sign(
//   "0x2809a8B74D51eEcFE4d229a47937964e43D55c30",
//   hash,
// );
// const paritySignature = rawparitySignature.substr(
//   2,
//   rawparitySignature.length,
// );
// const parityResult = {};
// parityResult.r = `0x${paritySignature.substr(0, 64)}`;
// parityResult.s = `0x${paritySignature.substr(64, 64)}`;
// parityResult.v = parseFloat(paritySignature.substr(128, 2)) + 27;
// console.log("Parity signature ", paritySignature);
// console.log("Parity result ", parityResult);

// WITH ETHERS-WALLET
// // ignore this line (just personal memo): const hashed = Api.util.sha3("\x19Ethereum Signed Message:\n32", hash);
// const rawSignature = setup.wallet.signMessage(hash);
// const walletSignature = rawSignature.substr(2, rawSignature.length);
// const walletResult = {};
// walletResult.r = `0x${walletSignature.substr(0, 64)}`;
// walletResult.s = `0x${walletSignature.substr(64, 64)}`;
// walletResult.v = parseFloat(walletSignature.substr(128, 2)) + 27;
// console.log("Wallet signature ", walletSignature);
// console.log("Wallet result ", walletResult);

// const verification = Wallet.Wallet.verifyMessage(hash, sigUtilSignature);
// console.log("Verification ", verification);
