import getRankingContract from "../contracts/getRankingContract";
import getVersionContract from "../contracts/getVersionContract";
import toReadable from "../../assets/utils/toReadable";
/**
 * Get fund address for a given `managerAddress`
 * _Hint_: If multiple funds existing for one manager, the latest fund is returned
 */
const getRanking = async () => {
  const rankingContract = await getRankingContract();

  const output = await rankingContract.instance.getFundsSharePrices.call();
  const fundAddresses = output[0].map(fund => fund._value);
  const fundSharePrices = output[1].map(fund =>
    toReadable(fund._value, "MLN-T").toNumber(),
  );
  const versionContract = await getVersionContract();
  const lastFundId = await versionContract.instance.getLastFundId.call();

  return new Array(lastFundId.toNumber())
    .fill(undefined)
    .map((val, index) => ({
      address: fundAddresses[index],
      sharePrice: fundSharePrices[index],
    }))
    .sort((a, b) => (a.sharePrice > b.sharePrice ? -1 : 1));
};

export default getRanking;
