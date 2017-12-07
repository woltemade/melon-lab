// @flow
import Api from "@parity/api";

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
    dataFeedAddress: await sphereContract.instance.getDataFeed.call(),
    exchangeAddress: await sphereContract.instance.getExchange.call(),
    referenceAsset: "MLN-T",
    assets: [],
  };

  const api = new Api(setup.provider);
  const abi = JSON.parse(
    fs.readFileSync(
      "node_modules/@melonproject/protocol/out/datafeeds/DataFeed.abi",
    ),
  );
  const datafeedContract = api.newContract(abi, config.dataFeedAddress);

  const referenceAssetAddress = await datafeedContract.instance.getQuoteAsset.call();
  config.referenceAsset = getSymbol(referenceAssetAddress);

  const numOfRegisteredAssets = await datafeedContract.instance.numRegisteredAssets.call();
  const assets = new Array(numOfRegisteredAssets.toNumber()).fill({});

  config.assets = await Promise.all(
    assets.map(async (asset, i) => {
      const address = await datafeedContract.instance.getRegisteredAssetAt.call(
        {},
        [i],
      );
      const assetData = await datafeedContract.instance.information.call({}, [
        address,
      ]);
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
