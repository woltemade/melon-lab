import BigNumber from "bignumber.js";
// import { findLast, propEq } from "ramda";

import setup from "../../../../lib/utils/setup";
import getConfig from "../../../../lib/version/calls/getConfig";
import trace from "../../../../lib/utils/trace";
import getBalance from "../../../../lib/assets/calls/getBalance";
import setupFund from "../../../../lib/version/transactions/setupFund";
import getFundForManager from "../../../../lib/version/calls/getFundForManager";
import getParticipation from "../../../../lib/participation/calls/getParticipation";
import subscribe from "../../../../lib/participation/transactions/subscribe";
import executeRequest from "../../../../lib/participation/transactions/executeRequest";
import awaitDataFeedUpdates from "../../../../lib/datafeeds/events/awaitDataFeedUpdates";
import makeOrderFromFund from "../../../../lib/fund/transactions/makeOrderFromFund";
import makeOrder from "../../../../lib/exchange/transactions/makeOrder";
import cancelOrder from "../../../../lib/exchange/transactions/cancelOrder";

/*
import getOrderbook from "../../../../lib/exchange/calls/getOrderbook";
import takeOrderFromFund from "../../../../lib/fund/transactions/takeOrderFromFund";
import redeem from "../../../../lib/participation/transactions/redeem";
*/

const INITIAL_SUBSCRIBE_QUANTITY = 50;

const shared = { etherBalance: {}, participation: {}, melonBalance: {} };

const randomString = (length = 4) =>
  Math.random().toString(36).substr(2, length);

it(
  "Create fund, invest, take order, redeem",
  async () => {
    console.log("\n");

    expect(setup.web3.eth.syncing).toBeFalsy();

    shared.etherBalance.initial = setup.web3.fromWei(
      setup.web3.eth.getBalance(setup.defaultAccount),
    );
    expect(shared.etherBalance.initial.toFixed()).toBeGreaterThan(
      INITIAL_SUBSCRIBE_QUANTITY,
    );
    trace({
      message: `Start walkthrough with defaultAccount: ${setup.defaultAccount}`,
      data: setup,
    });
    trace({ message: `Etherbalance: Ξ${shared.etherBalance.initial} ` });
    shared.melonBalance.initial = await getBalance("MLN-T");
    trace({ message: `Melon Balance: Ⓜ  ${shared.melonBalance.initial} ` });

    shared.config = await getConfig();
    trace({
      message: `Got config w exchange at ${shared.config
        .exchangeAddress}, and datafeed at ${shared.config.dataFeedAddress}`,
      data: shared.config,
    });

    shared.vaultName = `test-${randomString()}`;
    shared.vault = await setupFund(shared.vaultName);
    expect(shared.vault.name).toBe(shared.vaultName);
    expect(shared.vault.id).toBeGreaterThanOrEqual(0);
    expect(shared.vault.address).toBeTruthy();
    expect(shared.vault.timestamp instanceof Date).toBeTruthy();
    trace({
      message: `vaultCreated: ${shared.vault.name} (${shared.vault
        .id}) at ${shared.vault.address}`,
      data: shared,
    });

    const vaultAddress = await getFundForManager(setup.defaultAccount);
    expect(vaultAddress).toBe(shared.vault.address);

    shared.participation.initial = await getParticipation(
      shared.vault.address,
      setup.defaultAccount,
    );
    expect(shared.participation.initial.personalStake.toNumber()).toBe(0);
    expect(shared.participation.initial.totalSupply.toNumber()).toBe(0);

    shared.subscriptionRequest = await subscribe(
      shared.vault.address,
      new BigNumber(INITIAL_SUBSCRIBE_QUANTITY),
      new BigNumber(INITIAL_SUBSCRIBE_QUANTITY),
    );
    trace({
      message: `Subscribe requested. shares: ${shared.subscriptionRequest
        .numShares}`,
      data: shared,
    });

    await awaitDataFeedUpdates(2);

    shared.executedRequest = await executeRequest(
      shared.subscriptionRequest.id,
      shared.vault.address,
    );

    shared.participation.invested = await getParticipation(
      shared.vault.address,
      setup.defaultAccount,
    );

    expect(shared.participation.invested.personalStake.toNumber()).toBe(
      INITIAL_SUBSCRIBE_QUANTITY,
    );
    expect(shared.participation.invested.totalSupply.toNumber()).toBe(
      INITIAL_SUBSCRIBE_QUANTITY,
    );

    trace({
      message: `Subscribe request executed. Personal stake: ${shared
        .participation.invested.personalStake}`,
    });

    shared.simpleOrder = await makeOrder(
      new BigNumber(1),
      "ETH-T",
      new BigNumber(2),
      "MLN-T",
    );
    trace({ message: `Made order with id: ${shared.simpleOrder.id}` });

    shared.canceledOrder = await cancelOrder(
      shared.simpleOrder.id - 1,
      setup.defaultAccount,
    );

    // console.log(shared.canceledOrder);

    shared.orderFromFund = await makeOrderFromFund(
      shared.vault.address,
      // "0x1ccb2ecc8465d200cea06383068d44110a65ed92",
      "MLN-T",
      "ETH-T",
      new BigNumber(4),
      new BigNumber(1),
    );

    console.log(shared.orderFromFund);

    // shared.orderBook = await getOrderbook("MLN-T", "ETH-T");
    // trace({
    //   message: `Got orderbook for MLN-T/ETH-T with length: ${shared.orderBook
    //     .length}`,
    //   data: shared,
    // });

    // const orderToTake = findLast(propEq("type", "sell"))(shared.orderBook);
    // trace({ message: `orderToTake: ${orderToTake.id}`, data: orderToTake });

    // shared.takenOrder = await takeOrderFromFund(
    //   shared.simpleOrder.id,
    //   setup.defaultAccount,
    //   "0xcaf546dce6f793a11e872a5878881e537c306c67",
    //   new BigNumber(2),
    // );

    // console.log(shared.takenOrder);
    /*
    shared.redeem = await redeem(
      setup.defaultAccount,
      shared.vault.address,
      new BigNumber(5),
    );
    */
  },
  10 * 60 * 1000,
);
