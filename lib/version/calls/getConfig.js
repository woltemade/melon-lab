import contract from "truffle-contract";
import DataFeedJson from "@melonproject/protocol/build/contracts/DataFeed.json";
import cacheAwait from "../../utils/cacheAwait";
import getVersionContract from "../contracts/getVersionContract";
import getSphereContract from "../../sphere/contracts/getSphereContract";
import getSymbol from "../../assets/utils/getSymbol";

import setup from "../../utils/setup";

const getConfig = async () => {
  const config = {
    versionAddress: (await getVersionContract()).address,
  };

  const sphereContract = await getSphereContract();
  config.sphereAddress = sphereContract.address;
  config.dataFeedAddress = await sphereContract.getDataFeed();
  config.exchangeAddress = await sphereContract.getExchange();

  const DataFeed = contract(DataFeedJson);
  DataFeed.setProvider(setup.currentProvider);
  const datafeedContract = DataFeed.at(config.dataFeedAddress);

  const referenceAssetAddress = await datafeedContract.getQuoteAsset();
  config.referenceAsset = getSymbol(referenceAssetAddress);

  const numOfRegisteredAssets = await datafeedContract.numRegisteredAssets();
  const assets = new Array(numOfRegisteredAssets.toNumber()).fill({});

  config.assets = await Promise.all(
    assets.map(async () => {
      const address = await datafeedContract.getRegisteredAssetAt(1);
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

  console.log(config);
  return config;
};

export default cacheAwait(getConfig);
