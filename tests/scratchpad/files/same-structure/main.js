import getQuoteAsset from '../../../../lib/pricefeeds/calls/getQuoteAsset';
import getParityProvider from '../../../../lib/utils/parity/getParityProvider';

it('Scratchpad', async () => {
  console.log('Starting scratchpad ... \n\n');
  const environment = await getParityProvider(-1);

  const result = await getQuoteAsset(environment);

  console.log(result);
});
