// @flow
import Api from "@parity/api";

import PriceFeedAbi from "@melonproject/protocol/out/pricefeeds/PriceFeed.abi.json";
import cacheAwait from "../../utils/generic/cacheAwait";
import getVersionContract from "../contracts/getVersionContract";
import getPriceFeedContract from "../../datafeeds/contracts/getPriceFeedContract";
import getExchangeAdapterContract from "../../exchange/contracts/getExchangeAdapterContract";
import getSimpleMarketContract from "../../exchange/contracts/getSimpleMarketContract";

import getSymbol from "../../assets/utils/getSymbol";

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

type ProtocolEnvironment = {
  versionAddress: Address,
  dataFeedAddress: Address,
  exchangeAdapterAddress: Address,
  simpleMarketAddress: Address,
  referenceAsset: TokenSymbol,
  assets: Array<AssetConfig>,
};

/**
 * Setup retrieved from the version
 */
export type Setup = {
  provider: any,
  defaultAccount: Address,
  networId: number,
  tracer: Function,
  protocolEnvironment: ProtocolEnvironment,
};

/**
 * Get config from deployed version contract
 */
const setup = async (
  provider,
  defaultAccount,
  networkId,
  tracer = () => {},
): Promise<Config> => {
  const setup = {
    provider,
    defaultAccount,
    networkId,
    tracer,
    protocolEnvironment: {
      versionAddress: (await getVersionContract()).address,
      dataFeedAddress: (await getPriceFeedContract()).address,
      exchangeAdapterAddress: (await getExchangeAdapterContract()).address,
      simpleMarketAddress: (await getSimpleMarketContract()).address,
      referenceAsset: "MLN-T",
      assets: [],
    },
  };

  const api = new Api(setup.provider);

  const datafeedContract = await getPriceFeedContract();

  const referenceAssetAddress = await datafeedContract.instance.getQuoteAsset.call();
  setup.protocolEnvironment.referenceAsset = getSymbol(referenceAssetAddress);

  const numOfRegisteredAssets = await datafeedContract.instance.numRegisteredAssets.call();
  const assets = new Array(numOfRegisteredAssets.toNumber()).fill({});

  setup.protocolEnvironment.assets = await Promise.all(
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

  return setup;
};

export default cacheAwait(setup);
