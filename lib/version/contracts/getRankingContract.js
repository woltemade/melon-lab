import Api from "@parity/api";

import addressBook from "@melonproject/protocol/address-book.json";
import setup from "../../utils/setup";
import RankingAbi from "../../../abi/Ranking.json";

/**
 * Get deployed version contract instance
 */
const getRankingContract = () => {
  const api = new Api(setup.provider);
  return api.newContract(RankingAbi, addressBook.kovan.Ranking);
};

export default getRankingContract;
