import BigNumber from 'bignumber.js';
import Api from '@parity/api';
import Wallet from 'ethers-wallet';
import Utils from 'ethers-utils';

import setup from '../../../../lib/utils/setup';
import encryptedWallet from '../../../../encryptedWallet.json';
import decryptWallet from '../../../../lib/utils/wallet/decryptWallet';
import password from '../../../../password.json';
import getConfig from '../../../../lib/version/calls/getConfig';
import trace from '../../../../lib/utils/generic/trace';
import getBalance from '../../../../lib/assets/calls/getBalance';

import signTermsAndConditions from '../../../../lib/version/transactions/signTermsAndConditions';
import signCompetitionTermsAndConditions from '../../../../lib/version/transactions/signCompetitionTermsAndConditions';
import setupFund from '../../../../lib/version/transactions/setupFund';
import getFundForManager from '../../../../lib/version/calls/getFundForManager';
import getParticipation from '../../../../lib/participation/calls/getParticipation';
import subscribe from '../../../../lib/participation/transactions/subscribe';
import executeRequest from '../../../../lib/participation/transactions/executeRequest';
import awaitDataFeedUpdates from '../../../../lib/pricefeeds/events/awaitDataFeedUpdates';
import makeOrder from '../../../../lib/fund/transactions/makeOrder';
import takeOrder from '../../../../lib/fund/transactions/takeOrder';
import toggleSubscription from '../../../../lib/fund/transactions/toggleSubscription';
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
import getHoldingsAndPrices from '../../../../lib/fund/calls/getHoldingsAndPrices';
import getVersionContract from '../../../../lib/version/contracts/getVersionContract';
import getFundContract from '../../../../lib/fund/contracts/getFundContract';
import shutDownFund from '../../../../lib/fund/transactions/shutDownFund';
import getFundInformations from '../../../../lib/fund/calls/getFundInformations';
import getRanking from '../../../../lib/version/calls/getRanking';
import transferTo from '../../../../lib/assets/transactions/transferTo';

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

    // // 1 - instantiate wallet
    // const wallet = importWalletFromMnemonic(
    //   'ability ensure nasty lazy final guess private electric eyebrow oil noise ritual',
    // );
    // const wallet = importWalletFromMnemonic(
    //   'liquid summer daring situate raccoon result juice over kiwi cherry grief short',
    // );

    // const wallet = importWalletFromMnemonic(
    //   "mule faint author gun sell carbon smile disorder shove toast gasp message",
    // );

    // const wallet = importWalletFromMnemonic(
    //   'dinosaur pulse rice lumber machine entry tackle off require draw edge almost',
    // );

    // const wallet = importWalletFromMnemonic(
    //   'kidney ice gold impose trigger scene core axis rude expose become leopard',
    // );

    const jsonWallet = JSON.stringify(encryptedWallet);
    const wallet = await decryptWallet(jsonWallet, password.kovan);

    // console.log(wallet);

    setup.wallet = wallet;
    setup.defaultAccount = wallet.address;
    trace({
      message: `Start walkthrough with defaultAccount: ${setup.defaultAccount}`,
      data: setup,
    });
    shared.etherBalance.initial = await getBalance('ETH-T');
    trace({ message: `Etherbalance: Ξ${shared.etherBalance.initial} ` });
    shared.melonBalance.initial = await getBalance('MLN-T');
    trace({ message: `Melon Balance: Ⓜ  ${shared.melonBalance.initial} ` });
    expect(shared.melonBalance.initial.toFixed()).toBeGreaterThan(
      INITIAL_SUBSCRIBE_QUANTITY,
    );

    shared.simpleOrder = await makeOrderFromAccount({
      wallet,
      buy: {
        howMuch: new BigNumber(1),
        symbol: 'ETH-T',
      },
      sell: {
        howMuch: new BigNumber(4.7),
        symbol: 'MLN-T',
      },
    });

    trace({
      message: `Regular account made order with id: ${shared.simpleOrder.id}`,
    });

    // shared.config = await getConfig();
    // trace({
    //   message: `Got config w exchange adapter at ${
    //     shared.config.exchangeAdapterAddress
    //   }, simple market at ${
    //     shared.config.simpleMarketAddress
    //   } and datafeed at ${shared.config.dataFeedAddress}`,
    //   data: shared.config,
    // });

    // await transferTo(
    //   wallet,
    //   'MLN-T',
    //   '0xc02920a5bF868e71DC6659f4E7C2B61cF86A6E49',
    //   100,
    // );
    // console.log('Tranfered');
    // const sig = await signTermsAndConditions(wallet);
    // console.log(sig);
    // const sig2 = await signCompetitionTermsAndConditions(wallet);
    // console.log(sig2);
    // const versionContract = await getVersionContract();
    // let managerToFunds = await versionContract.instance.managerToFunds.call(
    //   {},
    //   [wallet.address],
    // );

    // // If wallet already has a fund, need to shut it down before creating a new one -Only for integration purposes
    // if (managerToFunds !== '0x0000000000000000000000000000000000000000') {
    //   console.log('Existing fund needs to be shut down: ', managerToFunds);
    //   const fundContract = await getFundContract(managerToFunds);
    //   await shutDownFund(wallet, managerToFunds);
    //   console.log('Shutting down existing fund');
    //   managerToFunds = await versionContract.instance.managerToFunds.call({}, [
    //     wallet.address,
    //   ]);
    // }

    // const signature = await signTermsAndConditions(wallet);
    // shared.vaultName = randomString();
    // shared.vault = await setupFund(wallet, shared.vaultName, signature);
    // expect(shared.vault.name).toBe(shared.vaultName);
    // expect(shared.vault.address).toBeTruthy();
    // expect(shared.vault.inception instanceof Date).toBeTruthy();
    // trace({
    //   message: `vaultCreated: ${shared.vault.name} (${shared.vault.id}) at ${
    //     shared.vault.address
    //   }`,
    //   data: shared,
    // });

    // const fundCreatedByManager = await getFundForManager(setup.defaultAccount);
    // expect(fundCreatedByManager).toBe(shared.vault.address);

    // shared.participation.initial = await getParticipation(
    //   shared.vault.address,
    //   setup.defaultAccount,
    // );
    // expect(shared.participation.initial.personalStake.toNumber()).toBe(0);
    // expect(shared.participation.initial.totalSupply.toNumber()).toBe(0);

    // shared.initialCalculations = await performCalculations(
    //   shared.vault.address,
    //   // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    // );

    // trace({
    //   message: `Initial calculations- GAV: ${
    //     shared.initialCalculations.gav
    //   }, NAV: ${shared.initialCalculations.nav}, Share Price: ${
    //     shared.initialCalculations.sharePrice
    //   }, totalSupply: ${shared.initialCalculations.totalSupply}`,
    //   data: shared,
    // });
    // expect(shared.initialCalculations.sharePrice.toNumber()).toBe(1);
    // expect(shared.initialCalculations.gav.toNumber()).toBe(0);

    // shared.subscriptionRequest = await subscribe(
    //   wallet,
    //   shared.vault.address,
    //   // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    //   new BigNumber(INITIAL_SUBSCRIBE_QUANTITY),
    //   new BigNumber(INITIAL_SUBSCRIBE_QUANTITY),
    // );

    // trace({
    //   message: `Subscribe requested. shares: ${
    //     shared.subscriptionRequest.numShares
    //   }`,
    //   data: shared,
    // });

    // shared.executedSubscriptionRequest = await executeRequest(
    //   wallet,
    //   shared.subscriptionRequest.id,
    //   shared.vault.address,
    //   // 0,
    //   // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    // );

    // trace(`executedSubscriptionRequest ${shared.executedSubscriptionRequest}`);

    // shared.participation.invested = await getParticipation(
    //   // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    //   shared.vault.address,
    //   setup.defaultAccount,
    // );

    // expect(shared.participation.invested.personalStake.toNumber()).toBe(
    //   INITIAL_SUBSCRIBE_QUANTITY,
    // );
    // expect(shared.participation.invested.totalSupply.toNumber()).toBe(
    //   INITIAL_SUBSCRIBE_QUANTITY,
    // );

    // trace({
    //   message: `Subscribe request executed. Personal stake: ${
    //     shared.participation.invested.personalStake
    //   }`,
    // });

    // shared.midCalculations = await performCalculations(shared.vault.address);

    // trace({
    //   message: `Mid calculations- GAV: ${shared.midCalculations.gav}, NAV: ${
    //     shared.midCalculations.nav
    //   }, Share Price: ${shared.midCalculations.sharePrice}, totalSupply: ${
    //     shared.midCalculations.totalSupply
    //   }`,
    //   data: shared,
    // });

    // // shared.redemptionRequest = await redeem(
    // //   wallet,
    // //   // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    // //   shared.vault.address,
    // //   REDEEM_QUANTITY,
    // //   REDEEM_QUANTITY,
    // // );

    // // trace({
    // //   message: `Redeem requested. shares: ${
    // //     shared.redemptionRequest.numShares
    // //   }`,
    // //   data: shared,
    // // });

    // // await awaitDataFeedUpdates(3);

    // // trace('Awaited two data feed updates');

    // // shared.executedRedeemRequest = await executeRequest(
    // //   wallet,
    // //   shared.redemptionRequest.id,
    // //   // "0x75497EBbfFB55EED213529C76E4d0AEd40e9600f",
    // //   shared.vault.address,
    // // );

    // // shared.participation.invested = await getParticipation(
    // //   shared.vault.address,
    // //   // "0x75497EBbfFB55EED213529C76E4d0AEd40e9600f",
    // //   setup.defaultAccount,
    // // );

    // // expect(shared.participation.invested.personalStake.toNumber()).toBe(
    // //   INITIAL_SUBSCRIBE_QUANTITY - REDEEM_QUANTITY,
    // // );
    // // expect(shared.participation.invested.totalSupply.toNumber()).toBe(
    // //   INITIAL_SUBSCRIBE_QUANTITY - REDEEM_QUANTITY,
    // // );

    // // trace({
    // //   message: `Redeem request executed. Personal stake: ${
    // //     shared.participation.invested.personalStake
    // //   }`,
    // // });

    // shared.simpleOrder = await makeOrderFromAccount({
    //   wallet,
    //   sell: {
    //     howMuch: new BigNumber(1),
    //     symbol: 'ETH-T',
    //   },
    //   buy: {
    //     howMuch: new BigNumber(4.7),
    //     symbol: 'MLN-T',
    //   },
    // });

    // trace({
    //   message: `Regular account made order with id: ${shared.simpleOrder.id}`,
    // });

    // shared.simpleOrder2 = await makeOrderFromAccount({
    //   wallet,
    //   sell: {
    //     howMuch: new BigNumber(1),
    //     symbol: 'ETH-T',
    //   },
    //   buy: {
    //     howMuch: new BigNumber(5),
    //     symbol: 'MLN-T',
    //   },
    // });

    // trace({
    //   message: `Regular account made order with id: ${shared.simpleOrder2.id}`,
    // });

    // shared.orderFromFund = await makeOrder(
    //   wallet,
    //   shared.vault.address,
    //   // "0x09B5fc7eCB6B06773d8d7D956a7c84afB1Bb89c0",
    //   'MLN-T',
    //   'ETH-T',
    //   new BigNumber(5),
    //   new BigNumber(1),
    // );

    // trace({
    //   message: `Fund placed an order with id: ${shared.orderFromFund.id}`,
    // });

    // shared.orderBook = await getOrderbook('MLN-T', 'ETH-T');

    // trace({
    //   message: `Got orderbook for MLN-T/ETH-T with length: ${
    //     shared.orderBook.length
    //   }`,
    //   data: shared,
    // });

    // shared.orderBook2 = await getOrderbook('MLN-T', 'XRP-T');
    // trace({
    //   message: `Got orderbook for MLN-T/XRP-T with length: ${
    //     shared.orderBook2.length
    //   }`,
    //   data: shared,
    // });

    // console.log(shared.orderBook2);

    // shared.takenOrder = await takeOrder(
    //   wallet,
    //   shared.simpleOrder.id,
    //   // shared.orderBook2[shared.orderBook2.length - 1].id,
    //   shared.vault.address,
    //   // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    //   new BigNumber(1.5),
    // );

    // trace({
    //   message: `Fund took order; executed quantity: ${
    //     shared.takenOrder.executedQuantity
    //   }`,
    //   data: shared,
    // });

    // shared.takenOrder2 = await takeOrder(
    //   wallet,
    //   shared.simpleOrder2.id,
    //   shared.vault.address,
    //   // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    //   new BigNumber(2),
    // );

    // trace({
    //   message: `Fund took order; executed quantity: ${
    //     shared.takenOrder2.executedQuantity
    //   }`,
    //   data: shared,
    // });

    // shared.openOrders = await getOpenOrders(shared.vault.address);
    // console.log(shared.openOrders);

    // await cancelOrder(wallet, 0, shared.vault.address);

    // trace({
    //   message: `Canceled order ${shared.orderFromFund.id}`,
    // });

    // shared.orderFromFund2 = await makeOrder(
    //   wallet,
    //   shared.vault.address,
    //   // "0x09B5fc7eCB6B06773d8d7D956a7c84afB1Bb89c0",
    //   'MLN-T',
    //   'ETH-T',
    //   new BigNumber(5),
    //   new BigNumber(1),
    // );

    // shared.openOrders = await getOpenOrders(shared.vault.address);
    // console.log(shared.openOrders);

    // trace({
    //   message: `Fund placed an order with id: ${shared.orderFromFund2.id}`,
    // });
    // await cancelOrder(wallet, 3, shared.vault.address);

    // trace({
    //   message: `Canceled order ${shared.orderFromFund.id}`,
    // });

    // shared.openOrders = await getOpenOrders(shared.vault.address);
    // console.log(shared.openOrders);

    // shared.endCalculations = await performCalculations(shared.vault.address);

    // trace({
    //   message: `End calculations- GAV: ${shared.endCalculations.gav}\n NAV: ${
    //     shared.endCalculations.nav
    //   }, Share Price: ${shared.endCalculations.sharePrice}, totalSupply: ${
    //     shared.endCalculations.totalSupply
    //   }`,
    //   data: shared,
    // });

    // shared.toggledSubscription = await toggleSubscription(
    //   wallet,
    //   shared.vault.address,
    //   // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    //   setup.defaultAccount,
    // );

    // expect(shared.toggledSubscription).toBe(false);

    // shared.toggledSubscription = await toggleSubscription(
    //   wallet,
    //   shared.vault.address,
    //   // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    //   setup.defaultAccount,
    // );

    // expect(shared.toggledSubscription).toBe(true);

    // shared.toggledRedemption = await toggleRedemption(
    //   wallet,
    //   shared.vault.address,
    //   // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    //   setup.defaultAccount,
    // );

    // expect(shared.toggledRedemption).toBe(false);
    // shared.toggledRedemption = await toggleRedemption(
    //   wallet,
    //   shared.vault.address,
    //   // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    //   setup.defaultAccount,
    // );
    // expect(shared.toggledRedemption).toBe(true);

    // shared.participationAuthorizations = await getParticipationAuthorizations(
    //   shared.vault.address,
    //   // "0xF12a16B9C268211EEa7B48D29d52DEd5f91E4b30",
    // );
    // expect(shared.participationAuthorizations.subscriptionAllowed).toBe(true);
    // expect(shared.participationAuthorizations.redemptionAllowed).toBe(true);

    // shared.recentTrades = await getRecentTrades('ETH-T', 'MLN-T');
    // shared.fundRecentTrades = await getFundRecentTrades(shared.vault.address);
    // expect(shared.recentTrades.length).toBeGreaterThan(1);
    // expect(shared.fundRecentTrades.length).toBeGreaterThan(1);
  },
  10 * 60 * 1000,
);
