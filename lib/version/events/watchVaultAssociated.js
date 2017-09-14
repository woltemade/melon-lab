import setup from "../../utils/setup";
import getConfig from "../../universe/calls/getConfig";
import exchangeEventCollection from "../../exchange/events/exchangeEventCollection";
import parseEvent from "../../utils/parseEvent";

const watchVaultAssociated = async (vaultAddress, onChange) => {
  const universeConfig = await getConfig();

  setup.web3.eth.filter(
    { address: [vaultAddress, universeConfig.exchangeAddress] },
    async (err, tx) => {
      const config = exchangeEventCollection.find(e => e.hash === tx.topics[0]);
      const args = parseEvent(tx, config.abi);
      const enhanced = await config.onEvent(args);
      onChange(err, config.name, enhanced);
    },
  );
};

export default watchVaultAssociated;
