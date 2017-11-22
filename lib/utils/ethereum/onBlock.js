import pify from "pify";
import resolvePromiseObject from "../generic/resolvePromiseObject";

const onBlock = async web3 => {
  const info = await resolvePromiseObject({
    blockNumber: pify(web3.eth.getBlockNumber)(),
    syncing: pify(web3.eth.getSyncing)().then(syncing => !!syncing),
    account: pify(web3.eth.getAccounts)().then(accounts => accounts[0]),
  });

  info.balance = info.account
    ? await pify(web3.eth.getBalance)(info.account).then(balance =>
        web3.fromWei(balance),
      )
    : null;
  info.network = web3.version.network;

  return info;
};

export default onBlock;
