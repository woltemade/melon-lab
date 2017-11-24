import pify from "pify";
import resolvePromiseObject from "../generic/resolvePromiseObject";
import getBalance from "../../assets/calls/getBalance";

const onBlock = async web3 => {
  const info = await resolvePromiseObject({
    blockNumber: pify(web3.eth.getBlockNumber)(),
    syncing: pify(web3.eth.getSyncing)().then(syncing => !!syncing),
    account: pify(web3.eth.getAccounts)().then(accounts => accounts[0]),
  });

  const accountInfo = info.account
    ? await resolvePromiseObject({
        ethBalance: pify(web3.eth.getBalance)(info.account).then(balance =>
          web3.fromWei(balance),
        ),
        mlnBalance: getBalance(info.account),
      })
    : {};

  info.network = web3.version.network;

  return {
    ...info,
    ...accountInfo,
  };
};

export default onBlock;
