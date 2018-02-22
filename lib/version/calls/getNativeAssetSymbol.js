// @flow
import getVersionContract from '../contracts/getVersionContract';
import getSymbol from '../../assets/utils/getSymbol';

import type { TokenSymbol } from '../../assets/schemas/TokenSymbol';

/**
 * Gets the native asset of the version
 */
const getNativeAssetSymbol = async (environment): Promise<TokenSymbol> => {
  const versionContract = await getVersionContract(environment);

  const address = await versionContract.instance.getNativeAsset.call();

  return getSymbol(address);
};

export default getNativeAssetSymbol;
