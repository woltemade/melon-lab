// @flow
import contract from "truffle-contract";
import DataFeedJson from "@melonproject/protocol/build/contracts/DataFeed.json";
import cacheAwait from "../../utils/generic/cacheAwait";
import getVersionContract from "../contracts/getVersionContract";
import getSphereContract from "../../sphere/contracts/getSphereContract";
import getSymbol from "../../assets/utils/getSymbol";

import setup from "../../utils/setup";

import type { Address } from "../../assets/schemas/Address";
import type { TokenSymbol } from "../../assets/schemas/TokenSymbol";

/**
 * Asset config
 */
type AssetConfig = {
  address: Address,
  symbol: TokenSymbol,
  name: string,
  decimal: number,
  url: string,
};

/**
 * Config retrieved from the version
 */
export type Config = {
  versionAddress: Address,
  sphereAddress: Address,
  dataFeedAddress: Address,
  exchangeAddress: Address,
  referenceAsset: TokenSymbol,
  assets: Array<AssetConfig>,
};

/**
 * Get config from deployed version contract
 */
const getConfig = async (): Promise<Config> => {
  const sphereContract = await getSphereContract();

  const config: Config = {
    versionAddress: (await getVersionContract()).address,
    sphereAddress: sphereContract.address,
    dataFeedAddress: await sphereContract.getDataFeed(),
    exchangeAddress: await sphereContract.getExchange(),
    referenceAsset: "MLN-T",
    assets: [],
  };

  const DataFeed = contract(DataFeedJson);
  DataFeed.setProvider(setup.currentProvider);
  const datafeedContract = DataFeed.at(config.dataFeedAddress);

  const referenceAssetAddress = await datafeedContract.getQuoteAsset();
  config.referenceAsset = getSymbol(referenceAssetAddress);

  const numOfRegisteredAssets = await datafeedContract.numRegisteredAssets();
  const assets = new Array(numOfRegisteredAssets.toNumber()).fill({});

  config.assets = await Promise.all(
    assets.map(async (asset, i) => {
      const address = await datafeedContract.getRegisteredAssetAt(i);
      const assetData = await datafeedContract.information(address);
      return {
        address,
        symbol: assetData[0],
        name: assetData[1],
        decimal: assetData[2].toNumber(),
        url: assetData[3],
      };
    }),
  );

  return config;
};

export default cacheAwait(getConfig);
