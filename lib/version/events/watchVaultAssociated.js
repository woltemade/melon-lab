import SolidityCoder from "web3/lib/solidity/coder";
import setup from "../../utils/setup";
import getConfig from "../../universe/calls/getConfig";
import exchangeEventCollection from "../../exchange/events/exchangeEventCollection";

const watchVaultAssociated = async (vaultAddress, onChange) => {
  const universeConfig = await getConfig();

  console.log(JSON.stringify(exchangeEventCollection, null, 4));

  setup.web3.eth.filter(
    { address: [vaultAddress, universeConfig.exchangeAddress] },
    (err, tx) => {
      const eventAbi = exchangeEventCollection.find(
        e => e.topic === tx.topics[0],
      );

      const params = console.log(
        JSON.stringify({ err, tx, eventAbi }, null, 4),
      );
    },
  );
};

export default watchVaultAssociated;

/*
res = {
  address: "0x81bfb6a2db736c5ec06ddf4654478cf78b3e0be7",
  blockHash:
    "0x5f25c8284cbc6a58f999c7b853dc1f2e05e4d6a26eb7d8a698c1c3094ee55423",
  blockNumber: 3774317,
  data: "0x00000000000000000000000000000000000000000000000000000000000b468c",
  logIndex: 5,
  topics: [
    "0xcea04943b36b38f541b87028ed4da18dded81fd7741867c8320734d24b5b0ece",
  ],
  transactionHash:
    "0x60bfa04a24b46630ad8a72864fe1877b19963a2313978aaaa1c06b2c2627fd36",
  transactionIndex: 2,
  transactionLogIndex: "0x1",
  type: "mined",
};
*/
