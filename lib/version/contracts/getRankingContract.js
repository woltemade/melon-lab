import Api from '@parity/api';

import addressBook from '@melonproject/protocol/addressBook.json';
import RankingAbi from '@melonproject/protocol/out/FundRanking.abi.json';

import setup from '../../utils/setup';

/**
 * Get deployed version contract instance
 */
const getRankingContract = () => {
  const api = new Api(setup.provider);
  return api.newContract(
    RankingAbi,
    '0x215FDd272C5F41Cb1E166209A4E22e77c2B2fa22',
  );
};

export default getRankingContract;
