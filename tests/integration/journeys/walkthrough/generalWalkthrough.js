import BigNumber from "bignumber.js";
import Api from "@parity/api";
import Wallet from "ethers-wallet";

import setup from "../../../../lib/utils/setup";
import encryptedWallet from "../../../../encryptedWallet.json";
import password from "../../../../password.json";
import getConfig from "../../../../lib/version/calls/getConfig";
import trace from "../../../../lib/utils/generic/trace";
import getBalance from "../../../../lib/assets/calls/getBalance";

import signTermsAndConditions from "../../../../lib/version/transactions/signTermsAndConditions";
import setupFund from "../../../../lib/version/transactions/setupFund";
import getFundForManager from "../../../../lib/version/calls/getFundForManager";
import getParticipation from "../../../../lib/participation/calls/getParticipation";
import subscribe from "../../../../lib/participation/transactions/subscribe";
import executeRequest from "../../../../lib/participation/transactions/executeRequest";
import awaitDataFeedUpdates from "../../../../lib/datafeeds/events/awaitDataFeedUpdates";
import makeOrder from "../../../../lib/fund/transactions/makeOrder";
import toggleSubscription from "../../../../lib/fund/transactions/toggleSubscription";
import toggleRedemption from "../../../../lib/fund/transactions/toggleRedemption";
import getParticipationAuthorizations from "../../../../lib/fund/calls/getParticipationAuthorizations";
import makeOrderFromExchange from "../../../../lib/exchange/transactions/makeOrderFromExchange";
import getOrderbook from "../../../../lib/exchange/calls/getOrderbook";
import takeOrder from "../../../../lib/fund/transactions/takeOrder";
import performCalculations from "../../../../lib/fund/calls/performCalculations";
import redeem from "../../../../lib/participation/transactions/redeem";
import getRecentTrades from "../../../../lib/exchange/calls/getRecentTrades";
import getFundRecentTrades from "../../../../lib/exchange/calls/getFundRecentTrades";
import getParityProvider from "../../../../lib/utils/parity/getParityProvider";
import createWallet from "../../../../lib/utils/wallet/createWallet";
import encryptWallet from "../../../../lib/utils/wallet/encryptWallet";
import decryptWallet from "../../../../lib/utils/wallet/decryptWallet";

const INITIAL_SUBSCRIBE_QUANTITY = 20;
const REDEEM_QUANTITY = 5;

const shared = { etherBalance: {}, participation: {}, melonBalance: {} };

const randomString = (length = 4) =>
  Math.random()
    .toString(36)
    .substr(2, length);

fit(
  "Create fund, invest, take order, redeem",
  async () => {
    console.log("\n");
    const api = new Api(setup.provider);

    // 1 - instantiate wallet
    const jsonWallet = JSON.stringify(encryptedWallet);
    const wallet = await decryptWallet(jsonWallet, password.kovan);
    setup.wallet = wallet;

    trace({
      message: `Start walkthrough with defaultAccount: ${setup.defaultAccount}`,
      data: setup,
    });
    shared.etherBalance.initial = await getBalance("ETH-T");
    trace({ message: `Etherbalance: Ξ${shared.etherBalance.initial} ` });
    shared.melonBalance.initial = await getBalance("MLN-T");
    trace({ message: `Melon Balance: Ⓜ  ${shared.melonBalance.initial} ` });
    expect(shared.melonBalance.initial.toFixed()).toBeGreaterThan(
      INITIAL_SUBSCRIBE_QUANTITY,
    );

    shared.config = await getConfig();

    trace({
      message: `Got config w exchange at ${
        shared.config.exchangeAddress
      },and datafeed at ${shared.config.dataFeedAddress}`,
      data: shared.config,
    });

    const signature = await signTermsAndConditions();

    shared.vaultName = `test-${randomString()}`;
    shared.vault = await setupFund(
      shared.vaultName,
      signature.v,
      signature.r,
      signature.s,
    );
    expect(shared.vault.name).toBe(shared.vaultName);
    expect(shared.vault.id).toBeGreaterThanOrEqual(0);
    expect(shared.vault.address).toBeTruthy();
    expect(shared.vault.inception instanceof Date).toBeTruthy();
    trace({
      message: `vaultCreated: ${shared.vault.name} (${shared.vault.id}) at ${
        shared.vault.address
      }`,
      data: shared,
    });

    const fundCreatedByManager = await getFundForManager(setup.defaultAccount);
    expect(fundCreatedByManager).toBe(shared.vault.address);

    shared.participation.initial = await getParticipation(
      shared.vault.address,
      setup.defaultAccount,
    );
    expect(shared.participation.initial.personalStake.toNumber()).toBe(0);
    expect(shared.participation.initial.totalSupply.toNumber()).toBe(0);

    shared.initialCalculations = await performCalculations(
      shared.vault.address,
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    );

    trace({
      message: `Initial calculations- GAV: ${
        shared.initialCalculations.gav
      }, NAV: ${shared.initialCalculations.nav}, Share Price: ${
        shared.initialCalculations.sharePrice
      }, totalSupply: ${shared.initialCalculations.totalSupply}`,
      data: shared,
    });
    expect(shared.initialCalculations.sharePrice.toNumber()).toBe(1);
    expect(shared.initialCalculations.gav.toNumber()).toBe(0);

    shared.subscriptionRequest = await subscribe(
      shared.vault.address,
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
      new BigNumber(INITIAL_SUBSCRIBE_QUANTITY),
      new BigNumber(INITIAL_SUBSCRIBE_QUANTITY),
    );

    trace({
      message: `Subscribe requested. shares: ${
        shared.subscriptionRequest.numShares
      }`,
      data: shared,
    });

    shared.executedSubscriptionRequest = await executeRequest(
      shared.subscriptionRequest.id,
      shared.vault.address,
      // 0,
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    );

    trace(`executedSubscriptionRequest ${shared.executedSubscriptionRequest}`);

    shared.participation.invested = await getParticipation(
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
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
      message: `Subscribe request executed. Personal stake: ${
        shared.participation.invested.personalStake
      }`,
    });

    shared.midCalculations = await performCalculations(shared.vault.address);

    trace({
      message: `Mid calculations- GAV: ${shared.midCalculations.gav}, NAV: ${
        shared.midCalculations.nav
      }, Share Price: ${shared.midCalculations.sharePrice}, totalSupply: ${
        shared.midCalculations.totalSupply
      }`,
      data: shared,
    });

    shared.redemptionRequest = await redeem(
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
      shared.vault.address,
      REDEEM_QUANTITY,
      REDEEM_QUANTITY,
    );

    trace({
      message: `Redeem requested. shares: ${
        shared.redemptionRequest.numShares
      }`,
      data: shared,
    });

    await awaitDataFeedUpdates(2);

    trace("Awaited two data feed updates");

    shared.executedRedeemRequest = await executeRequest(
      shared.redemptionRequest.id,
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
      shared.vault.address,
    );

    shared.participation.invested = await getParticipation(
      shared.vault.address,
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
      setup.defaultAccount,
    );

    expect(shared.participation.invested.personalStake.toNumber()).toBe(
      INITIAL_SUBSCRIBE_QUANTITY - REDEEM_QUANTITY,
    );
    expect(shared.participation.invested.totalSupply.toNumber()).toBe(
      INITIAL_SUBSCRIBE_QUANTITY - REDEEM_QUANTITY,
    );

    trace({
      message: `Redeem request executed. Personal stake: ${
        shared.participation.invested.personalStake
      }`,
    });

    shared.simpleOrder = await makeOrder({
      sell: {
        howMuch: new BigNumber(1),
        symbol: "ETH-T",
      },
      buy: {
        howMuch: new BigNumber(4),
        symbol: "MLN-T",
      },
    });

    trace({
      message: `Regular account made order with id: ${shared.simpleOrder.id}`,
    });

    shared.orderFromFund = await makeOrderFromFund(
      // shared.vault.address,
      "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
      "MLN-T",
      "ETH-T",
      new BigNumber(1),
      new BigNumber(1),
    );

    trace({
      message: `Fund placed an order with id: ${shared.orderFromFund.id}`,
    });

    shared.orderBook = await getOrderbook("MLN-T", "ETH-T");

    trace({
      message: `Got orderbook for MLN-T/ETH-T with length: ${
        shared.orderBook.length
      }`,
      data: shared,
    });

    shared.takenOrder = await takeOrderFromFund(
      shared.simpleOrder.id,
      shared.vault.address,
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
      new BigNumber(1.5),
    );

    trace({
      message: `Fund took order; executed quantity: ${
        shared.takenOrder.executedQuantity
      }`,
      data: shared,
    });

    shared.endCalculations = await performCalculations(shared.vault.address);

    trace({
      message: `End calculations- GAV: ${shared.endCalculations.gav}\n NAV: ${
        shared.endCalculations.nav
      }, Share Price: ${shared.endCalculations.sharePrice}, totalSupply: ${
        shared.endCalculations.totalSupply
      }`,
      data: shared,
    });

    shared.toggledSubscription = await toggleSubscription(
      shared.vault.address,
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
      setup.defaultAccount,
    );

    expect(shared.toggledSubscription).toBe(false);

    shared.toggledSubscription = await toggleSubscription(
      shared.vault.address,
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
      setup.defaultAccount,
    );

    expect(shared.toggledSubscription).toBe(true);

    shared.toggledRedemption = await toggleRedemption(
      shared.vault.address,
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
      setup.defaultAccount,
    );

    expect(shared.toggledRedemption).toBe(false);
    shared.toggledRedemption = await toggleRedemption(
      shared.vault.address,
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
      setup.defaultAccount,
    );
    expect(shared.toggledRedemption).toBe(true);

    shared.participationAuthorizations = await getParticipationAuthorizations(
      shared.vault.address,
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    );
    expect(shared.participationAuthorizations.subscriptionAllowed).toBe(true);
    expect(shared.participationAuthorizations.redemptionAllowed).toBe(true);

    shared.recentTrades = await getRecentTrades("ETH-T", "MLN-T");
    shared.fundRecentTrades = await getFundRecentTrades(shared.vault.address);
    expect(shared.recentTrades.length).toBe(true);
    expect(shared.fundRecentTrades.length).toBe(true);

    console.log("RECENT TRADES ", shared.recentTrades);
    console.log("FUND RECENT TRADES ", shared.fundRecentTrades);
  },
  10 * 60 * 1000,
);
