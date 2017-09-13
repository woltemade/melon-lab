// @flow
import BigNumber from "bignumber.js";
import { path } from "ramda";
import contract from "truffle-contract";

import VaultJson from "@melonproject/protocol/build/contracts/Vault.json";
import getOrder from "../../exchange/calls/getOrder";
import toProcessable from "../../assets/utils/toProcessable";
import getAddress from "../../assets/utils/getAddress";
import setup from "../../utils/setup";

const makeOrder = async (
  vaultAddress: string,
  sellWhichToken: string,
  buyWhichToken: string,
  sellHowMuch: BigNumber,
  buyHowMuch: BigNumber,
  from: string = setup.defaultAccount,
) => {
  const Vault = contract(VaultJson);
  Vault.setProvider(setup.currentProvider);
  const vaultContract = Vault.at(vaultAddress);

  const receipt = await vaultContract.makeOrder(
    getAddress(sellWhichToken),
    getAddress(buyWhichToken),
    toProcessable(sellHowMuch, sellWhichToken),
    toProcessable(buyHowMuch, buyWhichToken),
    { from },
  );

  const orderId = path(["logs", 0, "args", "id"], receipt);

  if (!receipt || !orderId)
    throw new Error(`Error with makeOrder: ${JSON.stringify(receipt)}`);
  const createdOrder = await getOrder(orderId);
  return createdOrder;
};

export default makeOrder;
