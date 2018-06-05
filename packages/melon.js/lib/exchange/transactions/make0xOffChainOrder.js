import Wallet from 'ethers-wallet';
import Utils from 'ethers-utils';
import { ZeroEx } from '0x.js';
import sendTransaction from '../../utils/parity/sendTransaction';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import getAddress from '../../assets/utils/getAddress';
import approve from '../../assets/transactions/approve';
import getBalance from '../../assets/calls/getBalance';
import ensure from '../../utils/generic/ensure';
import rush from '../../utils/generic/rush';
import toProcessable from '../../assets/utils/toProcessable';
import BigNumber from 'bignumber.js';

import TokenAbi from '@melonproject/smart-contracts/out/assets/PreminedAsset.abi.json';

/*
 * Creates an off-chain order according to the 0x specification
 * User must specify the relayer he's targetting and the network he wants to place the order in (testnet/mainnet)
 */

const networkToExchangeContract = {
  KOVAN: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
  LIVE: '0x12459c951127e0c374ff9105dda097662a027093',
};

const networkToTokenTransferProxy = {
  KOVAN: '0x087eed4bc1ee3de49befbd66c662b434b15d49d4',
  LIVE: '0x8da0d80f5007ef1e431dd2127178d224e32c2ef4',
};

const make0xOffChainOrder = async (
  environment,
  config,
  network,
  sellSymbol,
  buySymbol,
  sellHowMuch,
  buyHowMuch,
  makerFee,
  takerFee,
  feeRecipient,
) => {
  const sellTokenBalance = await getBalance(environment, {
    tokenSymbol: sellSymbol,
    ofAddress: environment.account.address,
  });

  ensure(
    sellTokenBalance.gte(sellHowMuch),
    `Insufficient balance of ${sellSymbol}`,
  );

  // taker fee
  takerFee = toProcessable(config, takerFee, 'ZRX-T');

  // Approve the ZRX for the fees if applicable. Only working on kovan.
  if (makerFee.toNumber() != 0) {
    // The new maker fee with the new format
    makerFee = toProcessable(config, makerFee, 'ZRX-T');
    let approveMakerFee = toProcessable(config, new BigNumber(10), 'ZRX-T');

    // Approve the ZRX token
    const tokenContract = environment.api.newContract(
      TokenAbi,
      '0x6Ff6C0Ff1d68b964901F986d4C9FA3ac68346570',
    );

    const args = [feeRecipient, approveMakerFee];
    const receipt = await sendTransaction(
      tokenContract,
      'approve',
      args,
      environment,
    );

    const approvalLogEntry = findEventInLog('Approval', receipt);
    if (!approvalLogEntry) {
      throw Error('Failed to approved ZRX');
    }
  }

  // Approve the sell token
  const approved = await approve(environment, {
    symbol: sellSymbol,
    spender: networkToTokenTransferProxy[network],
    quantity: sellHowMuch,
  });

  if (!approved) {
    throw Error(`Failed to approve ${sellSymbol}`);
  }

  const duration = 60 * 60 * 24;

  const salt = ZeroEx.generatePseudoRandomSalt();

  const order = {
    maker: environment.account.address.toLowerCase(),
    taker: '0x0000000000000000000000000000000000000000',
    feeRecipient: feeRecipient,
    makerTokenAddress: getAddress(config, sellSymbol),
    takerTokenAddress: getAddress(config, buySymbol),
    exchangeContractAddress: networkToExchangeContract[network],
    salt,
    makerFee: makerFee,
    takerFee: takerFee,
    makerTokenAmount: toProcessable(config, sellHowMuch, sellSymbol),
    takerTokenAmount: toProcessable(config, buyHowMuch, buySymbol),
    expirationUnixTimestampSec: parseInt(
      new Date().getTime() / 1000 + duration,
    ).toString(),
  };

  const orderHash = ZeroEx.getOrderHashHex(order);

  const isValidOrderHash = ZeroEx.isValidOrderHash(orderHash);
  ensure(isValidOrderHash, 'Invalid order hash');

  let rawSignature;

  if (environment.account.signMessage) {
    const orderArray = Utils.arrayify(orderHash);
    rawSignature = environment.account.signMessage(orderArray);
    const verified = Wallet.Wallet.verifyMessage(orderArray, rawSignature);
    ensure(
      verified.toLowerCase() === environment.account.address.toLowerCase(),
      'Invalid signature',
      { expected: environment.account.address, received: verified },
    );
  } else {
    rawSignature = await environment.api.eth.sign(
      environment.account.address,
      orderHash,
    );
  }

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
  return { orderHash, signedOrder };
};

export default make0xOffChainOrder;
