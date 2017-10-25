// @flow
import tokenInfo from "./tokenInfo";

/**
 * Gets the token info by `tokenSymbol`
 * @deprecated Should get token info directly form AssetRegistrar
 * @throws If no token with given symbol is registered
 */
const getTokenInfo = (tokenSymbol: string): any =>
  tokenInfo.kovan.find(t => t.symbol === tokenSymbol.toUpperCase()) ||
  (() => {
    throw new Error(`No token found with symbol ${tokenSymbol}`);
  })();

export default getTokenInfo;
