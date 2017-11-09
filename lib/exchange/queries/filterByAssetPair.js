// @flow
import { daemonAddress } from "../../utils/setup";

import type { BuyOrSell } from "../schemas/BuyOrSell";
import type { TokenSymbol } from "../../assets/schemas/TokenSymbol";
import type { Address } from "../../assets/schemas/Address";

/**
 * Create a filter for `baseTokenSymbol`/`quoteTokenSymbol` asset pairs and
 * `orderType`.
 *
 * @deprecated Can be enhanced with owner query:
 *  ownerOrDaemon - If set to true, will by default filter for orders by the
 *  liquidity provider. If undefined, will not filter for owner. If address
 *  specified, will filter for that address.
 */
const filterByAssetPair = (
  baseTokenSymbol: TokenSymbol,
  quoteTokenSymbol: TokenSymbol,
  orderType: BuyOrSell,
  ownerOrDaemon?: Address | true,
) => ({
  isActive: true,
  "buy.symbol": orderType === "sell" ? quoteTokenSymbol : baseTokenSymbol,
  "sell.symbol": orderType === "sell" ? baseTokenSymbol : quoteTokenSymbol,
  owner: ownerOrDaemon === true ? daemonAddress : ownerOrDaemon,
});

export default filterByAssetPair;
