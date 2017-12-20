import Api from "@parity/api";
import setup from "../../utils/setup";
import resolvePromiseObject from "../generic/resolvePromiseObject";
import getBalance from "../../assets/calls/getBalance";
import toReadable from "../../assets/utils/toReadable";

const onBlock = async () => {
  const api = new Api(setup.provider);
  const info = await resolvePromiseObject({
    blockNumber: api.eth.getBlockByNumber().then(block => block.number),
    syncing: api.eth.syncing().then(syncing => !!syncing),
  });

  const accountInfo = setup.defaultAccount
    ? await resolvePromiseObject({
        ethBalance: api.eth
          .getBalance(info.account)
          .then(balance => toReadable(balance)),
        mlnBalance: getBalance("MLN-T", info.account),
      })
    : {};

  return {
    ...info,
    ...accountInfo,
  };
};

export default onBlock;
