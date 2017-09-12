// @flow
import BigNumber from "bignumber.js";
import contract from "truffle-contract";
import VaultJson from "@melonproject/protocol/build/contracts/Vault.json";

import setup from "../../utils/setup";
import toProcessable from "../../assets/utils/toProcessable";
import getOffer from "../../exchange/calls/getOffer";

/**
 * Take the offer specified by id.
 * @param quantityAsked - The quantity to take from the offer. If higher
 *    than the quantity of the offer, the offer gets executed completely and
 *    the remaining quantity is return.
 */
const takeOffer = (
  id: number,
  managerAddress: string,
  vaultAddress: string,
  quantityAsked: BigNumber,
) =>
  getOffer(id).then(async offer => {
    const Vault = contract(VaultJson);

    // if no quantity specified OR a a specified quantity greater than the selling quantity of the
    // offer, execute the full offer. Otherwise, execute quantityAsked of the full offer.
    const quantity =
      !quantityAsked || quantityAsked.gte(offer.sell.howMuch)
        ? offer.sell.howMuch
        : quantityAsked;

    Vault.setProvider(setup.currentProvider);
    const vaultContract = Vault.at(vaultAddress);
    const transaction = await vaultContract.takeOrder(
      offer.id,
      toProcessable(quantity, offer.sell.symbol),
      { from: managerAddress },
    );

    return transaction
      ? {
          executedQuantity: quantity,
          transaction,
        }
      : null;
  });

export default takeOffer;
