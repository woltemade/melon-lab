import R from "ramda";
import contract from "truffle-contract";
import SphereJson from "@melonproject/protocol/build/contracts/Sphere.json";
import DataFeedJson from "@melonproject/protocol/build/contracts/DataFeed.json";

import setup from "../../utils/setup";
import tokenInfo from "../../assets/utils/tokenInfo";

let config;

/**
 * @param {boolean} force set to true to force query the blockchain
 */
const getConfig = async (force = false) => {
  const Sphere = contract(SphereJson);
  Sphere.setProvider(setup.currentProvider);
  const sphereContract = await Sphere.deployed();

  const DataFeed = contract(DataFeedJson);
  DataFeed.setProvider(setup.currentProvider);
  const dataFeedContract = await DataFeed.deployed();

  config = {
    datafeed: await sphereContract.getDataFeed(),
    exchange: await sphereContract.getExchange(),
  };

  // if (force || !config) {
  //   const UniverseContract = contract(UniverseJSON);
  //   UniverseContract.setProvider(setup.currentProvider);
  //   const universe = await UniverseContract.deployed();

  //   const configLookupMap = {
  //     numAssignedAssets: universe.numAssignedAssets,
  //     melonAssetAddress: universe.getMelonAsset,
  //     referenceAssetAddress: universe.getReferenceAsset,
  //   };

  //   const promises = Object.keys(configLookupMap).map(async key => ({
  //     [key]: await configLookupMap[key](),
  //   }));

  //   config = R.mergeAll(await Promise.all(promises));
  //   config.universeAddress =
  //     UniverseJSON.networks[setup.web3.version.network].address;

  //   const assetPromises = Array(config.numAssignedAssets.toNumber())
  //     .fill()
  //     .map(async (_, i) => ({
  //       address: await universe.assetAt(i),
  //       exchange: await universe.exchangeAt(i),
  //       priceFeed: await universe.priceFeedAt(i),
  //     }));

  //   const assets = await Promise.all(assetPromises);

  //   // enhance assets with constants
  //   config.assets = assets.map(asset => ({
  //     // Todo: Make this chain-independent
  //     ...(tokenInfo.kovan.find(
  //       info =>
  //         info.address.toLocaleLowerCase() ===
  //         asset.address.toLocaleLowerCase(),
  //     ) ||
  //       (() => {
  //         throw new Error(`no token info found for ${asset.address}`);
  //       })()),
  //     ...asset,
  //   }));

  //   // TO CHECK: For the sake of simplicity, we assume that the
  //   // reference assets exchange/pricefeed is the main one
  //   config.exchangeAddress = assets[0].exchange;
  //   config.priceFeedAddress = assets[0].priceFeed;

  //   // check if tokenInfo has all the tokens also
  //   tokenInfo.kovan.forEach(
  //     info =>
  //       assets.find(
  //         asset =>
  //           info.address.toLocaleLowerCase() ===
  //           asset.address.toLocaleLowerCase(),
  //       )
  //         ? null
  //         : (() => {
  //             throw new Error(`token not defined in universe ${info}`);
  //           })(),
  //   );
  // }

  return config;
};

export default getConfig;
