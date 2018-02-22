import getQuoteAsset from '../../../../lib/pricefeeds/calls/getQuoteAsset';
import getPrice from '../../../../lib/pricefeeds/calls/getPrice';
import getWhiteListedAssets from '../../../../lib/assets/utils/getWhiteListedAssets';

import hasRecentPrice from '../../../../lib/pricefeeds/calls/hasRecentPrice';
import getParityProvider from '../../../../lib/utils/parity/getParityProvider';

it('Scratchpad', async () => {
  console.log('Starting scratchpad ... \n\n');
  const environment = await getParityProvider(-1);

  const result = await getQuoteAsset(environment);

  const price = await getPrice(environment, result);

  const rcp = await hasRecentPrice(environment);

  console.log(result, price.toString(), rcp);

  const whiteListedAssets = await getWhiteListedAssets(environment, 'kovan');
});
