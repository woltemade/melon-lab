/* eslint-disable */
import BigNumber from 'bignumber.js';
import getParityProvider from '../../../../lib/utils/parity/getParityProvider';
import setEnvironment from '../../../../lib/utils/environment/setEnvironment';
import getEnvironment from '../../../../lib/utils/environment/getEnvironment';
import mnemonicWallets from '../../../../mnemonicWallets.json';
import getConfig from '../../../../lib/version/calls/getConfig';
import trace from '../../../../lib/utils/generic/trace';
import getBalance from '../../../../lib/assets/calls/getBalance';
import toReadable from '../../../../lib/assets/utils/toReadable';

import signTermsAndConditions from '../../../../lib/version/transactions/signTermsAndConditions';
import signCompetitionTermsAndConditions from '../../../../lib/version/transactions/signCompetitionTermsAndConditions';
import setupFund from '../../../../lib/version/transactions/setupFund';
import getFundForManager from '../../../../lib/version/calls/getFundForManager';
import getParticipation from '../../../../lib/participation/calls/getParticipation';
import invest from '../../../../lib/participation/transactions/invest';
import executeRequest from '../../../../lib/participation/transactions/executeRequest';
import awaitDataFeedUpdates from '../../../../lib/pricefeeds/events/awaitDataFeedUpdates';
import getQuoteAssetSymbol from '../../../../lib/pricefeeds/calls/getQuoteAssetSymbol';
import getNativeAssetSymbol from '../../../../lib/version/calls/getNativeAssetSymbol';
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

const INITIAL_SUBSCRIBE_QUANTITY = 10;
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

    setEnvironment({ api, account: wallet, providerType });

    const environment = getEnvironment();
    const config = await getConfig(environment);

    const quoteAssetSymbol = await getQuoteAssetSymbol(environment);
    const nativeAssetSymbol = await getNativeAssetSymbol(environment);

    trace(
      `ProviderType: ${
        environment.providerType
      }, quoteAssetSymbol: ${quoteAssetSymbol}, nativeAssetSymbol: ${nativeAssetSymbol}`,
    );

    trace({
      message: `Start walkthrough with defaultAccount: ${
        environment.account.address
      }`,
    });

    shared.etherBalance.initial = await environment.api.eth
      .getBalance(environment.account.address)
      .then(balance => toReadable(config, balance, config.nativeAssetSymbol));
    trace({ message: `Etherbalance: Ξ${shared.etherBalance.initial} ` });

    shared.melonBalance.initial = await getBalance(environment, {
      tokenSymbol: quoteAssetSymbol,
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
      }, exchange at ${shared.config.exchangeAddress} and priceFeed at ${
        shared.config.priceFeedAddress
      }`,
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
      numShares: new BigNumber(INITIAL_SUBSCRIBE_QUANTITY),
      offeredValue: new BigNumber(INITIAL_SUBSCRIBE_QUANTITY),
      isNativeAsset: false,
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
    });

    trace(`executedSubscriptionRequest ${shared.executedSubscriptionRequest}`);

    shared.participation.invested = await getParticipation(environment, {
      fundAddress: shared.vault.address,
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

    shared.simpleOrder = await makeOrderFromAccount(environment, {
      sell: {
        howMuch: new BigNumber(1),
        symbol: nativeAssetSymbol,
      },
      buy: {
        howMuch: new BigNumber(7),
        symbol: quoteAssetSymbol,
      },
    });
    shared.simpleOrder = await makeOrderFromAccount(environment, {
      sell: {
        howMuch: new BigNumber(1),
        symbol: nativeAssetSymbol,
      },
      buy: {
        howMuch: new BigNumber(7),
        symbol: quoteAssetSymbol,
      },
    });

    trace({
      message: `Regular account made order with id: ${shared.simpleOrder.id}`,
    });

    shared.takenOrder = await takeOrder(environment, {
      id: shared.simpleOrder.id,
      // shared.orderBook2[shared.orderBook2.length - 1].id,
      fundAddress: shared.vault.address,
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
    });

    expect(shared.toggledSubscription).toBe(false);

    shared.toggledSubscription = await toggleInvestment(environment, {
      fundAddress: shared.vault.address,
    });

    expect(shared.toggledSubscription).toBe(true);

    shared.toggledRedemption = await toggleRedemption(environment, {
      fundAddress: shared.vault.address,
    });

    expect(shared.toggledRedemption).toBe(false);
    shared.toggledRedemption = await toggleRedemption(environment, {
      fundAddress: shared.vault.address,
    });
    expect(shared.toggledRedemption).toBe(true);

    shared.participationAuthorizations = await getParticipationAuthorizations(
      environment,
      { fundAddress: shared.vault.address },
    );
    expect(shared.participationAuthorizations.subscriptionAllowed).toBe(true);
    expect(shared.participationAuthorizations.redemptionAllowed).toBe(true);

    shared.recentTrades = await getRecentTrades(environment, {
      baseTokenSymbol: nativeAssetSymbol,
      quoteTokenSymbol: quoteAssetSymbol,
    });
    shared.fundRecentTrades = await getFundRecentTrades(environment, {
      fundAddress: shared.vault.address,
    });
    expect(shared.recentTrades.length).toBeGreaterThan(1);
    expect(shared.fundRecentTrades.length).toBe(1);

    return true;
  },
  10 * 60 * 1000,
);
