import setup from "../../utils/setup";
import getConfig from "../calls/getConfig";
import exchangeEventCollection from "../../exchange/events/exchangeEventCollection";
import parseEvent from "../../utils/parseEvent";

const watchMelon = async onChange => {
  const versionConfig = await getConfig();

  console.log(versionConfig);

  setup.web3.eth.filter(
    {
      address: [versionConfig.exchangeAddress, versionConfig.versionAddress],
    },
    async (err, tx) => {
      const config = exchangeEventCollection.find(e => e.hash === tx.topics[0]);
      if (!config) {
        console.warn("no config found for", tx);
        return;
      }
      const args = parseEvent(tx, config.abi);
      const enhanced = await config.onEvent(args);
      onChange(err, config.name, enhanced);
    },
  );
};

export default watchMelon;
