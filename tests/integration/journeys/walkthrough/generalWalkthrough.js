import BigNumber from "bignumber.js";
import { findLast, propEq } from "ramda";

import setup from "../../../../lib/utils/setup";
import trace from "../../../../lib/utils/trace";
import setupVault from "../../../../lib/version/transactions/setupVault";
import vaultForManager from "../../../../lib/version/calls/vaultForManager";
import getParticipation from "../../../../lib/participation/calls/getParticipation";
import subscribe from "../../../../lib/participation/transactions/subscribe";

/*
import getOrderbook from "../../../../lib/exchange/calls/getOrderbook";
import takeOrder from "../../../../lib/vault/transactions/takeOrder";
import redeem from "../../../../lib/participation/transactions/redeem";
*/
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

    shared.vaultName = `test-${randomString()}`;
    shared.vault = await setupVault(shared.vaultName);
    expect(shared.vault.name).toBe(shared.vaultName);
    expect(shared.vault.id).toBeGreaterThan(0);
    expect(shared.vault.address).toBeTruthy();
    expect(shared.vault.timestamp instanceof Date).toBeTruthy();
    trace({
      message: `vaultCreated: ${shared.vault.name} (${shared.vault
        .id}) at ${shared.vault.address}`,
      data: shared,
    });

    const vaultAddress = await vaultForManager(setup.defaultAccount);
    expect(vaultAddress).toBe(shared.vault.address);

    shared.participation.initial = await getParticipation(
      shared.vault.address,
      setup.defaultAccount,
    );
    expect(shared.participation.initial.personalStake.toNumber()).toBe(0);
    expect(shared.participation.initial.totalSupply.toNumber()).toBe(0);

    shared.subscription = await subscribe(
      shared.vault.address,
      new BigNumber(3),
      new BigNumber(3),
    );
    trace({
      message: `subscribed. shares: ${shared.subscription.received} @ ${shared
        .subscription.price} per share`,
      data: shared,
    });
    shared.participation.invested = await getParticipation(
      shared.vault.address,
      setup.defaultAccount,
    );
    expect(shared.participation.invested.personalStake.toNumber()).toBe(3);
    expect(shared.participation.invested.totalSupply.toNumber()).toBe(3);

    /*
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

    shared.redeem = await redeem(
      setup.defaultAccount,
      shared.vault.address,
      new BigNumber(5),
    );
    */
  },
  10 * 60 * 1000,
);
