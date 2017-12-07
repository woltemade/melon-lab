import Api from "@parity/api";
// import getVersionContract from "../contracts/getVersionContract";
import Utils from "ethers-utils";
import setup from "../../utils/setup";

const signTermsAndConditions = async () => {
  // const versionContract = await getVersionContract();
  const api = new Api(setup.provider);
  // const hash = await versionContract.instance.TERMS_AND_CONDITIONS.call() INVALID FORMAT (?)
  const hash =
    "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";
  const hashData = Utils.arrayify(hash);

  const rawSignature = setup.wallet.signMessage(hashData);
  const signature = rawSignature.substr(2, rawSignature.length);

  return {
    r: `0x${signature.substr(0, 64)}`,
    s: `0x${signature.substr(64, 64)}`,
    v: parseFloat(signature.substr(128, 2)) + 27,
  };
};

export default signTermsAndConditions;
