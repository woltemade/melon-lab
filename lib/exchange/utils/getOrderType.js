/**
 * Get order type (buy or sell) with sellWhichToken
 * As convention, given an asset pair ETH-T/MLN-T,
 * BUY ETH-T, SELL MLN-T : BUY ORDER
 * BUY MLN-T, SELL ETH-T : SELL ORDER
 */
const getOrderType = sellWhichToken =>
  sellWhichToken === "MLN-T" ? "buy" : "sell";

export default getOrderType;
