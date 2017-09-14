import getVersionContract from "../contracts/getVersionContract";
import getSphereContract from "../../sphere/contracts/getSphereContract";

const getConfig = async () => {
  const config = {
    versionAddress: (await getVersionContract()).address,
  };

  const sphereContract = await getSphereContract();
  config.sphereAddress = sphereContract.address;
  config.dataFeedAddress = await sphereContract.getDataFeed();
  config.exchangeAddress = await sphereContract.getExchangeAdapter();

  return config;
};

export default getConfig;
