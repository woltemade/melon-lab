import Wallet from 'ethers-wallet';
import { ZeroEx } from '0x.js';
import getAddress from '../../assets/utils/getAddress';
import approve from '../../assets/transactions/approve';
import getBalance from '../../assets/calls/getBalance';
import ensure from '../../utils/generic/ensure';
import rush from '../../utils/generic/rush';
import toProcessable from '../../assets/utils/toProcessable';

/*
 * Creates an off-chain order according to the 0x specification
 * User must specify the relayer he's targetting and the network he wants to place the order in (testnet/mainnet)
 */

const relayersToEndpoint = {
  RADAR_RELAY: {
    KOVAN: 'https://api.kovan.radarrelay.com/0x/v0',
    LIVE: 'https://api.radarrelay.com/0x/v0',
  },
  ERC_DEX: {
    KOVAN: 'https://api.ercdex.com/api/standard/42/v0/order',
    LIVE: 'https://api.ercdex.com/api/standard/1/v0/order',
  },
};

const networkToExchangeContract = {
  KOVAN: '0x12459c951127e0c374ff9105dda097662a027093',
  LIVE: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
};

const networkToTokenTransferProxy = {
  KOVAN: '0x087eed4bc1ee3de49befbd66c662b434b15d49d4',
  LIVE: '0x8da0d80f5007ef1e431dd2127178d224e32c2ef4',
};
const make0xOffChainOrder = async (
  environment,
  config,
  relayer,
  network,
  sellSymbol,
  buySymbol,
  sellHowMuch,
  buyHowMuch,
) => {
  const sellTokenBalance = await getBalance(environment, {
    tokenSymbol: sellSymbol,
    ofAddress: environment.account.address,
  });
  ensure(
    sellTokenBalance.gte(sellHowMuch),
    `Insufficient balance of ${sellSymbol}`,
  );

  const approvePromise = approve(environment, {
    symbol: sellSymbol,
    spender: networkToTokenTransferProxy[network],
    quantity: sellHowMuch,
  });

  await rush(
    approvePromise,
    `Approve took longer that 30 seconds. ${sellHowMuch.toString()} ${sellSymbol} ${
      networkToTokenTransferProxy[network]
    }`,
    50 * 1000,
  );
  const salt = ZeroEx.generatePseudoRandomSalt();

  const order = {
    maker: environment.account.address.toLowerCase(),
    taker: '0x0000000000000000000000000000000000000000',
    feeRecipient: '0x0000000000000000000000000000000000000000',
    makerTokenAddress: getAddress(config, sellSymbol),
    takerTokenAddress: getAddress(config, buySymbol),
    exchangeContractAddress: networkToExchangeContract[network],
    salt,
    makerFee: '0',
    takerFee: '0',
    makerTokenAmount: toProcessable(config, sellHowMuch, sellSymbol),
    takerTokenAmount: toProcessable(config, buyHowMuch, buySymbol),
    expirationUnixTimestampSec: (Date.now() + 3600000).toString(),
  };

  const orderHash = ZeroEx.getOrderHashHex(order);

  const isValidOrderHash = ZeroEx.isValidOrderHash(orderHash);
  ensure(isValidOrderHash, 'Invalid order hash');

  let rawSignature;

  if (environment.account.signMessage) {
    rawSignature = environment.account.signMessage(orderHash);
    const verified = Wallet.Wallet.verifyMessage(orderHash, rawSignature);
    ensure(
      verified.toLowerCase() === environment.account.address.toLowerCase(),
      'Invalid signature',
      { expected: environment.account.address, received: verified },
    );
  } else {
    // Maybe need to  Utils.hexlify(arrayifiedHash);
    rawSignature = await environment.api.eth.sign(
      environment.account.address,
      orderHash,
    );
  }

  // const sig = rawSignature.substr(2, rawSignature.length);
  // const ecSignature = {
  //   r: `0x${sig.substr(0, 64)}`,
  //   s: `0x${sig.substr(64, 64)}`,
  //   v: parseInt(sig.substr(128, 2), 16),
  // };

  const ecSignature = {
    r: rawSignature.substring(0, 66),
    s: `0x${rawSignature.substring(66, 66 + 64)}`,
    v: parseInt(`0x${rawSignature.substring(66 + 64)}`, 16),
  };
  const isValidSignature = await ZeroEx.isValidSignature(
    orderHash,
    ecSignature,
    environment.account.address,
  );
  ensure(isValidSignature, 'Invalid signature');

  const signedOrder = { ...order, ecSignature };

  return signedOrder;
};

export default make0xOffChainOrder;

// const options = {
//   method: 'OPTIONS',
//   uri: relayersToEndpoint[relayer][network],
//   body: signedOrder,
//   json: true,
// };

// const response = await rp(options);
// return response;
