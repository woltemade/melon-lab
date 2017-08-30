import BigNumber from "bignumber.js";
import { findLast, propEq } from "ramda";

import setup from "../../../../lib/utils/setup";
import trace from "../../../../lib/utils/trace";
import getParticipation from "../../../../lib/participation/calls/getParticipation";
import createVault from "../../../../lib/vault/transactions/createVault";
import subscribe from "../../../../lib/participation/transactions/subscribe";
import getOrderbook from "../../../../lib/exchange/calls/getOrderbook";
import takeOrder from "../../../../lib/vault/transactions/takeOrder";

const shared = { userBalance: {}, participation: {} };

const randomString = (length = 4) =>
  Math.random().toString(36).substr(2, length);

it(
  "Create fund, invest, take order, redeem",
  async () => {
    console.log("\n");

    shared.userBalance.initial = setup.web3.fromWei(
      setup.web3.eth.getBalance(setup.defaultAccount),
    );
    expect(shared.userBalance.initial.toFixed()).toBeGreaterThan(3);

    trace({
      message: `Start walkthrough with defaultAccount: ${setup.defaultAccount}, Ξ${shared
        .userBalance.initial}`,
      data: setup,
    });

    shared.vault = await createVault(`test-${randomString()}`);
    shared.participation.initial = await getParticipation(
      shared.vault.address,
      setup.defaultAccount,
    );
    trace({
      message: `vaultCreated: ${shared.vault.address}`,
      data: shared,
    });
    expect(shared.participation.initial.personalStake.toNumber()).toBe(0);
    expect(shared.participation.initial.totalSupply.toNumber()).toBe(0);

    await subscribe(shared.vault.address, new BigNumber(5), new BigNumber(5));
    trace({ message: `subscribed`, data: shared });
    shared.participation.invested = await getParticipation(
      shared.vault.address,
      setup.defaultAccount,
    );
    expect(shared.participation.invested.personalStake.toNumber()).toBe(5);
    expect(shared.participation.invested.totalSupply.toNumber()).toBe(5);

    shared.orderBook = await getOrderbook("MLN-T", "ETH-T");
    trace({
      message: `Got orderbook for MLN-T/ETH-T with length: ${shared.orderBook
        .length}`,
      data: shared,
    });

    const orderToTake = findLast(propEq("type", "sell"))(shared.orderBook);
    trace({ message: `orderToTake: ${orderToTake.id}`, data: orderToTake });

    await takeOrder(
      orderToTake.id,
      setup.defaultAccount,
      shared.vault.address,
      new BigNumber(2),
    );
  },
  10 * 60 * 1000,
);
