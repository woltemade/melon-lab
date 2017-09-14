import { all } from "ramda";

import setupFund from "../../../../lib/version/transactions/setupFund";
import watchMelon from "../../../../lib/version/events/watchMelon";

const randomString = (length = 4) =>
  Math.random().toString(36).substr(2, length);

const fundName = `test-${randomString()}`;

const eventsSeen = {
  FundAdded: false,
  DataUpdated: false,
};

const eventExpectations = {
  FundAdded: args => {
    expect(args.name).toEqual(fundName);
  },
};

it(
  "watchVaultAssociated",
  async () =>
    new Promise(async resolve => {
      watchMelon((err, eventName, args) => {
        console.log(eventName, args);
        eventsSeen[eventName] = args;
        if (eventExpectations[eventName]) eventExpectations[eventName](args);
        if (all(i => i)(Object.values(eventsSeen))) resolve();
      });

      await setupFund(fundName);
    }),
  2 * 60 * 1000,
);
