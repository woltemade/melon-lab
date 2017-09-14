import setup from "../../utils/setup";
import getConfig from "../../universe/calls/getConfig";
import exchangeEventCollection from "../../exchange/events/exchangeEventCollection";
import parseEvent from "../../utils/parseEvent";

const watchVaultAssociated = async (vaultAddress, onChange) => {
  const universeConfig = await getConfig();

  setup.web3.eth.filter(
    { address: [vaultAddress, universeConfig.exchangeAddress] },
    (err, tx) => {
      const schema = exchangeEventCollection.find(e => e.hash === tx.topics[0]);

      const args = parseEvent(tx, schema.abi);

      onChange(err, schema.name, args);
    },
  );
};

export default watchVaultAssociated;
