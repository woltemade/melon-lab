import BigNumber from 'bignumber.js';
import getParityProvider from '../../../../lib/utils/parity/getParityProvider';
import setEnvironment from '../../../../lib/utils/environment/setEnvironment';
import getEnvironment from '../../../../lib/utils/environment/getEnvironment';
import mnemonicWallets from '../../../../mnemonicWallets.json';
import getConfig from '../../../../lib/version/calls/getConfig';
import trace from '../../../../lib/utils/generic/trace';
import getBalance from '../../../../lib/assets/calls/getBalance';

import signTermsAndConditions from '../../../../lib/version/transactions/signTermsAndConditions';
import signCompetitionTermsAndConditions from '../../../../lib/version/transactions/signCompetitionTermsAndConditions';
import setupFund from '../../../../lib/version/transactions/setupFund';
import getFundForManager from '../../../../lib/version/calls/getFundForManager';
import getParticipation from '../../../../lib/participation/calls/getParticipation';
import invest from '../../../../lib/participation/transactions/invest';
import executeRequest from '../../../../lib/participation/transactions/executeRequest';
import awaitDataFeedUpdates from '../../../../lib/pricefeeds/events/awaitDataFeedUpdates';
import makeOrder from '../../../../lib/fund/transactions/makeOrder';
import takeOrder from '../../../../lib/fund/transactions/takeOrder';
import toggleInvestment from '../../../../lib/fund/transactions/toggleInvestment';
import toggleRedemption from '../../../../lib/fund/transactions/toggleRedemption';
import getParticipationAuthorizations from '../../../../lib/fund/calls/getParticipationAuthorizations';
import getOpenOrders from '../../../../lib/fund/calls/getOpenOrders';

import makeOrderFromAccount from '../../../../lib/exchange/transactions/makeOrderFromAccount';
import getOrderbook from '../../../../lib/exchange/calls/getOrderbook';
import performCalculations from '../../../../lib/fund/calls/performCalculations';
import redeem from '../../../../lib/participation/transactions/redeem';
import getRecentTrades from '../../../../lib/exchange/calls/getRecentTrades';
import getFundRecentTrades from '../../../../lib/exchange/calls/getFundRecentTrades';
import importWalletFromMnemonic from '../../../../lib/utils/wallet/importWalletFromMnemonic';
import cancelOrder from '../../../../lib/fund/transactions/cancelOrder';
import getVersionContract from '../../../../lib/version/contracts/getVersionContract';
import getFundContract from '../../../../lib/fund/contracts/getFundContract';
import shutDownFund from '../../../../lib/fund/transactions/shutDownFund';
import getFundInformations from '../../../../lib/fund/calls/getFundInformations';

const INITIAL_SUBSCRIBE_QUANTITY = 50;
const REDEEM_QUANTITY = 5;

const shared = { etherBalance: {}, participation: {}, melonBalance: {} };

const randomString = (length = 4) =>
  Math.random()
    .toString(36)
    .substr(2, length);

fit(
  'Create fund, invest, take order, redeem',
  async () => {
    console.log('\n');

    const { providerType, api } = await getParityProvider(-1);

    // // 1 - instantiate wallet

    const wallet = importWalletFromMnemonic(mnemonicWallets['mnemonic-kovan']);
    // const jsonWallet = JSON.stringify(encryptedWallet);
    // const wallet = await decryptWallet(jsonWallet, password.kovan);

    // const wallet = {
    //   address: '0x00036da4ddcec2b38e668823f201fa2f8260e939',
    // };

    setEnvironment({ api, account: wallet, providerType });

    const environment = getEnvironment();

    trace({
      message: `Start walkthrough with defaultAccount: ${
        environment.account.address
      }`,
    });
    shared.etherBalance.initial = await getBalance(environment, {
      tokenSymbol: 'ETH-T-M',
      ofAddress: environment.account.address,
    });
    trace({ message: `Etherbalance: Ξ${shared.etherBalance.initial} ` });
    shared.melonBalance.initial = await getBalance(environment, {
      tokenSymbol: 'MLN-T-M',
      ofAddress: environment.account.address,
    });
    trace({ message: `Melon Balance: Ⓜ  ${shared.melonBalance.initial} ` });
    expect(shared.melonBalance.initial.toFixed()).toBeGreaterThan(
      INITIAL_SUBSCRIBE_QUANTITY,
    );

    shared.config = await getConfig(environment);
    trace({
      message: `Got config w exchange adapter at ${
        shared.config.exchangeAdapterAddress
      }, simple market at ${
        shared.config.simpleMarketAddress
      } and datafeed at ${shared.config.dataFeedAddress}`,
      data: shared.config,
    });

    const versionContract = await getVersionContract(environment);
    let managerToFunds = await versionContract.instance.managerToFunds.call(
      {},
      [wallet.address],
    );

    // // If wallet already has a fund, need to shut it down before creating a new one -Only for integration purposes
    if (managerToFunds !== '0x0000000000000000000000000000000000000000') {
      console.log('Existing fund needs to be shut down: ', managerToFunds);
      const fundContract = await getFundContract(environment, managerToFunds);
      await shutDownFund(environment, { fundAddress: managerToFunds });
      console.log('Shutting down existing fund');
      managerToFunds = await versionContract.instance.managerToFunds.call({}, [
        environment.account.address,
      ]);
    }

    const signature = await signTermsAndConditions(environment);
    shared.vaultName = randomString();
    shared.vault = await setupFund(environment, {
      name: shared.vaultName,
      signature,
    });
    expect(shared.vault.name).toBe(shared.vaultName);
    expect(shared.vault.address).toBeTruthy();
    expect(shared.vault.inception instanceof Date).toBeTruthy();
    trace({
      message: `vaultCreated: ${shared.vault.name} (${shared.vault.id}) at ${
        shared.vault.address
      }`,
      data: shared,
    });

    const fundCreatedByManager = await getFundForManager(environment, {
      managerAddress: environment.account.address,
    });
    expect(fundCreatedByManager).toBe(shared.vault.address);

    shared.participation.initial = await getParticipation(environment, {
      fundAddress: shared.vault.address,
      investorAddress: environment.account.address,
    });
    expect(shared.participation.initial.personalStake.toNumber()).toBe(0);
    expect(shared.participation.initial.totalSupply.toNumber()).toBe(0);

    shared.initialCalculations = await performCalculations(environment, {
      fundAddress: shared.vault.address,
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    });

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

    shared.subscriptionRequest = await invest(environment, {
      fundAddress: shared.vault.address,
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
      numShares: new BigNumber(INITIAL_SUBSCRIBE_QUANTITY),
      offeredValue: new BigNumber(INITIAL_SUBSCRIBE_QUANTITY),
      isNativeAsset: true,
    });

    trace({
      message: `Subscribe requested. shares: ${
        shared.subscriptionRequest.numShares
      }`,
      data: shared,
    });

    shared.executedSubscriptionRequest = await executeRequest(environment, {
      requestId: shared.subscriptionRequest.id,
      fundAddress: shared.vault.address,
      // 0,
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    });

    trace(`executedSubscriptionRequest ${shared.executedSubscriptionRequest}`);

    shared.participation.invested = await getParticipation(environment, {
      fundAddress: shared.vault.address,
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
      investorAddress: environment.account.address,
    });

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

    shared.midCalculations = await performCalculations(environment, {
      fundAddress: shared.vault.address,
    });

    trace({
      message: `Mid calculations- GAV: ${shared.midCalculations.gav}, NAV: ${
        shared.midCalculations.nav
      }, Share Price: ${shared.midCalculations.sharePrice}, totalSupply: ${
        shared.midCalculations.totalSupply
      }`,
      data: shared,
    });

    shared.redemptionRequest = await redeem(
      environment,
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
      {
        fundAddress: shared.vault.address,
        numShares: REDEEM_QUANTITY,
        requestedValue: REDEEM_QUANTITY,
      },
    );

    trace({
      message: `Redeem requested. shares: ${
        shared.redemptionRequest.numShares
      }`,
      data: shared,
    });

    await awaitDataFeedUpdates(environment, 3);

    trace('Awaited two data feed updates');

    shared.executedRedeemRequest = await executeRequest(environment, {
      requestId: shared.redemptionRequest.id,
      fundAddress: shared.vault.address,
      // "0x75497EBbfFB55EED213529C76E4d0AEd40e9600f",
    });

    shared.participation.invested = await getParticipation(environment, {
      fundAddress: shared.vault.address,
      investorAddress: environment.account.address,
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    });

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

    shared.simpleOrder = await makeOrderFromAccount(environment, {
      buy: {
        howMuch: new BigNumber(1),
        symbol: 'ETH-T-M',
      },
      sell: {
        howMuch: new BigNumber(7),
        symbol: 'MLN-T-M',
      },
    });

    trace({
      message: `Regular account made order with id: ${shared.simpleOrder.id}`,
    });

    // shared.simpleOrder2 = await makeOrderFromAccount(environment, {
    //   sell: {
    //     howMuch: new BigNumber(1),
    //     symbol: 'ETH-T-M',
    //   },
    //   buy: {
    //     howMuch: new BigNumber(7.9),
    //     symbol: 'MLN-T-M',
    //   },
    // });

    // trace({
    //   message: `Regular account made order with id: ${shared.simpleOrder2.id}`,
    // });

    shared.orderFromFund = await makeOrder(environment, {
      fundAddress: shared.vault.address,
      // "0x09B5fc7eCB6B06773d8d7D956a7c84afB1Bb89c0",
      buyWhichToken: 'MLN-T-M',
      sellWhichToken: 'ETH-T-M',
      buyHowMuch: new BigNumber(7.7),
      sellHowMuch: new BigNumber(1),
    });

    trace({
      message: `Fund placed an order with id: ${shared.orderFromFund.id}`,
    });

    await cancelOrder(environment, {
      orderIndex: 0,
      fundAddress: shared.vault.address,
    });

    trace({
      message: `Canceled order ${shared.orderFromFund.id}`,
    });

    // shared.orderBook = await getOrderbook(environment, {
    //   baseTokenSymbol: 'MLN-T-M',
    //   quoteTokenSymbol: 'ETH-T-M',
    // });

    // trace({
    //   message: `Got orderbook for MLN-T/ETH-T-M with length: ${
    //     shared.orderBook.length
    //   }`,
    //   data: shared,
    // });

    // shared.orderBook2 = await getOrderbook(environment, {
    //   baseTokenSymbol: 'MLN-T-M',
    //   quoteTokenSymbol: 'XRP-T',
    // });
    // trace({
    //   message: `Got orderbook for MLN-T/XRP-T with length: ${
    //     shared.orderBook2.length
    //   }`,
    //   data: shared,
    // });

    shared.simpleOrder = await makeOrderFromAccount(environment, {
      buy: {
        howMuch: new BigNumber(1),
        symbol: 'ETH-T-M',
      },
      sell: {
        howMuch: new BigNumber(10),
        symbol: 'MLN-T-M',
      },
    });
    shared.takenOrder = await takeOrder(environment, {
      id: shared.simpleOrder.id,
      // shared.orderBook2[shared.orderBook2.length - 1].id,
      fundAddress: shared.vault.address,
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
      quantityAsked: new BigNumber(1),
    });

    trace({
      message: `Fund took order; executed quantity: ${
        shared.takenOrder.executedQuantity
      }`,
      data: shared,
    });

    shared.openOrders = await getOpenOrders(environment, {
      fundAddress: shared.vault.address,
    });

    // shared.orderFromFund2 = await makeOrder(environment, {
    //   fundAddress: shared.vault.address,
    //   // "0x09B5fc7eCB6B06773d8d7D956a7c84afB1Bb89c0",
    //   sellWhichToken: 'MLN-T-M',
    //   buyWhichToken: 'ETH-T-M',
    //   sellHowMuch: new BigNumber(7.94),
    //   buyHowMuch: new BigNumber(1),
    // });

    // shared.openOrders = await getOpenOrders(environment, {
    //   fundAddress: shared.vault.address,
    // });

    // trace({
    //   message: `Fund placed an order with id: ${shared.orderFromFund2.id}`,
    // });

    // shared.openOrders = await getOpenOrders(environment, {
    //   fundAddress: shared.vault.address,
    // });

    shared.endCalculations = await performCalculations(environment, {
      fundAddress: shared.vault.address,
    });

    trace({
      message: `End calculations- GAV: ${shared.endCalculations.gav}\n NAV: ${
        shared.endCalculations.nav
      }, Share Price: ${shared.endCalculations.sharePrice}, totalSupply: ${
        shared.endCalculations.totalSupply
      }`,
      data: shared,
    });

    shared.toggledSubscription = await toggleInvestment(environment, {
      fundAddress: shared.vault.address,
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    });

    expect(shared.toggledSubscription).toBe(false);

    shared.toggledSubscription = await toggleInvestment(environment, {
      fundAddress: shared.vault.address,
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    });

    expect(shared.toggledSubscription).toBe(true);

    shared.toggledRedemption = await toggleRedemption(environment, {
      fundAddress: shared.vault.address,
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    });

    expect(shared.toggledRedemption).toBe(false);
    shared.toggledRedemption = await toggleRedemption(environment, {
      fundAddress: shared.vault.address,
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    });
    expect(shared.toggledRedemption).toBe(true);

    shared.participationAuthorizations = await getParticipationAuthorizations(
      environment,
      { fundAddress: shared.vault.address },
      // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    );
    expect(shared.participationAuthorizations.subscriptionAllowed).toBe(true);
    expect(shared.participationAuthorizations.redemptionAllowed).toBe(true);

    shared.recentTrades = await getRecentTrades(environment, {
      baseTokenSymbol: 'ETH-T-M',
      quoteTokenSymbol: 'MLN-T-M',
    });
    shared.fundRecentTrades = await getFundRecentTrades(environment, {
      fundAddress: shared.vault.address,
    });
    expect(shared.recentTrades.length).toBeGreaterThan(1);
    expect(shared.fundRecentTrades.length).toBeGreaterThan(1);
  },
  10 * 60 * 1000,
);
