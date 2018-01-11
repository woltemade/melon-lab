import getConfig from "../../version/calls/getConfig";
import getBalance from "../../assets/calls/getBalance";
import getPrice from "../../datafeeds/calls/getPrice";

const getHoldingsAndPrices = async fundAddress => {
  const config = await getConfig();
  const promiseForHoldingsAndPrices = config.assets.map(async asset => {
    const balance = await getBalance(asset.name, fundAddress);
    const price = await getPrice(asset.name);
    return { name: asset.name, balance, price };
  });

  const holdingsAndPrices = await Promise.all(promiseForHoldingsAndPrices);
  return holdingsAndPrices;
};

export default getHoldingsAndPrices;
