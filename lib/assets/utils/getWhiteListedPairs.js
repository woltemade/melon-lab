/**
 * Gets list of white listed asset pairs on production exchange
 */
const getWhiteListedPairs = network => {
  if (network === 'live') {
    return [
      { asset: 'MLN', quotes: ['W-ETH'] },
      { asset: 'MKR', quotes: ['W-ETH', 'DAI'] },
      { asset: 'DAI', quotes: ['W-ETH', 'MKR'] },
    ];
  } else if (network === 'kovan') {
    return [
      { asset: 'MLN-T-M', quotes: ['ETH-T-M'] },
      { asset: 'MKR-T-M', quotes: ['ETH-T-M', 'DAI-T-M'] },
      { asset: 'DAI-T-M', quotes: ['ETH-T-M'] },
      { asset: 'ETH-T-M', quotes: [] },
    ];
  }
};

export default getWhiteListedPairs;
