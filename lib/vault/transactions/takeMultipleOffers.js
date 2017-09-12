// @flow
import BigNumber from "bignumber.js";

import takeOffer from "./takeOffer";
/*
  @pre: offers are retrieved from the matchOffers (sorted, and filtered)
        and BigNumberified
  @returns: new BigNumber(0) if successful, otherwise it throws an Error
*/
const takeMultipleOffers = async (
  offers: Array<*>,
  managerAddress: string,
  vaultAddress: string,
  totalQuantityAsked: BigNumber,
) =>
  offers.reduce(async (accumulatorPromise: Promise<*>, currentOrder: any) => {
    const accumulator = await accumulatorPromise;
    const remainingQuantity = accumulator.remainingQuantity;

    if (remainingQuantity.gt(0)) {
      const result = await takeOffer(
        currentOrder.id,
        managerAddress,
        vaultAddress,
        remainingQuantity,
      );
      accumulator.remainingQuantity = remainingQuantity.minus(
        result.executedQuantity,
      );
      accumulator.transactions.push(result.transaction);
    }

    return accumulator;
  }, Promise.resolve({ remainingQuantity: new BigNumber(totalQuantityAsked), transactions: [] }));

export default takeMultipleOffers;
