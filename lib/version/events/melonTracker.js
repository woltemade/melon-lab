import { flatten } from "ramda";

import SimpleMarketJson from "@melonproject/protocol/build/contracts/SimpleMarket.json";
import DataFeedJson from "@melonproject/protocol/build/contracts/DataFeed.json";
import VersionJson from "@melonproject/protocol/build/contracts/Version.json";

import setup from "../../utils/setup";
import trace from "../../utils/trace";
import parseEvent from "../../utils/parseEvent";
import extractEventDefinitions from "../../utils/extractEventDefinitions";
import onOrderUpdate from "../../exchange/events/onOrderUpdate";

const hashes = new Set();
const addresses = new Set();

let web3Filter;

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

const distribute = (subscriptions, name, args) => {
  subscriptions.forEach(sub => {
    const { filters, callback } = sub;
    if (filters.includes(name)) {
      if (filters.length > 1) {
        callback(name, args);
      } else {
        callback(args);
      }
    }
  });
};

const onError = (error, data, subscriptions) => {
  trace({
    message: "Error in MelonTracker",
    category: "error",
    data: { data, error },
  });

  const errorSubscriptions = subscriptions
    ? subscriptions.filter(sub => sub.filters.includes("error"))
    : [];
  if (errorSubscriptions.length > 0) {
    errorSubscriptions.forEach(sub => {
      const { filters, callback } = sub;
      if (filters.length > 1) {
        callback("error", error, data);
      } else {
        callback(error, data);
      }
    });
  } else {
    throw error;
  }
};

const updateFilter = subscriptions => {
  if (web3Filter) web3Filter.stopWatching();

  if (addresses.size || hashes.size) {
    const filter = {
      address: [...addresses.values()],
      // only filter for topics if there is only one topic. Otherwise, topics are
      // ANDed together and nothing is catched
      topics:
        hashes.size === 1 ? [...hashes.values()].map(h => [h]) : undefined,
    };
    web3Filter = setup.web3.eth.filter(filter);

    web3Filter.watch(async (err, event) => {
      if (err) onError(err);
      if (hashes.has(event.topics[0])) {
        const config = eventDefinitions.find(e => e.hash === event.topics[0]);
        if (!config)
          onError(new Error(`No event config for ${event.topics[0]}`));
        const args = parseEvent(event, config.abi);
        const cleaned = commonEventCleaner(args);
        const enhanced = config.onEvent
          ? await config.onEvent(cleaned)
          : cleaned;
        distribute(subscriptions, config.name, enhanced);
      }
    });
  }
};

const implementFilters = (filters, subscriptions, preventUpdate) => {
  let needsUpdate = false;

  filters.forEach(filter => {
    const definition = eventDefinitions.find(def => def.name === filter);
    if (!definition) throw new Error(`No event definition found for ${filter}`);
    if (!hashes.has(definition.hash)) {
      needsUpdate = true;
      hashes.add(definition.hash);
    }
    if (!addresses.has(definition.address)) {
      needsUpdate = true;
      addresses.add(definition.address);
    }
  });

  if (needsUpdate && !preventUpdate) updateFilter(subscriptions);
};

const refreshFilters = (subscriptions, preventUpdate) => {
  hashes.clear();
  addresses.clear();

  if (subscriptions.size) {
    subscriptions.forEach(sub => {
      implementFilters(sub.filters, subscriptions, preventUpdate);
    });
  } else if (!preventUpdate) {
    if (web3Filter) web3Filter.stopWatching();
  }
};

const subscriptions = new Proxy(new Set(), {
  get(target, property, receiver) {
    if (property === "add") {
      return arg => {
        implementFilters(arg.filters, receiver);
        target.add(arg);
      };
    } else if (property === "delete") {
      return (arg, preventUpdate) => {
        target.delete(arg);
        refreshFilters(receiver, preventUpdate);
      };
    } else if (property === "clear") {
      return () => {
        target.clear();
        hashes.clear();
        addresses.clear();
        if (web3Filter) web3Filter.stopWatching();
      };
    }
    return target[property];
  },
});

const melonTracker = {
  on(...filters) {
    let hoistedSubscription;

    const tracker = callback => {
      hoistedSubscription = { filters, callback };
      subscriptions.add(hoistedSubscription);
    };

    tracker.stop = () => {
      subscriptions.delete(hoistedSubscription);
    };

    tracker.times = n =>
      new Promise(resolve => {
        let i = 0;

        const waiting = {
          filters,
          callback: (name, args) => {
            i += 1;
            if (i >= n) {
              subscriptions.delete(waiting);
              resolve(name, args);
            }
          },
        };

        subscriptions.add(waiting);
      });

    tracker.next = () => tracker.times(1);

    return tracker;
  },

  off(...filters) {
    if (filters.length > 0) {
      let needsUpdate = false;

      filters.forEach(filter => {
        subscriptions
          .find(sub => sub.filters.includes(filter))
          .forEach(staleSub => {
            needsUpdate = true;
            subscriptions.delete(staleSub, true);
          });
      });

      if (needsUpdate) updateFilter(subscriptions);
    } else {
      subscriptions.clear();
    }
  },
};

export default melonTracker;
