// @flow
import BigNumber from "bignumber.js";
import contract from "truffle-contract";
import VaultJson from "@melonproject/protocol/build/contracts/Vault.json";

import { currentProvider } from "../../utils/setup";
import removePrecision from "../../assets/utils/removePrecision";
import addressList from "../../assets/utils/addressList";
import getOrder from "../calls/getOrder";

/*
  @param quantityAsked: BigNumber with Precision (i.e. '1.234' NOT '1234')
*/
const takeOrder = (
  id: number,
  managerAddress: string,
  vaultAddress: string,
  quantityAsked: BigNumber,
) =>
  getOrder(id).then(async order => {
    const Vault = contract(VaultJson);

    // if no quantity specified OR a a specified quantity greater than the selling quantity of the
    // order, execute the full order. Otherwise, execute quantityAsked of the full order.
    const quantity =
      !quantityAsked || quantityAsked.gte(order.sell.howMuch)
        ? order.sell.howMuch
        : quantityAsked;

    Vault.setProvider(currentProvider);
    const vaultContract = Vault.at(vaultAddress);

    const transaction = await vaultContract.takeOrder(
      addressList.exchange,
      order.id,
      removePrecision(quantity, order.sell.symbol),
      { from: managerAddress },
    );

    return transaction
      ? {
          executedQuantity: quantity,
          transaction,
        }
      : null;
  });

export default takeOrder;
