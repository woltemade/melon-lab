// @flow
import getDataFeedContract from "../contracts/getDataFeedContract";
import getAddress from "../../assets/utils/getAddress";
import toReadable from "../../assets/utils/toReadable";

const getPrice = async symbol => {
  const dataFeedContract = await getDataFeedContract();
  const assetAddress = getAddress(symbol);

  const price = await dataFeedContract.getPrice(assetAddress);
  return toReadable(price, "MLN-T");
};

export default getPrice;
