/**
 * Gets list of white listed asset pairs on production exchange
 */
const getWhiteListedPairs = network =>
  network === 'live'
    ? {
        MLN: ['W-ETH'],
        MKR: ['W-ETH', 'DAI'],
        DAI: ['W-ETH', 'MKR'],
      }
    : {
        'MLN-T-M': ['ETH-T-M'],
        'MKR-T-M': ['ETH-T-M', 'DAI-T-M'],
        'DAI-T-M': ['ETH-T-M', 'MKR-T-M'],
      };

export default getWhiteListedPairs;
