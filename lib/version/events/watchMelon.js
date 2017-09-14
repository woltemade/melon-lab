import { flatten } from "ramda";

import SimpleMarketJson from "@melonproject/protocol/build/contracts/SimpleMarket.json";
import DataFeedJson from "@melonproject/protocol/build/contracts/DataFeed.json";
import VersionJson from "@melonproject/protocol/build/contracts/Version.json";

import setup from "../../utils/setup";
import getConfig from "../calls/getConfig";
import extractEventDefinitions from "../../utils/extractEventDefinitions";
import parseEvent from "../../utils/parseEvent";
import onOrderUpdate from "../../exchange/events/onOrderUpdate";

const onEventMap = {
  OrderUpdate: onOrderUpdate,
};

const eventDefinitions = flatten(
  [SimpleMarketJson, VersionJson, DataFeedJson].map(json =>
    extractEventDefinitions(json, onEventMap),
  ),
);

const isBigNumber = candidate => candidate instanceof setup.web3.BigNumber;

const commonEventCleaner = args => {
  const cleaned = { ...args };
  if (isBigNumber(args.id)) cleaned.id = args.id.toNumber();
  if (isBigNumber(args.atTime))
    cleaned.atTime = new Date(args.atTime.times(1000).toNumber());
  return cleaned;
};

const watchMelon = async onChange => {
  const versionConfig = await getConfig();

  setup.web3.eth.filter(
    {
      address: [
        versionConfig.exchangeAddress,
        versionConfig.versionAddress,
        versionConfig.dataFeedAddress,
      ],
    },
    async (err, tx) => {
      const config = eventDefinitions.find(e => e.hash === tx.topics[0]);
      if (!config) {
        console.warn("no config found for", tx);
        return;
      }
      const args = parseEvent(tx, config.abi);
      const cleaned = commonEventCleaner(args);
      const enhanced = config.onEvent ? await config.onEvent(cleaned) : cleaned;
      onChange(err, config.name, enhanced);
    },
  );
};

export default watchMelon;
