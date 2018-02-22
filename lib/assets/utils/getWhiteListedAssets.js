import tokenInfo from '@melonproject/protocol/utils/info/tokenInfo';
import getPriceFeedContract from '../../pricefeeds/contracts/getPriceFeedContract';

/**
 * Gets list of white listed asset pairs on production exchange
 */
const getWhiteListedAssets = async (environment, network) => {
  const dataFeedContract = await getPriceFeedContract(environment);

  const promiseForInfo = tokenInfo[network].map(async asset => {
    const info = await dataFeedContract.instance.information.call({}, [
      asset.address,
    ]);
    return {
      address: asset.address,
      name: info[6],
      symbol: info[8],
      decimals: info[3],
      url: info[10],
      ipfsHash: info[5],
      isWhiteListed: info[4],
    };
  });

  const allAssetsInfos = await Promise.all(promiseForInfo);

  return allAssetsInfos.filter(asset => asset.isWhiteListed);
};

export default getWhiteListedAssets;
