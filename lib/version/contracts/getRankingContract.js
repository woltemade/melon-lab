import addressBook from '@melonproject/protocol/addressBook.json';
import RankingAbi from '@melonproject/protocol/out/FundRanking.abi.json';

/**
 * Get deployed version contract instance
 */
const getRankingContract = environment =>
  environment.api.newContract(RankingAbi, addressBook.kovan.FundRanking);

export default getRankingContract;
